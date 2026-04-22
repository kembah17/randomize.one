'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import CopyButton from '../ui/CopyButton';

function secureRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

interface PickResult {
  id: number;
  winners: string[];
  timestamp: string;
}

export default function RandomNamePicker() {
  const [input, setInput] = useState('');
  const [numWinners, setNumWinners] = useState(1);
  const [removePicked, setRemovePicked] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<PickResult[]>([]);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getNames = useCallback((): string[] => {
    return input
      .split(/[,\n]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0);
  }, [input]);

  const names = getNames();

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, []);

  const pick = useCallback(() => {
    const currentNames = getNames();
    if (currentNames.length === 0) return;

    const count = Math.min(numWinners, currentNames.length);
    setAnimating(true);
    setWinners([]);

    let ticks = 0;
    const maxTicks = 20;
    animRef.current = setInterval(() => {
      setHighlightIndex(secureRandomIndex(currentNames.length));
      ticks++;
      if (ticks >= maxTicks) {
        if (animRef.current) clearInterval(animRef.current);
        animRef.current = null;

        const selected: string[] = [];
        const pool = [...currentNames];
        for (let i = 0; i < count; i++) {
          const idx = secureRandomIndex(pool.length);
          selected.push(pool[idx]);
          pool.splice(idx, 1);
        }

        setWinners(selected);
        setHighlightIndex(null);
        setAnimating(false);

        setHistory(prev => [
          { id: Date.now(), winners: selected, timestamp: new Date().toLocaleTimeString() },
          ...prev.slice(0, 19),
        ]);

        if (removePicked) {
          const remaining = currentNames.filter(n => !selected.includes(n));
          setInput(remaining.join('\n'));
        }
      }
    }, 80);
  }, [getNames, numWinners, removePicked]);

  const clear = () => {
    setInput('');
    setWinners([]);
    setHistory([]);
    setHighlightIndex(null);
    if (animRef.current) {
      clearInterval(animRef.current);
      animRef.current = null;
    }
    setAnimating(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Enter Names (one per line or comma-separated)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              placeholder={"Alice\nBob\nCharlie\nDiana\nEve"}
              className="w-full px-4 py-3 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y font-mono text-sm"
            />
            <p className="text-xs text-text-muted mt-1">{names.length} name{names.length !== 1 ? 's' : ''} entered</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Number of Winners (1-{Math.max(names.length, 1)})
              </label>
              <input
                type="number"
                min={1}
                max={Math.max(names.length, 1)}
                value={numWinners}
                onChange={(e) => setNumWinners(Math.max(1, Math.min(names.length || 1, Number(e.target.value))))}
                className="w-full px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={removePicked}
                  onChange={(e) => setRemovePicked(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                Remove picked names from list
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={pick}
            disabled={animating || names.length === 0}
            className="px-6 py-2.5 bg-primary text-primary-text font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
          >
            {animating ? 'Picking...' : 'Pick Winner' + (numWinners > 1 ? 's' : '')}
          </button>
          <button
            onClick={clear}
            className="px-6 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {(animating || names.length > 0) && names.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Name Pool</h3>
          <div className="flex flex-wrap gap-2">
            {names.map((name, i) => (
              <span
                key={i}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  highlightIndex === i
                    ? 'bg-primary text-primary-text scale-110'
                    : winners.includes(name)
                    ? 'bg-primary-light text-primary border border-primary'
                    : 'bg-page text-text border border-border-light'
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {winners.length > 0 && !animating && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">
            {winners.length === 1 ? 'Winner!' : `Winners (${winners.length})`}
          </h3>
          <div className="space-y-3">
            {winners.map((winner, i) => (
              <div key={i} className="flex items-center justify-between bg-primary-light rounded-lg px-4 py-3 pulse-result">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary text-primary-text rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="text-lg font-semibold text-text">{winner}</span>
                </div>
                <CopyButton text={winner} label="Copy" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <CopyButton text={winners.join(', ')} label="Copy All Winners" />
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Pick History</h3>
          <div className="space-y-2">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between bg-page rounded-lg px-4 py-2">
                <span className="text-sm text-text-muted">{entry.timestamp}</span>
                <span className="text-sm font-medium text-text">{entry.winners.join(', ')}</span>
                <CopyButton text={entry.winners.join(', ')} label="Copy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
