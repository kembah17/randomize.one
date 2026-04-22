'use client';
import { useState, useCallback } from 'react';
import CopyButton from '../ui/CopyButton';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function secureRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function getStrength(length: number, charsetCount: number): { label: string; color: string; width: string } {
  const score = length * charsetCount;
  if (score < 16) return { label: 'Weak', color: 'bg-error', width: 'w-1/4' };
  if (score < 32) return { label: 'Fair', color: 'bg-warning', width: 'w-2/4' };
  if (score < 64) return { label: 'Strong', color: 'bg-info', width: 'w-3/4' };
  return { label: 'Very Strong', color: 'bg-success', width: 'w-full' };
}

export default function RandomStringGenerator() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  const generate = useCallback(() => {
    let charset = '';
    if (useUppercase) charset += CHARSETS.uppercase;
    if (useLowercase) charset += CHARSETS.lowercase;
    if (useNumbers) charset += CHARSETS.numbers;
    if (useSpecial) charset += CHARSETS.special;

    if (!charset) {
      charset = CHARSETS.lowercase;
    }

    const strings: string[] = [];
    for (let q = 0; q < quantity; q++) {
      let str = '';
      for (let i = 0; i < length; i++) {
        str += charset[secureRandomIndex(charset.length)];
      }
      strings.push(str);
    }
    setResults(strings);
  }, [length, useUppercase, useLowercase, useNumbers, useSpecial, quantity]);

  const clear = () => setResults([]);

  const charsetCount = [useUppercase, useLowercase, useNumbers, useSpecial].filter(Boolean).length;
  const strength = getStrength(length, charsetCount || 1);

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Length: {length}</label>
            <input
              type="range"
              min={1}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>1</span>
              <span>128</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Quantity (1-50)</label>
            <input
              type="number"
              min={1}
              max={50}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(50, Number(e.target.value))))}
              className="w-full px-4 py-2 bg-page border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
              <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="w-4 h-4 accent-primary" />
              Uppercase (A-Z)
            </label>
            <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
              <input type="checkbox" checked={useLowercase} onChange={(e) => setUseLowercase(e.target.checked)} className="w-4 h-4 accent-primary" />
              Lowercase (a-z)
            </label>
            <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
              <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-4 h-4 accent-primary" />
              Numbers (0-9)
            </label>
            <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
              <input type="checkbox" checked={useSpecial} onChange={(e) => setUseSpecial(e.target.checked)} className="w-4 h-4 accent-primary" />
              Special (!@#$...)
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-muted">Strength:</span>
              <span className="font-medium text-text">{strength.label}</span>
            </div>
            <div className="w-full bg-page rounded-full h-2">
              <div className={`h-2 rounded-full transition-all ${strength.color} ${strength.width}`} />
            </div>
          </div>
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
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Results ({results.length})</h3>
            <CopyButton text={results.join('\n')} label="Copy All" />
          </div>
          <div className="space-y-2">
            {results.map((str, i) => (
              <div key={i} className="flex items-center justify-between bg-page rounded-lg px-4 py-2 gap-3">
                <code className="font-mono text-sm text-text break-all flex-1">{str}</code>
                <CopyButton text={str} label="Copy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
