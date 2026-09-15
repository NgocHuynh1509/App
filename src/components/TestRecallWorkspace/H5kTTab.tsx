import type { LiveData, GraphPoint, Specimen } from "../../types";
import GraphPanel from "../GraphPanel/GraphPanel";
import LiveDataStrip from "../LiveDataStrip/LiveDataStrip";
import SpecimenTable from "../SpecimenTable/SpecimenTable";
import "./H5kTTab.css";

interface Props {
  liveData: LiveData;
  curve: GraphPoint[];
  specimens: Specimen[];
}

export default function H5kTTab({
  liveData,
  curve,
  specimens,
}: Props) {
  return (
    <div className="h5kt-tab">
      {/* TOOLBAR */}
      <div className="horizon-toolbar">
        <div className="toolbar-group">
          <button className="horizon-button horizon-button--green">
            ▶ Start
          </button>

          <button className="horizon-button">
            ‖ Pause
          </button>

          <button className="horizon-button horizon-button--red">
            ■ Stop
          </button>

          <button className="horizon-button">
            ↻ Reset
          </button>
        </div>

        <div className="toolbar-separator" />

        <div className="toolbar-group">
          <button className="horizon-button">
            New Test
          </button>

          <button className="horizon-button">
            Save Test
          </button>

          <button className="horizon-button">
            Recall
          </button>
        </div>

        <div className="toolbar-spacer" />

        <div className="machine-status">
          <span className="machine-status__lamp" />
          <span>Machine Ready</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="h5kt-main">
        {/* LEFT MACHINE CONTROL */}
        <section className="horizon-panel h5kt-machine">
          <div className="horizon-panel__title">
            MACHINE CONTROL
          </div>

          <div className="horizon-panel__content">
            <div className="machine-name">
              <div className="machine-name__label">
                MACHINE
              </div>

              <div className="machine-name__value">
                TOVMC 3005T
              </div>
            </div>

            <div className="machine-section">
              <div className="machine-section__title">
                Force
              </div>

              <div className="digital-display">
                <span>{liveData.force.toFixed(2)}</span>
                <small>lbf</small>
              </div>
            </div>

            <div className="machine-section">
              <div className="machine-section__title">
                Position
              </div>

              <div className="digital-display">
                <span>{liveData.position.toFixed(4)}</span>
                <small>in</small>
              </div>
            </div>

            <div className="machine-section">
              <div className="machine-section__title">
                Jog Control
              </div>

              <div className="jog-control">
                <button>▲</button>

                <div className="jog-track">
                  <div className="jog-indicator" />
                </div>

                <button>▼</button>
              </div>
            </div>

            <div className="machine-section">
              <div className="machine-section__title">
                Crosshead Speed
              </div>

              <div className="speed-row">
                <span>Speed 1</span>
                <strong>0.5 in/min</strong>
              </div>

              <div className="speed-row">
                <span>Speed 2</span>
                <strong>2.0 in/min</strong>
              </div>
            </div>

            <div className="machine-jog-buttons">
              <button>◀</button>
              <button>▲</button>
              <button>●</button>
              <button>▼</button>
              <button>▶</button>
            </div>
          </div>
        </section>

        {/* GRAPH */}
        <section className="horizon-panel h5kt-graph">
          <div className="horizon-panel__title">
            FORCE vs POSITION
          </div>

          <div className="horizon-panel__content graph-content">
            <GraphPanel
              data={curve}
              maxForce={600}
              maxPosition={1.3}
            />
          </div>
        </section>
      </div>

      {/* LIVE DATA */}
      <section className="horizon-panel live-panel">
        <div className="horizon-panel__title">
          LIVE DATA
        </div>

        <div className="live-panel__content">
          <LiveDataStrip data={liveData} />
        </div>
      </section>

      {/* SPECIMENS */}
      <section className="horizon-panel specimen-panel">
        <div className="horizon-panel__title">
          SPECIMEN / RESULT
        </div>

        <div className="specimen-panel__content">
          <SpecimenTable specimens={specimens} />
        </div>
      </section>
    </div>
  );
}