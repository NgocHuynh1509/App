import { useState } from "react";
import "./RecallTab.css";

const TESTS = [
  {
    id: "TEST-001",
    date: "15/09/2026 14:32",
    machine: "H5kT",
    method: "Tensile Test",
    specimen: "Specimen 1",
    result: "543.48 lbf",
    status: "Completed",
  },
  {
    id: "TEST-002",
    date: "14/09/2026 10:18",
    machine: "MP1200",
    method: "Melt Flow",
    specimen: "Specimen 2",
    result: "12.4 g/10 min",
    status: "Completed",
  },
  {
    id: "TEST-003",
    date: "13/09/2026 16:05",
    machine: "H5kT",
    method: "Tensile Test",
    specimen: "Specimen 3",
    result: "498.65 lbf",
    status: "Completed",
  },
];

export default function RecallTab() {
  const [search, setSearch] = useState("");

  const filtered = TESTS.filter((item) =>
    `${item.id} ${item.machine} ${item.method} ${item.specimen}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="recall-tab">
      <div className="recall-toolbar">
        <span>Search Tests:</span>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select defaultValue="All">
          <option>All Machines</option>
          <option>H5kT</option>
          <option>MP1200</option>
        </select>

        <select defaultValue="All">
          <option>All Status</option>
          <option>Completed</option>
        </select>

        <button className="recall-btn">
          Search
        </button>

        <button className="recall-btn">
          Clear
        </button>
      </div>

      <div className="recall-main">
        <section className="horizon-panel recall-list">
          <div className="horizon-panel__title">
            SAVED TESTS
          </div>

          <div className="recall-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Date / Time</th>
                  <th>Machine</th>
                  <th>Method</th>
                  <th>Specimen</th>
                  <th>Result</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((test) => (
                  <tr key={test.id}>
                    <td>{test.id}</td>
                    <td>{test.date}</td>
                    <td>{test.machine}</td>
                    <td>{test.method}</td>
                    <td>{test.specimen}</td>
                    <td>{test.result}</td>
                    <td className="recall-completed">
                      {test.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="horizon-panel recall-preview">
          <div className="horizon-panel__title">
            TEST PREVIEW
          </div>

          <div className="recall-preview__content">
            <div className="recall-preview__graph">
              <div className="preview-grid">
                <div className="preview-line" />
              </div>
            </div>

            <div className="recall-preview__details">
              <div>
                <span>Test ID</span>
                <strong>TEST-001</strong>
              </div>

              <div>
                <span>Machine</span>
                <strong>H5kT</strong>
              </div>

              <div>
                <span>Method</span>
                <strong>Tensile Test</strong>
              </div>

              <div>
                <span>Maximum Force</span>
                <strong>543.48 lbf</strong>
              </div>

              <div>
                <span>Position</span>
                <strong>1.3000 in</strong>
              </div>

              <div className="recall-actions">
                <button className="recall-btn">
                  Open
                </button>

                <button className="recall-btn">
                  Recall
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}