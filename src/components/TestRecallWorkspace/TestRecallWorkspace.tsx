import { useState, useMemo, useEffect } from "react";
import H5kTTab from "./H5kTTab";
import MP1200Tab from "./MP1200Tab";
import RecallTab from "./RecallTab";
import "./TestRecallWorkspace.css";
import type { GraphPoint, LiveData, Specimen } from "../../types";

type SubTab = "H5kT" | "MP1200" | "Recall";

const SPECIMENS: Specimen[] = [
  {
    id: "1",
    status: "Before Test",
    width: 0.5,
    thickness: 0.03,
    area: 0.015,
    modulus: null,
    ultimateForce: null,
    ultimateStress: null,
  },
  {
    id: "2",
    status: "New",
    width: 0.5,
    thickness: 0.03,
    area: 0.015,
    modulus: null,
    ultimateForce: null,
    ultimateStress: null,
  },
];

function buildCurve(): GraphPoint[] {
  const points: GraphPoint[] = [];
  for (let i = 0; i <= 60; i++) {
    const position = (i / 60) * 1.3;
    const force = -540 * (1 - Math.exp(-position * 3));
    points.push({ position, force: Math.abs(force) });
  }
  return points;
}

export default function TestRecallWorkspace() {
  const [activeTab, setActiveTab] = useState<SubTab>("H5kT");

  const [liveData, setLiveData] = useState<LiveData>({
    force: -543.48,
    position: -0.006,
    time: 0,
    positionRate: 18,
  });

  const curve = useMemo(() => buildCurve(), []);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveData((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="tr-workspace">
      <div className="tr-workspace__tabs">
        {(["H5kT", "MP1200", "Recall"] as SubTab[]).map((tab) => (
          <button
            key={tab}
            className={`tr-workspace__tab ${activeTab === tab ? "tr-workspace__tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tr-workspace__content">
        {activeTab === "H5kT" && (
          <H5kTTab liveData={liveData} curve={curve} specimens={SPECIMENS} />
        )}
        {activeTab === "MP1200" && <MP1200Tab />}
        {activeTab === "Recall" && <RecallTab />}
      </div>
    </div>
  );
}
