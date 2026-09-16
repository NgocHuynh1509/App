import type { CSSProperties } from "react";

export const colors = {
  bodyBg: "#eef1f3",
  panelBg: "#fff",
  border: "#c3cad0",
  headerBg: "#303a45",
  headerText: "#e5e9ec",
  ribbonBg1: "#3a4552",
  ribbonBg2: "#29323c",
  ribbonText: "#d7dde2",
  ribbonActive: "#4c9a2a",
  gold: "#cfa227",
  selectedBarBg: "#232b34",
  selectedBarText: "#e7c15a",
  rowSelected: "#f0d989",
  ghost: "#c7cdd2",
  danger: "#cf5b63",
};

export const s = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: 0,
    minWidth: 0,
    background: colors.bodyBg,
    color: "#1c2530",
    fontFamily: '"Segoe UI", Tahoma, Arial, sans-serif',
    fontSize: 12,
    boxSizing: "border-box",
  } as CSSProperties,

  body: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    overflow: "auto",
    padding: 10,
    boxSizing: "border-box",
  } as CSSProperties,

  panelHeader: {
    background: colors.headerBg,
    color: colors.headerText,
    fontWeight: 600,
    padding: "4px 8px",
    fontSize: 12,
  } as CSSProperties,

  twoColRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    width: "100%",
    boxSizing: "border-box",
  } as CSSProperties,

  colPane: {
    flex: "1 1 0%",
    minWidth: 0,
    background: colors.panelBg,
    border: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  } as CSSProperties,

  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    background: "#f4f6f7",
    border: `1px solid ${colors.border}`,
    borderTop: "none",
    padding: 4,
    boxSizing: "border-box",
  } as CSSProperties,

  toolbarBtn: {
    background: "#eef1f3",
    border: "1px solid #c3cad0",
    padding: "4px 8px",
    fontSize: 11,
    cursor: "pointer",
    borderRadius: 2,
  } as CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 11,
  } as CSSProperties,

  th: {
    background: "#e6eaed",
    textAlign: "left",
    padding: "4px 6px",
    borderBottom: `1px solid ${colors.border}`,
  } as CSSProperties,

  td: {
    padding: "4px 6px",
    borderBottom: "1px solid #eceff1",
  } as CSSProperties,

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "3px 8px",
    fontSize: 12,
    boxSizing: "border-box",
  } as CSSProperties,

  fieldRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "2px 8px",
    minWidth: 0,
    boxSizing: "border-box",
  } as CSSProperties,

  fieldLabel: {
    flex: "0 0 100px",
  } as CSSProperties,

  fieldInput: {
    flex: "1 1 auto",
    minWidth: 0,
    width: "100%",
    fontSize: 12,
    padding: "2px 4px",
    border: "1px solid #b9c1c8",
    borderRadius: 2,
    background: "#fff",
    boxSizing: "border-box",
  } as CSSProperties,

  tabsRow: {
    display: "flex",
    gap: 2,
    padding: "4px 8px 0",
    borderBottom: `1px solid ${colors.border}`,
    boxSizing: "border-box",
  } as CSSProperties,

  tab: (active: boolean): CSSProperties => ({
    background: active ? "#fff" : "#dfe4e8",
    border: "1px solid #b9c1c8",
    borderBottom: active ? "1px solid #fff" : "none",
    padding: "4px 10px",
    fontSize: 11,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: active ? 600 : 400,
    marginBottom: active ? -1 : 0,
  }),

  axisBlock: {
    flex: "1 1 0%",
    minWidth: 0,
    border: `1px solid ${colors.border}`,
    borderRadius: 3,
    padding: "6px 0",
    boxSizing: "border-box",
  } as CSSProperties,

  axisBlockTitle: {
    fontSize: 11,
    fontWeight: 600,
    padding: "0 6px 4px",
  } as CSSProperties,
};