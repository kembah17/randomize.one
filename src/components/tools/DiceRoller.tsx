'use client';
import { useState, useCallback } from 'react';
import CopyButton from '../ui/CopyButton';

function secureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] % max) + 1;
}

function parseDiceNotation(notation: string): { count: number; sides: number; modifier: number } | null {
  const match = notation.trim().toLowerCase().match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if (!match) return null;
  return {
    count: Math.min(parseInt(match[1]), 10),
    sides: parseInt(match[2]),
    modifier: match[3] ? parseInt(match[3]) : 0,
  };
}

const DICE_FACES: Record<number, string[]> = {
  6: ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'],
};

interface RollResult {
  id: number;
  dice: number[];
  sides: number;
  modifier: number;
  total: number;
  timestamp: string;
}

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [sides, setSides] = useState(6);
  const [notation, setNotation] = useState('');
  const [results, setResults] = useState<number[]>([]);
  const [modifier, setModifier] = useState(0);
  const [total, setTotal] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [history, setHistory] = useState<RollResult[]>([]);
  const [notationError, setNotationError] = useState('');

  const allRolls = history.flatMap(h => h.dice);
  const stats = allRolls.length > 0 ? {
    avg: (allRolls.reduce((a, b) => a + b, 0) / allRolls.length).toFixed(1),
    min: Math.min(...allRolls),
    max: Math.max(...allRolls),
  } : null;

  const roll = useCallback((count?: number, s?: number, mod?: number) => {
    const c = count ?? numDice;
    const si = s ?? sides;
    const m = mod ?? 0;

    setAnimating(true);
    setTimeout(() => {
      const dice: number[] = [];
      for (let i = 0; i < c; i++) {
        dice.push(secureRandomInt(si));
      }
      const sum = dice.reduce((a, b) => a + b, 0) + m;
      setResults(dice);
      setModifier(m);
      setTotal(sum);
      setAnimating(false);

      setHistory(prev => [
        { id: Date.now(), dice, sides: si, modifier: m, total: sum, timestamp: new Date().toLocaleTimeString() },
        ...prev.slice(0, 19),
      ]);
    }, 400);
  }, [numDice, sides]);

  const rollFromNotation = () => {
    const parsed = parseDiceNotation(notation);
    if (!parsed) {
      setNotationError('Invalid notation. Use format like 2d6, 1d20+3, 3d8-2');
      return;
    }
    setNotationError('');
    setNumDice(parsed.count);
    setSides(parsed.sides);
    roll(parsed.count, parsed.sides, parsed.modifier);
  };

  const clear = () => {
    setResults([]);
    setHistory([]);
    setTotal(0);
    setModifier(0);
    setNotation('');
    setNotationError('');
  };

  const sideOptions = [4, 6, 8, 10, 12, 20];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Number of Dice (1-10)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={numDice}
              onChange={(e) => setNumDice(Math.max(1, Math.min(10, Number(e.target.value))))}
              className="w-full px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Sides</label>
            <div className="flex flex-wrap gap-2">
              {sideOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSides(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sides === s
                      ? 'bg-primary text-primary-text'
                      : 'bg-page border border-border text-text hover:border-primary'
                  }`}
                >
                  d{s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-text mb-1">Dice Notation (e.g., 2d6+3, 1d20, 3d8-2)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={notation}
              onChange={(e) => { setNotation(e.target.value); setNotationError(''); }}
              placeholder="2d6+3"
              className="flex-1 px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
              onKeyDown={(e) => e.key === 'Enter' && rollFromNotation()}
            />
            <button
              onClick={rollFromNotation}
              className="px-4 py-2 bg-primary text-primary-text font-semibold rounded-lg hover:bg-primary-hover transition-colors"
            >
              Roll Notation
            </button>
          </div>
          {notationError && <p className="text-sm text-error mt-1">{notationError}</p>}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => roll()}
            disabled={animating}
            className="px-6 py-2.5 bg-primary text-primary-text font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
          >
            {animating ? 'Rolling...' : `Roll ${numDice}d${sides}`}
          </button>
          <button
            onClick={clear}
            className="px-6 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {(results.length > 0 || animating) && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Result</h3>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            {animating ? (
              Array.from({ length: numDice }).map((_, i) => (
                <div key={i} className="w-16 h-16 bg-primary-light border-2 border-border rounded-xl flex items-center justify-center dice-roll-animation">
                  <span className="text-2xl text-text-muted">?</span>
                </div>
              ))
            ) : (
              results.map((val, i) => (
                <div key={i} className="w-16 h-16 bg-primary-light border-2 border-primary rounded-xl flex items-center justify-center pulse-result">
                  <span className="text-2xl font-bold text-text">
                    {sides === 6 && DICE_FACES[6] ? DICE_FACES[6][val - 1] : val}
                  </span>
                </div>
              ))
            )}
          </div>
          {!animating && results.length > 0 && (
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {total}
                {modifier !== 0 && (
                  <span className="text-lg text-text-muted ml-2">
                    ({results.reduce((a, b) => a + b, 0)} {modifier > 0 ? '+' : ''}{modifier})
                  </span>
                )}
              </div>
              <p className="text-sm text-text-muted mt-1">Total</p>
              <div className="mt-2">
                <CopyButton text={`${results.join(', ')} = ${total}`} label="Copy Result" />
              </div>
            </div>
          )}
        </div>
      )}

      {stats && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Statistics (All Rolls)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-page rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{stats.avg}</div>
              <div className="text-sm text-text-muted">Average</div>
            </div>
            <div className="bg-page rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-info">{stats.min}</div>
              <div className="text-sm text-text-muted">Min</div>
            </div>
            <div className="bg-page rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-success">{stats.max}</div>
              <div className="text-sm text-text-muted">Max</div>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">History (Last 20)</h3>
          <div className="space-y-2">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between bg-page rounded-lg px-4 py-2">
                <span className="text-sm text-text-muted">{entry.timestamp}</span>
                <span className="text-sm font-mono text-text">
                  {entry.dice.join(', ')}{entry.modifier !== 0 ? ` ${entry.modifier > 0 ? '+' : ''}${entry.modifier}` : ''} = {entry.total}
                </span>
                <CopyButton text={`${entry.dice.join(', ')} = ${entry.total}`} label="Copy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
