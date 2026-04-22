'use client';
import { useState, useCallback } from 'react';
import CopyButton from '../ui/CopyButton';

function secureRandom(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xFFFFFFFF + 1);
}

function randomInRange(min: number, max: number, isInteger: boolean): number {
  const rand = secureRandom();
  if (isInteger) {
    return Math.floor(rand * (max - min + 1)) + min;
  }
  return parseFloat((rand * (max - min) + min).toFixed(6));
}

interface HistoryEntry {
  id: number;
  numbers: number[];
  timestamp: string;
}

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [isInteger, setIsInteger] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [noDuplicates, setNoDuplicates] = useState(false);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [animating, setAnimating] = useState(false);

  const generate = useCallback(() => {
    const actualMin = Math.min(min, max);
    const actualMax = Math.max(min, max);
    const maxPossible = isInteger ? actualMax - actualMin + 1 : Infinity;
    const qty = noDuplicates && isInteger ? Math.min(quantity, maxPossible) : quantity;

    let nums: number[] = [];

    if (noDuplicates && isInteger) {
      const set = new Set<number>();
      let attempts = 0;
      while (set.size < qty && attempts < qty * 100) {
        set.add(randomInRange(actualMin, actualMax, true));
        attempts++;
      }
      nums = Array.from(set);
    } else {
      for (let i = 0; i < qty; i++) {
        nums.push(randomInRange(actualMin, actualMax, isInteger));
      }
    }

    if (sortOrder === 'asc') nums.sort((a, b) => a - b);
    else if (sortOrder === 'desc') nums.sort((a, b) => b - a);

    setResults(nums);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    setHistory(prev => [
      { id: Date.now(), numbers: nums, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9),
    ]);
  }, [min, max, isInteger, quantity, noDuplicates, sortOrder]);

  const clear = () => {
    setResults([]);
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Minimum</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="w-full px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Maximum</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="w-full px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Quantity (1-1000)</label>
            <input
              type="number"
              min={1}
              max={1000}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(1000, Number(e.target.value))))}
              className="w-full px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Sort Results</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
              className="w-full px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="none">No sorting</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
            <input
              type="checkbox"
              checked={isInteger}
              onChange={(e) => setIsInteger(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            Integer only
          </label>
          <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
            <input
              type="checkbox"
              checked={noDuplicates}
              onChange={(e) => setNoDuplicates(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            No duplicates
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={generate}
            className="px-6 py-2.5 bg-primary text-primary-text font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
          >
            Generate
          </button>
          <button
            onClick={clear}
            className="px-6 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className={`bg-surface border border-border rounded-xl p-6 shadow-sm ${animating ? 'pulse-result' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Results ({results.length})</h3>
            <CopyButton text={results.join(', ')} label="Copy All" />
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((num, i) => (
              <div key={i} className="inline-flex items-center gap-1 bg-primary-light border border-border-light rounded-lg px-3 py-1.5">
                <span className="font-mono text-text font-medium">{num}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(String(num))}
                  className="text-text-muted hover:text-primary transition-colors"
                  title="Copy"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">History (Last 10)</h3>
          <div className="space-y-2">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between bg-page rounded-lg px-4 py-2">
                <span className="text-sm text-text-muted">{entry.timestamp}</span>
                <span className="text-sm font-mono text-text truncate max-w-xs ml-3">
                  {entry.numbers.join(', ')}
                </span>
                <CopyButton text={entry.numbers.join(', ')} label="Copy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
