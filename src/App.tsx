import { useEffect, useMemo, useState } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import TabNav from "./components/TabNav/TabNav";
import GraphPanel from "./components/GraphPanel/GraphPanel";
import LiveDataStrip from "./components/LiveDataStrip/LiveDataStrip";
import SpecimenTable from "./components/SpecimenTable/SpecimenTable";
import StatusBar from "./components/StatusBar/StatusBar";
import MachineControlPanel from "./components/MachineControlPanel/MachineControlPanel";
import MachineControlToggleTab from "./components/MachineControlPanel/MachineControlToggleTab";
import LibraryTools from "./components/LibraryTools/LibraryTools";
import type { GraphPoint, LiveData, Specimen, TabId } from "./types";
import "./App.css";

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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("test-recall");
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [liveData, setLiveData] = useState<LiveData>({
    force: -543.48,
    position: -0.006,
    time: 0,
    positionRate: 0,
  });

  const curve = useMemo(() => buildCurve(), []);

  // Lightweight simulated tick so the panel doesn't look static.
  useEffect(() => {
    const id = setInterval(() => {
      setLiveData((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app">
      <TitleBar />
      <TabNav activeTab={activeTab} onSelect={setActiveTab} />

      <main className="app__main">
        {activeTab === "library-tools" ? (
          <LibraryTools />
        ) : (
          <section className="app__workspace">
            <GraphPanel data={curve} maxForce={600} maxPosition={1.3} />
            <LiveDataStrip data={liveData} />
            <SpecimenTable specimens={SPECIMENS} />
          </section>
        )}
      </main>

      <StatusBar
        currentMethod="Generic Compression - Force vs. Position"
        currentOutput="Generic Compression - Force vs. Position"
        totalSpecimens={SPECIMENS.length}
        totalSelected={1}
      />

      <MachineControlPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        force={liveData.force}
        position={liveData.position}
      />
      <MachineControlToggleTab isOpen={isPanelOpen} onOpen={() => setIsPanelOpen(true)} />
    </div>
  );
}
