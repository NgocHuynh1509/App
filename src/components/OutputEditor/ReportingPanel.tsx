import { useState, type CSSProperties } from "react";
import { colors, s } from "./styles";

interface ResultRow {
  order: number;
  name: string;
  header1: string;
  header2: string;
  units: string;
  formatType: string;
  format: number;
  widthIn: number;
  headerJustification: string;
  dataJustification: string;
  resultIndex: number;
}

const INITIAL_RESULTS: ResultRow[] = [
  {
    order: 1,
    name: "Break Stress",
    header1: "Break Stress",
    header2: "(Enter Value)",
    units: "MPa",
    formatType: "Significant Digits",
    format: 3,
    widthIn: 1,
    headerJustification: "Left",
    dataJustification: "Left",
    resultIndex: 0,
  },
  {
    order: 2,
    name: "Ultimate Force",
    header1: "Ultimate Force",
    header2: "(Enter Value)",
    units: "N",
    formatType: "Significant Digits",
    format: 3,
    widthIn: 1,
    headerJustification: "Left",
    dataJustification: "Left",
    resultIndex: 0,
  },
];

type ReportTab = "summary" | "single";
type PreviewPanel = "image-left" | "title" | "image-right" | "results" | "graph-1" | "graph-2" | null;

export default function ReportingPanel() {
  const [reportTab, setReportTab] = useState<ReportTab>("summary");
  const [results, setResults] = useState<ResultRow[]>(INITIAL_RESULTS);
  const [selectedRow, setSelectedRow] = useState<number | null>(0);
  const [activePanel, setActivePanel] = useState<PreviewPanel>(null);

  const [showResultsOnScreen, setShowResultsOnScreen] = useState(true);
  const [reportConsolidation, setReportConsolidation] = useState(false);
  const [showStatisticsOnly, setShowStatisticsOnly] = useState(false);

  function addResultRow() {
    setResults((prev) => [
      ...prev,
      {
        order: prev.length + 1,
        name: "New Result",
        header1: "New Result",
        header2: "(Enter Value)",
        units: "",
        formatType: "Significant Digits",
        format: 3,
        widthIn: 1,
        headerJustification: "Left",
        dataJustification: "Left",
        resultIndex: 0,
      },
    ]);
  }

  function deleteResultRow() {
    if (selectedRow === null) return;
    setResults((prev) => prev.filter((_, i) => i !== selectedRow));
    setSelectedRow(null);
  }

  const stackFieldRow: CSSProperties = { ...s.fieldRow, flexDirection: "column", alignItems: "stretch" };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%" }}>
      {/* Left settings column */}
      <div
        style={{
          flex: "0 0 200px",
          minWidth: 0,
          background: colors.panelBg,
          border: `1px solid ${colors.border}`,
          padding: "8px 0",
          boxSizing: "border-box",
        }}
      >
        <div style={stackFieldRow}>
          <label>Name:</label>
          <input style={s.fieldInput} defaultValue="Summary Report" />
        </div>
        <div style={stackFieldRow}>
          <label>Type:</label>
          <select style={s.fieldInput} defaultValue="Summary">
            <option>Summary</option>
            <option>Single</option>
          </select>
        </div>
        <div style={stackFieldRow}>
          <label>Paper Size:</label>
          <select style={s.fieldInput} defaultValue="Letter">
            <option>Letter</option>
            <option>A4</option>
            <option>Legal</option>
          </select>
        </div>
        <div style={stackFieldRow}>
          <label>Orientation:</label>
          <select style={s.fieldInput} defaultValue="Landscape">
            <option>Landscape</option>
            <option>Portrait</option>
          </select>
        </div>

        <label style={s.checkboxRow}>
          <input
            type="checkbox"
            checked={showResultsOnScreen}
            onChange={(e) => setShowResultsOnScreen(e.target.checked)}
          />
          Show Results On Screen
        </label>
        <label style={s.checkboxRow}>
          <input
            type="checkbox"
            checked={reportConsolidation}
            onChange={(e) => setReportConsolidation(e.target.checked)}
          />
          Report Consolidation
        </label>
        <label style={{ ...s.checkboxRow, paddingLeft: 22 }}>
          <input
            type="checkbox"
            disabled={!reportConsolidation}
            checked={showStatisticsOnly}
            onChange={(e) => setShowStatisticsOnly(e.target.checked)}
          />
          Show Statistics Only
        </label>

        <button
          style={{
            margin: "10px 8px 4px",
            background: "#eef1f3",
            border: `1px solid ${colors.border}`,
            padding: "6px 8px",
            fontSize: 11,
            cursor: "pointer",
            width: "calc(100% - 16px)",
            textAlign: "left",
          }}
        >
          ⚙ Automatic Options
        </button>
      </div>

      {/* Right: designer + result selection */}
      <div
        style={{
          flex: "1 1 0%",
          minWidth: 0,
          background: colors.panelBg,
          border: `1px solid ${colors.border}`,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: 2, padding: "4px 8px 0", background: colors.headerBg }}>
          <button style={s.tab(reportTab === "summary")} onClick={() => setReportTab("summary")}>
            Summary Report
            {reportTab === "summary" && <span style={{ color: "#8a333a", fontWeight: 700 }}>×</span>}
          </button>
          <button style={s.tab(reportTab === "single")} onClick={() => setReportTab("single")}>
            Single Report
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 6,
            borderBottom: `1px solid ${colors.border}`,
            background: "#f4f6f7",
          }}
        >
          {["Layouts", "Add", "Zoom", "Preview", "Edit", "Enlarge", "Shrink", "Delete", "Position"].map(
            (label) => (
              <button key={label} style={s.toolbarBtn}>
                {label}
              </button>
            )
          )}
        </div>

        <div style={s.panelHeader}>Report Preview</div>
        <div style={{ margin: 10, border: "1px solid #9aa4ab", background: "#fff" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #c9cfd4" }}>
            <PreviewCell
              label="Image"
              active={activePanel === "image-left"}
              onClick={() => setActivePanel("image-left")}
            />
            <PreviewCell
              label="Title"
              active={activePanel === "title"}
              onClick={() => setActivePanel("title")}
            />
            <PreviewCell
              label="Image"
              active={activePanel === "image-right"}
              onClick={() => setActivePanel("image-right")}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: "1px solid #c9cfd4",
              fontSize: 11,
              padding: "4px 8px",
            }}
          >
            <div style={{ flex: "1 1 0%" }}>
              <span style={{ color: "#46525f" }}>Method Name:</span>{" "}
              <span style={{ color: colors.ghost, fontWeight: 700 }}>Batches</span>
            </div>
            <div style={{ flex: "1 1 0%" }}>
              <span style={{ color: "#46525f" }}>Output Name:</span>{" "}
              <span style={{ color: colors.ghost, fontWeight: 700 }}>Batches</span>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: 90,
              cursor: "pointer",
              padding: "4px 8px 24px",
              outline: activePanel === "results" ? `2px solid ${colors.ribbonActive}` : "none",
              outlineOffset: -2,
              boxSizing: "border-box",
            }}
            onClick={() => setActivePanel("results")}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                fontSize: 9,
                color: "#46525f",
                borderBottom: "1px solid #dfe3e6",
                paddingBottom: 4,
                flexWrap: "wrap",
              }}
            >
              {[
                "Width\nin",
                "Thickness\nin",
                "Area\nin\u00b2",
                "Modulus\nMpsi",
                "Ultimate Force\nlbf",
                "Ultimate Stress\nksi",
                "Offset @ 0.2%\nlbf",
                "Offset @ 0.2%\nksi",
                "TE (Manual)\n%",
                "Area (Reduction)\n%",
              ].map((h) => (
                <div key={h} style={{ minWidth: 46 }}>
                  {h.split("\n").map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                </div>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: colors.ghost,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              Results
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <MiniGraph
              title="Graph"
              yLabel="Stress (ksi)"
              xLabel="Strain (%)"
              yMax={50}
              xMax={2}
              active={activePanel === "graph-1"}
              onClick={() => setActivePanel("graph-1")}
              withDivider
            />
            <MiniGraph
              title="Graph"
              yLabel="Force (lbf)"
              xLabel="Position (in)"
              yMax={20000}
              xMax={1}
              active={activePanel === "graph-2"}
              onClick={() => setActivePanel("graph-2")}
            />
          </div>
        </div>

        {activePanel === "results" && (
          <div style={{ margin: 10, borderTop: "2px solid #c3cad0", paddingTop: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 8px",
                color: colors.selectedBarText,
                background: colors.selectedBarBg,
                fontSize: 12,
              }}
            >
              <button
                style={{
                  background: colors.danger,
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 22,
                  height: 22,
                  cursor: "pointer",
                }}
                onClick={() => setActivePanel(null)}
              >
                ◀
              </button>
              <span>
                Report: <b>Summary Report</b> &nbsp; Section: <b>UTM Results</b>
              </span>
            </div>

            <div style={s.toolbar}>
              <button style={s.toolbarBtn} onClick={addResultRow}>
                Add
              </button>
              {["Insert Before", "Insert After", "Cut", "Copy", "Paste Current", "Paste Before", "Paste After"].map(
                (label) => (
                  <button key={label} style={s.toolbarBtn}>
                    {label}
                  </button>
                )
              )}
              <button style={s.toolbarBtn} onClick={deleteResultRow}>
                Delete
              </button>
              <button style={s.toolbarBtn}>Expand All</button>
              <button style={s.toolbarBtn}>Collapse All</button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ ...s.table, minWidth: 900, marginTop: 4 }}>
                <thead>
                  <tr>
                    <th style={s.th}>Order #</th>
                    <th style={s.th}>Result Name</th>
                    <th style={s.th}>Header 1</th>
                    <th style={s.th}>Header 2</th>
                    <th style={s.th}>Units</th>
                    <th style={s.th}>Format Type</th>
                    <th style={s.th}>Format</th>
                    <th style={s.th}>Width, in</th>
                    <th style={s.th}>Header Justification</th>
                    <th style={s.th}>Data Justification</th>
                    <th style={s.th}>Result Index</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr
                      key={i}
                      style={{
                        cursor: "pointer",
                        background: selectedRow === i ? colors.rowSelected : undefined,
                      }}
                      onClick={() => setSelectedRow(i)}
                    >
                      <td style={s.td}>{r.order}</td>
                      <td style={s.td}>{r.name}</td>
                      <td style={s.td}>{r.header1}</td>
                      <td style={{ ...s.td, fontStyle: "italic", color: "#8a919a" }}>{r.header2}</td>
                      <td style={s.td}>{r.units}</td>
                      <td style={s.td}>{r.formatType}</td>
                      <td style={s.td}>{r.format}</td>
                      <td style={s.td}>{r.widthIn}</td>
                      <td style={s.td}>{r.headerJustification}</td>
                      <td style={s.td}>{r.dataJustification}</td>
                      <td style={s.td}>{r.resultIndex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewCell({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <div
      style={{
        position: "relative",
        flex: "1 1 0%",
        minWidth: 0,
        height: 90,
        borderRight: "1px dashed #cf5b63",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        outline: active ? `2px solid ${colors.ribbonActive}` : "none",
        outlineOffset: -2,
        boxSizing: "border-box",
      }}
      onClick={onClick}
    >
      <span
        style={{
          position: "absolute",
          top: 4,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 9,
          color: colors.danger,
          fontWeight: 600,
        }}
      >
        (PANEL NOT CONFIGURED)
      </span>
      <span style={{ color: colors.ghost, fontSize: 28, fontWeight: 700 }}>{label}</span>
    </div>
  );
}

function MiniGraph({
  title,
  yLabel,
  xLabel,
  yMax,
  xMax,
  active,
  onClick,
  withDivider,
}: {
  title: string;
  yLabel: string;
  xLabel: string;
  yMax: number;
  xMax: number;
  active: boolean;
  onClick: () => void;
  withDivider?: boolean;
}) {
  const yTicks = 5;
  const xTicks = 5;
  return (
    <div
      style={{
        position: "relative",
        flex: "1 1 0%",
        minWidth: 0,
        padding: 6,
        cursor: "pointer",
        borderRight: withDivider ? "1px solid #c9cfd4" : "none",
        outline: active ? `2px solid ${colors.ribbonActive}` : "none",
        outlineOffset: -2,
        boxSizing: "border-box",
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: colors.ghost,
          fontSize: 26,
          fontWeight: 700,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 2,
          transform: "rotate(-90deg) translateX(50%)",
          fontSize: 9,
          fontWeight: 600,
        }}
      >
        {yLabel}
      </div>
      <svg viewBox="0 0 260 180" style={{ width: "100%", height: 150 }}>
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const y = 10 + (1 - i / yTicks) * 140;
          return (
            <g key={i}>
              <line x1={40} y1={y} x2={250} y2={y} stroke="#dfe3e6" />
              <text x={36} y={y + 3} fontSize="8" textAnchor="end">
                {((yMax * i) / yTicks).toLocaleString()}
              </text>
            </g>
          );
        })}
        {Array.from({ length: xTicks + 1 }, (_, i) => {
          const x = 40 + (i / xTicks) * 210;
          return (
            <g key={i}>
              <line x1={x} y1={10} x2={x} y2={150} stroke="#dfe3e6" />
              <text x={x} y={162} fontSize="8" textAnchor="middle">
                {((xMax * i) / xTicks).toFixed(2)}
              </text>
            </g>
          );
        })}
        <rect x={40} y={10} width={210} height={140} fill="none" stroke="#9aa4ab" />
      </svg>
      <div style={{ textAlign: "center", fontSize: 9, fontWeight: 600 }}>{xLabel}</div>
    </div>
  );
}