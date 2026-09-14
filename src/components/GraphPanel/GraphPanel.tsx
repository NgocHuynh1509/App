import { useMemo } from "react";
import type { GraphPoint } from "../../types";
import "./GraphPanel.css";

interface Props {
  data: GraphPoint[];
  maxForce: number;
  maxPosition: number;
}

const PADDING = { top: 16, right: 20, bottom: 34, left: 56 };

export default function GraphPanel({ data, maxForce, maxPosition }: Props) {
  const width = 640;
  const height = 260;
  const plotW = width - PADDING.left - PADDING.right;
  const plotH = height - PADDING.top - PADDING.bottom;

  const path = useMemo(() => {
    if (data.length === 0) return "";
    return data
      .map((p, i) => {
        const x = PADDING.left + (p.position / maxPosition) * plotW;
        const y = PADDING.top + plotH - (p.force / maxForce) * plotH;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  }, [data, maxForce, maxPosition, plotW, plotH]);

  const yTicks = 6;
  const xTicks = 8;

  return (
    <div className="graph-panel">
      <div className="graph-panel__header">Force vs. Position</div>
      <svg
        className="graph-panel__svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Force versus position chart"
      >
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const y = PADDING.top + (plotH / yTicks) * i;
          const value = maxForce - (maxForce / yTicks) * i;
          return (
            <g key={`y-${i}`}>
              <line
                x1={PADDING.left}
                x2={width - PADDING.right}
                y1={y}
                y2={y}
                className="graph-panel__gridline"
              />
              <text x={PADDING.left - 8} y={y + 3} className="graph-panel__tick graph-panel__tick--y">
                {Math.round(value)}
              </text>
            </g>
          );
        })}

        {Array.from({ length: xTicks + 1 }).map((_, i) => {
          const x = PADDING.left + (plotW / xTicks) * i;
          const value = (maxPosition / xTicks) * i;
          return (
            <g key={`x-${i}`}>
              <line
                x1={x}
                x2={x}
                y1={PADDING.top}
                y2={height - PADDING.bottom}
                className="graph-panel__gridline"
              />
              <text x={x} y={height - PADDING.bottom + 16} className="graph-panel__tick graph-panel__tick--x">
                {value.toFixed(2)}
              </text>
            </g>
          );
        })}

        <path d={path} className="graph-panel__curve" />

        <text
          x={PADDING.left - 40}
          y={PADDING.top + plotH / 2}
          className="graph-panel__axis-label"
          transform={`rotate(-90 ${PADDING.left - 40} ${PADDING.top + plotH / 2})`}
        >
          Force (lbf)
        </text>
        <text x={PADDING.left + plotW / 2} y={height - 4} className="graph-panel__axis-label">
          Position (in)
        </text>
      </svg>
    </div>
  );
}
