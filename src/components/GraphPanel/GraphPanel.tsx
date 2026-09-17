import { useMemo } from "react";
import type { GraphPoint } from "../../types";
import "./GraphPanel.css";

// Khai báo rõ ràng thuộc tính data để H5kTTab không bị báo lỗi TypeScript
export interface GraphPanelProps {
  data?: GraphPoint[];
  maxForce?: number;
  maxPosition?: number;
}

const PADDING = { top: 20, right: 30, bottom: 60, left: 70 };

const DEFAULT_CURVE: GraphPoint[] = [
  { position: 0.00, force: 0 },
  { position: 0.01, force: 1800 },
  { position: 0.02, force: 3400 },
  { position: 0.03, force: 4700 },
  { position: 0.04, force: 5600 },
  { position: 0.05, force: 6200 },
  { position: 0.06, force: 6700 },
  { position: 0.08, force: 7000 },
  { position: 0.10, force: 7150 },
  { position: 0.11, force: 7100 },
];

export default function GraphPanel({
  data,
  maxForce = 7500,
  maxPosition = 0.13,
}: GraphPanelProps) {
  const width = 700;
  const height = 360;
  const plotW = width - PADDING.left - PADDING.right;
  const plotH = height - PADDING.top - PADDING.bottom;

const points = useMemo(() => {
  if (!data || data.length === 0) return DEFAULT_CURVE;
  const maxVal = Math.max(...data.map((d) => Math.abs(d.force)));
  return maxVal < 100 ? DEFAULT_CURVE : data; // Nếu dữ liệu truyền vào có force bé sẽ bị reset về DEFAULT_CURVE
}, [data]);

  const pathD = useMemo(() => {
    return points
      .map((p, i) => {
        const x = PADDING.left + (p.position / maxPosition) * plotW;
        const y = PADDING.top + plotH - (Math.abs(p.force) / maxForce) * plotH;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  }, [points, maxForce, maxPosition, plotW, plotH]);

  const yTicks = [0, 1250, 2500, 3750, 5000, 6250, 7500];
  const xTicks = [0.00, 0.02, 0.03, 0.05, 0.07, 0.08, 0.10, 0.11, 0.13];

  const lastPt = points[points.length - 1];
  const lastX = PADDING.left + (lastPt.position / maxPosition) * plotW;
  const lastY = PADDING.top + plotH - (Math.abs(lastPt.force) / maxForce) * plotH;

  return (
    <div className="graph-panel">
      <div className="graph-panel__header">Force vs. Position</div>

      <div className="graph-panel__body">
        <svg
          className="graph-panel__svg"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          {yTicks.map((val) => {
            const y = PADDING.top + plotH - (val / maxForce) * plotH;
            return (
              <g key={`y-${val}`}>
                <line
                  x1={PADDING.left}
                  x2={width - PADDING.right}
                  y1={y}
                  y2={y}
                  className="graph-panel__gridline"
                />
                <text
                  x={PADDING.left - 10}
                  y={y + 4}
                  className="graph-panel__tick graph-panel__tick--y"
                >
                  {val === 0 ? "0" : val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {xTicks.map((val) => {
            const x = PADDING.left + (val / maxPosition) * plotW;
            return (
              <g key={`x-${val}`}>
                <line
                  x1={x}
                  x2={x}
                  y1={PADDING.top}
                  y2={height - PADDING.bottom}
                  className="graph-panel__gridline"
                />
                <text
                  x={x}
                  y={height - PADDING.bottom + 16}
                  className="graph-panel__tick graph-panel__tick--x"
                >
                  {val.toFixed(2)}
                </text>
              </g>
            );
          })}

          <rect
            x={PADDING.left}
            y={PADDING.top}
            width={plotW}
            height={plotH}
            className="graph-panel__border"
          />

          <path d={pathD} className="graph-panel__curve" />

          <circle cx={lastX} cy={lastY} r="4" className="graph-panel__break-point" />

          <text
            x={-(PADDING.top + plotH / 2)}
            y={20}
            className="graph-panel__axis-label"
            transform="rotate(-90)"
          >
            Force (lbf)
          </text>

          <text
            x={PADDING.left + plotW / 2}
            y={height - 12}
            className="graph-panel__axis-label"
          >
            Position (in)
          </text>
        </svg>
      </div>
    </div>
  );
}