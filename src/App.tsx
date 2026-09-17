import { useEffect, useState } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import TabNav from "./components/TabNav/TabNav";
import LibraryTools from "./components/LibraryTools/LibraryTools";
import MethodEditor from "./components/MethodEditor/MethodEditor";
import OutputEditor from "./components/OutputEditor/OutputEditor";
import ResultEditor from "./components/ResultEditor/Resulteditor";
import TestRecallWorkspace from "./components/TestRecallWorkspace/TestRecallWorkspace";
import MachineControlDock from "./components/MachineControlDock/MachineControlDock";
import StatusBar from "./components/StatusBar/StatusBar";
import type { LiveData, TabId } from "./types";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("test-recall");

  // Cho StatusBar - cập nhật khi chọn method/output/result trong LibraryTools
  const [currentMethod, setCurrentMethod] = useState("Generic Compression - Force vs. Position");
  const [currentOutput, setCurrentOutput] = useState("Generic Compression - Force vs. Position");
  const [currentResult, setCurrentResult] = useState("Ultimate Force");

  // Live machine data - shared by the left-hand jog dock and the Test & Recall workspace
  const [liveData, setLiveData] = useState<LiveData>({
    force: -543.48,
    position: -0.006,
    time: 0,
    positionRate: 18,
  });

  // Left machine control dock: can be shown or hidden
  const [dockOpen, setDockOpen] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveData((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function handleSelectMethod(name: string) {
    setCurrentMethod(name);
    setCurrentOutput(name);
  }
  function handleSelectOutput(name: string) {
    setCurrentOutput(name);
  }
  function handleSelectResult(name: string) {
    setCurrentResult(name);
  }

  return (
    <div className="app">
      <TitleBar />

      <div className="app__body">
        {dockOpen ? (
          <MachineControlDock liveData={liveData} onClose={() => setDockOpen(false)} />
        ) : (
          <button
            className="app__dock-reopen"
            onClick={() => setDockOpen(true)}
            title="Show machine control panel"
          >
            ▶
          </button>
        )}

        <div className="app__content">
          <TabNav activeTab={activeTab} onSelect={setActiveTab} />

          <main className="app__main">
            {activeTab === "library-tools" ? (
              <LibraryTools
                onSelectMethod={handleSelectMethod}
                onSelectOutput={handleSelectOutput}
                onSelectResult={handleSelectResult}
              />
            ) : activeTab === "method-editor" ? (
              <MethodEditor />
            ) : activeTab === "output-editor" ? (
              <OutputEditor selectedOutputName={currentOutput} />
            ) : activeTab === "result-editor" ? (
              <ResultEditor selectedResultName={currentResult} />
            ) : (
              <TestRecallWorkspace />
            )}
          </main>
        </div>
      </div>

      <StatusBar
        currentMethod={currentMethod}
        currentOutput={currentOutput}
        totalSpecimens={2}
        totalSelected={1}
      />
    </div>
  );
}
