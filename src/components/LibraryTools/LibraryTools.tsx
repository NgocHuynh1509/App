import { useMemo, useState } from "react";
import type { LibraryView, TestMethod } from "../../types";
import { STANDARD_METHODS, WORKING_METHODS } from "./methodData";
import "./LibraryTools.css";

const METHOD_TYPES = ["All", "UTM", "MTM", "UTM/MTM"];

export default function LibraryTools() {
  const [view, setView] = useState<LibraryView>("working");
  const [methodType, setMethodType] = useState("All");
  const [keyword, setKeyword] = useState("");
  const [showOverviews, setShowOverviews] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("m5");

  const methods: TestMethod[] = view === "working" ? WORKING_METHODS : STANDARD_METHODS;

  const filtered = useMemo(() => {
    if (!keyword.trim()) return methods;
    const k = keyword.toLowerCase();
    return methods.filter((m) => m.name.toLowerCase().includes(k));
  }, [methods, keyword]);

  return (
    <div className="library-tools">
      <div className="library-tools__toolbar">
        <button className="library-tools__tool">
          <span className="library-tools__tool-icon">✎</span>
          Edit
        </button>
        <button className="library-tools__tool">
          <span className="library-tools__tool-icon">✕</span>
          Delete
        </button>
        <button className="library-tools__tool">
          <span className="library-tools__tool-icon">◎</span>
          Show Deleted
        </button>
        <button className="library-tools__tool">
          <span className="library-tools__tool-icon">↺</span>
          Recover
        </button>
        <button className="library-tools__tool">
          <span className="library-tools__tool-icon">⌕</span>
          Show Where Used
        </button>
        <button className="library-tools__tool">
          <span className="library-tools__tool-icon">⇩</span>
          Export
        </button>
        <button className="library-tools__tool">
          <span className="library-tools__tool-icon">⇧</span>
          Import
        </button>

        <div className="library-tools__spacer" />

        <label className="library-tools__field">
          Keyword:
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="(Enter Value)"
          />
        </label>

        <label className="library-tools__field">
          Method Type:
          <select value={methodType} onChange={(e) => setMethodType(e.target.value)}>
            {METHOD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="library-tools__checkbox">
          <input
            type="checkbox"
            checked={showOverviews}
            onChange={(e) => setShowOverviews(e.target.checked)}
          />
          Show Overviews
        </label>
      </div>

      <div className="library-tools__subtabs">
        <button
          className={
            "library-tools__subtab" + (view === "working" ? " library-tools__subtab--active" : "")
          }
          onClick={() => setView("working")}
        >
          Library of Working Methods
        </button>
        <button
          className={
            "library-tools__subtab" + (view === "standard" ? " library-tools__subtab--active" : "")
          }
          onClick={() => setView("standard")}
        >
          Library of Standard Methods
        </button>
        <div className="library-tools__spacer" />
        <span className="library-tools__count">Methods Found: {filtered.length}</span>
      </div>

      <div className="library-tools__table-wrap">
        <table>
          <thead>
            <tr>
              <th className="library-tools__col-inuse">In Use</th>
              <th>Method Name</th>
              <th>Equipment</th>
              <th>Last Modified Date</th>
              <th>Method Type</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr
                key={m.id}
                className={
                  m.id === selectedId
                    ? "library-tools__row--selected"
                    : m.inUse
                    ? "library-tools__row--inuse"
                    : ""
                }
                onClick={() => setSelectedId(m.id)}
              >
                <td className="library-tools__col-inuse">{m.inUse ? "●" : ""}</td>
                <td>{m.name}</td>
                <td>{m.equipment}</td>
                <td>{m.lastModified}</td>
                <td>{m.methodType}</td>
                <td>{m.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
