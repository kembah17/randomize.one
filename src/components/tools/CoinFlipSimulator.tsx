'use client';
import { useState, useCallback } from 'react';

function secureRandomBool(): boolean {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % 2 === 0;
}

interface FlipResult {
  id: number;
  results: boolean[];
  timestamp: string;
}

export default function CoinFlipSimulator() {
  const [numCoins, setNumCoins] = useState(1);
  const [results, setResults] = useState<boolean[]>([]);
  const [animating, setAnimating] = useState(false);
  const [totalFlips, setTotalFlips] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [history, setHistory] = useState<FlipResult[]>([]);

  const flip = useCallback(() => {
    setAnimating(true);
    const flips: boolean[] = [];
    for (let i = 0; i < numCoins; i++) {
      flips.push(secureRandomBool());
    }

    setTimeout(() => {
      setResults(flips);
      setAnimating(false);

      const newHeads = flips.filter(Boolean).length;
      const newTails = flips.length - newHeads;
      setTotalFlips(prev => prev + flips.length);
      setHeadsCount(prev => prev + newHeads);
      setTailsCount(prev => prev + newTails);

      setHistory(prev => [
        { id: Date.now(), results: flips, timestamp: new Date().toLocaleTimeString() },
        ...prev.slice(0, 19),
      ]);
    }, 600);
  }, [numCoins]);

  const resetStats = () => {
    setResults([]);
    setTotalFlips(0);
    setHeadsCount(0);
    setTailsCount(0);
    setHistory([]);
  };

  const headsPercent = totalFlips > 0 ? ((headsCount / totalFlips) * 100).toFixed(1) : '0.0';
  const tailsPercent = totalFlips > 0 ? ((tailsCount / totalFlips) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Number of Coins (1-100)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={numCoins}
            onChange={(e) => setNumCoins(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="w-full max-w-xs px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={flip}
            disabled={animating}
            className="px-6 py-2.5 bg-primary text-primary-text font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
          >
            {animating ? 'Flipping...' : 'Flip Coin' + (numCoins > 1 ? 's' : '')}
          </button>
          <button
            onClick={resetStats}
            className="px-6 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {(results.length > 0 || animating) && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Result</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {animating ? (
              Array.from({ length: numCoins }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-primary-light border-2 border-border flex items-center justify-center coin-flip-animation" style={{ perspective: '1000px' }}>
                    <span className="text-3xl">🪙</span>
                  </div>
                </div>
              ))
            ) : (
              results.map((isHeads, i) => (
                <div key={i} className="flex flex-col items-center gap-2 pulse-result">
                  <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${
                    isHeads ? 'bg-primary-light border-primary' : 'bg-page border-border'
                  }`}>
                    <span className="text-3xl">{isHeads ? '🪙' : '🟠'}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isHeads ? 'text-primary' : 'text-text-muted'}`}>
                    {isHeads ? 'Heads' : 'Tails'}
                  </span>
                </div>
              ))
            )}
          </div>
          {!animating && results.length > 1 && (
            <div className="mt-4 text-center text-text-light">
              <span className="font-medium">{results.filter(Boolean).length}</span> Heads, <span className="font-medium">{results.filter(r => !r).length}</span> Tails
            </div>
          )}
        </div>
      )}

      {totalFlips > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-page rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-text">{totalFlips}</div>
              <div className="text-sm text-text-muted">Total Flips</div>
            </div>
            <div className="bg-page rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{headsCount}</div>
              <div className="text-sm text-text-muted">Heads</div>
            </div>
            <div className="bg-page rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-text-light">{tailsCount}</div>
              <div className="text-sm text-text-muted">Tails</div>
            </div>
            <div className="bg-page rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-info">{headsPercent}%</div>
              <div className="text-sm text-text-muted">Heads %</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex h-4 rounded-full overflow-hidden bg-page">
              <div className="bg-primary transition-all" style={{ width: `${headsPercent}%` }} />
              <div className="bg-border transition-all" style={{ width: `${tailsPercent}%` }} />
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>Heads {headsPercent}%</span>
              <span>Tails {tailsPercent}%</span>
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
                <span className="text-sm text-text">
                  {entry.results.map((r, i) => (
                    <span key={i} className={r ? 'text-primary' : 'text-text-muted'}>
                      {r ? 'H' : 'T'}{i < entry.results.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
