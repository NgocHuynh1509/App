import { useState } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import TabNav from "./components/TabNav/TabNav";
import LibraryTools from "./components/LibraryTools/LibraryTools";
import TestRecallWorkspace from "./components/TestRecallWorkspace/TestRecallWorkspace";
import StatusBar from "./components/StatusBar/StatusBar";
import type { TabId } from "./types";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("test-recall");

  return (
    <div className="app">
      <TitleBar />
      <TabNav activeTab={activeTab} onSelect={setActiveTab} />

      <main className="app__main">
        {activeTab === "library-tools" ? (
          <LibraryTools />
        ) : (
          <TestRecallWorkspace />
        )}
      </main>

      <StatusBar
        currentMethod="Generic Compression - Force vs. Position"
        currentOutput="Generic Compression - Force vs. Position"
        totalSpecimens={2}
        totalSelected={1}
      />
    </div>
  );
}
