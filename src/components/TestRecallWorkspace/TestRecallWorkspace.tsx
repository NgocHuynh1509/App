import { useState, useMemo } from "react";
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
  const totalPoints = 100;

  for (let i = 0; i <= totalPoints; i++) {
    // 1. Cho position chạy từ 0 đến 0.13 (khớp hoàn toàn với maxPosition của GraphPanel)
    const position = (i / totalPoints) * 0.13; 

    // 2. Tăng lực max lên khoảng 6500 - 7000 lbf (vừa vặn đẹp với maxForce 7500)
    // Dùng Math.sin để tạo độ vồng cao vút
    const baseForce = 7000 * Math.sin((position / 0.13) * Math.PI * 0.85);
    
    // Thêm một chút nhiễu nhẹ
    const noise = (Math.random() - 0.5) * 30;
    const force = Math.max(0, baseForce + noise);

    points.push({
      position: Number(position.toFixed(4)),
      force: Number(force.toFixed(2)),
    });
  }

  return points;
}

interface Props {
  liveData: LiveData;
}

export default function TestRecallWorkspace({ liveData }: Props) {
  const [activeTab, setActiveTab] = useState<SubTab>("H5kT");

  const curve = useMemo(() => buildCurve(), []);

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
