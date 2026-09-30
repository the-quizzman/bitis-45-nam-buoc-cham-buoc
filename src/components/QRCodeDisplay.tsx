import React, { useMemo } from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
}

// Deterministic matrix generator for realistic scannable-look QR preview
export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 180, label }) => {
  const matrix = useMemo(() => {
    const n = 25;
    const grid: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

    // Corner finder patterns (7x7)
    const drawFinder = (startX: number, startY: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 ||
            r === 6 ||
            c === 0 ||
            c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            grid[startY + r][startX + c] = true;
          }
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(n - 7, 0);
    drawFinder(0, n - 7);

    // Timing patterns
    for (let i = 8; i < n - 8; i++) {
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    // Hash the input string to fill data modules deterministically
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        // Skip finders and timing
        const inFinder =
          (r < 8 && c < 8) ||
          (r < 8 && c >= n - 8) ||
          (r >= n - 8 && c < 8);
        const inCenter = r >= 10 && r <= 14 && c >= 10 && c <= 14;

        if (!inFinder && !inCenter) {
          const pseudoRand = ((hash ^ (r * 37 + c * 59)) >>> (r % 7)) & 1;
          grid[r][c] = pseudoRand === 1;
        }
      }
    }

    return grid;
  }, [value]);

  const moduleSize = size / 25;

  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shape-rendering-crispEdges"
      >
        <rect width={size} height={size} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((cell, c) => {
            if (!cell) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * moduleSize}
                y={r * moduleSize}
                width={moduleSize}
                height={moduleSize}
                fill="#171717"
              />
            );
          })
        )}
        {/* Center Biti's Red Accent Stamp */}
        <circle cx={size / 2} cy={size / 2} r={moduleSize * 2.2} fill="#ffffff" />
        <circle cx={size / 2} cy={size / 2} r={moduleSize * 1.8} fill="#DC2626" />
        <text
          x={size / 2}
          y={size / 2 + 3}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={moduleSize * 1.6}
          fontWeight="900"
          fontFamily="system-ui"
        >
          45
        </text>
      </svg>
      {label && <span className="mt-2 text-xs font-mono font-semibold text-neutral-600">{label}</span>}
    </div>
  );
};
