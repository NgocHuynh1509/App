import { useState } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import TabNav from "./components/TabNav/TabNav";
import LibraryTools from "./components/LibraryTools/LibraryTools";
import MethodEditor from "./components/MethodEditor/MethodEditor";
import OutputEditor from "./components/OutputEditor/OutputEditor";
import TestRecallWorkspace from "./components/TestRecallWorkspace/TestRecallWorkspace";
import StatusBar from "./components/StatusBar/StatusBar";
import type { TabId } from "./types";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("test-recall");

  // Cho StatusBar - cập nhật khi chọn method trong LibraryTools
  const [currentMethod, setCurrentMethod] = useState("Generic Compression - Force vs. Position");
  const [currentOutput, setCurrentOutput] = useState("Generic Compression - Force vs. Position");

  function handleSelectMethod(name: string) {
    setCurrentMethod(name);
    setCurrentOutput(name);
  }

  return (
    <div className="app">
      <TitleBar />
      <TabNav activeTab={activeTab} onSelect={setActiveTab} />

      <main className="app__main">
        {activeTab === "library-tools" ? (
          <LibraryTools onSelectMethod={handleSelectMethod} />
        ) : activeTab === "method-editor" ? (
          <MethodEditor />
        ) : activeTab === "output-editor" ? (
          <OutputEditor selectedOutputName={currentOutput} />
        ) : (
          <TestRecallWorkspace />
        )}
      </main>

      <StatusBar
        currentMethod={currentMethod}
        currentOutput={currentOutput}
        totalSpecimens={2}
        totalSelected={1}
      />
    </div>
  );
}