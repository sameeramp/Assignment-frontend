import { useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";

import ResizeHandle from "./ResizeHandle";
import styles from "../../styles.module.css";

export default function Resize() {
  const [showFirstPanel, setShowFirstPanel] = useState(true);
  const [showLastPanel, setShowLastPanel] = useState(true);

  return (
    <div className={styles.Container}>
      {/* <div className={styles.TopRow}>
        <a
          className={styles.Link}
          href="https://github.com/bvaughn/react-resizable-panels"
        >
          github.com/bvaughn/react-resizable-panels
        </a>

        <p>
          <button
            className={styles.Button}
            onClick={() => setShowFirstPanel(!showFirstPanel)}
          >
            {showFirstPanel ? "hide" : "show"} top panel
          </button>
          &nbsp;
          <button
            className={styles.Button}
            onClick={() => setShowLastPanel(!showLastPanel)}
          >
            {showLastPanel ? "hide" : "show"} bottom panel
          </button>
        </p>
      </div> */}
      <div style={{background: "red", height: "500px"}} className={styles.BottomRow}>
        <PanelGroup autoSaveId="example" direction="horizontal">
          <>
            {/* <Panel className={styles.Panel} defaultSize={20} order={1}>
              <PanelGroup autoSaveId="example" direction="vertical">
                <Panel className={styles.Panel} order={1}>
                  <div className={styles.PanelContent}>tr</div>
                </Panel>
                <ResizeHandle />
                <Panel className={styles.Panel} order={2}>
                  <div className={styles.PanelContent}>tb</div>
                </Panel>
              </PanelGroup>
            </Panel> */}
            <Panel className={styles.Panel} defaultSize={20} order={1}>
              <PanelGroup autoSaveId="example" direction="vertical">
                <Panel className={styles.Panel} order={1}>

                  <div style={{backgroundColor:'yellow'}} className={styles.PanelContent}>
                    {/* <img  style={{height:"100%",width:"100%"}} src="" alt="" /> */}
                  </div>
                </Panel>
                <ResizeHandle />
                <Panel className={styles.Panel} order={2}>
                <div style={{backgroundColor:'blue'}} className={styles.PanelContent}>
                    {/* <img style={{height:"100%",width:"100%"}} src="" alt="" /> */}
                  </div>                </Panel>
              </PanelGroup>
            </Panel>
            <ResizeHandle />
          </>
          <Panel className={styles.Panel} order={2}>
            <PanelGroup autoSaveId="example" direction="vertical">
              {/* <Panel className={styles.Panel} order={1}>
              <div className={styles.PanelContent}>
                    <img style={{height:"100%",width:"100%"}} src="" alt="" />
                  </div>              </Panel> */}
              {/* <ResizeHandle /> */}
              <Panel className={styles.Panel} order={2}>
              <div style={{backgroundColor:'teal'}} className={styles.PanelContent}>
                    {/* <img style={{height:"100%",width:"100%"}} src="" alt="" /> */}
                  </div>              
                  </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
