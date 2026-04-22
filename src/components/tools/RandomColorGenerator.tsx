'use client';
import { useState, useCallback } from 'react';
import CopyButton from '../ui/CopyButton';

interface ColorData {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

function randomColor(): ColorData {
  const array = new Uint8Array(3);
  crypto.getRandomValues(array);
  const r = array[0], g = array[1], b = array[2];
  const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return {
    hex,
    rgb: { r, g, b },
    hsl: { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) },
  };
}

function hslToColor(h: number, s: number, l: number): ColorData {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let rn = 0, gn = 0, bn = 0;
  if (hNorm < 60) { rn = c; gn = x; bn = 0; }
  else if (hNorm < 120) { rn = x; gn = c; bn = 0; }
  else if (hNorm < 180) { rn = 0; gn = c; bn = x; }
  else if (hNorm < 240) { rn = 0; gn = x; bn = c; }
  else if (hNorm < 300) { rn = x; gn = 0; bn = c; }
  else { rn = c; gn = 0; bn = x; }
  const r = Math.round((rn + m) * 255);
  const g = Math.round((gn + m) * 255);
  const b = Math.round((bn + m) * 255);
  const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  return { hex, rgb: { r, g, b }, hsl: { h: hNorm, s, l } };
}

export default function RandomColorGenerator() {
  const [currentColor, setCurrentColor] = useState<ColorData | null>(null);
  const [palette, setPalette] = useState<ColorData[]>([]);
  const [history, setHistory] = useState<ColorData[]>([]);

  const generateSingle = useCallback(() => {
    const color = randomColor();
    setCurrentColor(color);
    setPalette([color]);
    setHistory(prev => [color, ...prev.slice(0, 19)]);
  }, []);

  const generateRandomPalette = useCallback(() => {
    const colors: ColorData[] = [];
    for (let i = 0; i < 5; i++) {
      colors.push(randomColor());
    }
    setCurrentColor(colors[0]);
    setPalette(colors);
    setHistory(prev => [...colors, ...prev].slice(0, 20));
  }, []);

  const generateComplementary = useCallback(() => {
    const base = randomColor();
    const comp = hslToColor(base.hsl.h + 180, base.hsl.s, base.hsl.l);
    const colors = [base, comp];
    setCurrentColor(base);
    setPalette(colors);
    setHistory(prev => [...colors, ...prev].slice(0, 20));
  }, []);

  const generateAnalogous = useCallback(() => {
    const base = randomColor();
    const colors = [
      hslToColor(base.hsl.h - 30, base.hsl.s, base.hsl.l),
      hslToColor(base.hsl.h - 15, base.hsl.s, base.hsl.l),
      base,
      hslToColor(base.hsl.h + 15, base.hsl.s, base.hsl.l),
      hslToColor(base.hsl.h + 30, base.hsl.s, base.hsl.l),
    ];
    setCurrentColor(base);
    setPalette(colors);
    setHistory(prev => [...colors, ...prev].slice(0, 20));
  }, []);

  const generateTriadic = useCallback(() => {
    const base = randomColor();
    const colors = [
      base,
      hslToColor(base.hsl.h + 120, base.hsl.s, base.hsl.l),
      hslToColor(base.hsl.h + 240, base.hsl.s, base.hsl.l),
    ];
    setCurrentColor(base);
    setPalette(colors);
    setHistory(prev => [...colors, ...prev].slice(0, 20));
  }, []);

  const selectFromHistory = (color: ColorData) => {
    setCurrentColor(color);
    setPalette([color]);
  };

  const clear = () => {
    setCurrentColor(null);
    setPalette([]);
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <button onClick={generateSingle} className="px-4 py-2.5 bg-primary text-primary-text font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
            Random Color
          </button>
          <button onClick={generateRandomPalette} className="px-4 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors">
            Random Palette (5)
          </button>
          <button onClick={generateComplementary} className="px-4 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors">
            Complementary
          </button>
          <button onClick={generateAnalogous} className="px-4 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors">
            Analogous
          </button>
          <button onClick={generateTriadic} className="px-4 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors">
            Triadic
          </button>
          <button onClick={clear} className="px-4 py-2.5 bg-page border border-border text-text font-semibold rounded-lg hover:border-primary transition-colors">
            Clear
          </button>
        </div>
      </div>

      {currentColor && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Selected Color</h3>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div
              className="w-32 h-32 rounded-xl border-2 border-border shadow-md pulse-result"
              style={{ backgroundColor: currentColor.hex }}
            />
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-text-muted w-12">HEX</span>
                <code className="font-mono text-text bg-page px-3 py-1 rounded-lg border border-border-light">{currentColor.hex}</code>
                <CopyButton text={currentColor.hex} label="Copy" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-text-muted w-12">RGB</span>
                <code className="font-mono text-text bg-page px-3 py-1 rounded-lg border border-border-light">rgb({currentColor.rgb.r}, {currentColor.rgb.g}, {currentColor.rgb.b})</code>
                <CopyButton text={`rgb(${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b})`} label="Copy" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-text-muted w-12">HSL</span>
                <code className="font-mono text-text bg-page px-3 py-1 rounded-lg border border-border-light">hsl({currentColor.hsl.h}, {currentColor.hsl.s}%, {currentColor.hsl.l}%)</code>
                <CopyButton text={`hsl(${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%)`} label="Copy" />
              </div>
            </div>
          </div>
        </div>
      )}

      {palette.length > 1 && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Palette</h3>
          <div className="flex gap-2 rounded-xl overflow-hidden">
            {palette.map((color, i) => (
              <button
                key={i}
                onClick={() => setCurrentColor(color)}
                className="flex-1 h-24 transition-transform hover:scale-105 relative group"
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              >
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-mono bg-surface/80 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity text-text">
                  {color.hex}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3">
            <CopyButton text={palette.map(c => c.hex).join(', ')} label="Copy All HEX" />
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">History (Last 20)</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((color, i) => (
              <button
                key={i}
                onClick={() => selectFromHistory(color)}
                className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition-colors shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
