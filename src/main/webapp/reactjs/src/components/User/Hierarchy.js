import React from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./data.json";
import { useCenteredTree } from "./helpers";

const containerStyles = {
  width: "100vw",
  height: "100vh"
};

// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect width="20" height="20" x="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        Dept: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);

export default function Hierarchy() {
  const [dimensions, translate, containerRef] = useCenteredTree();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={orgChartJson}
        dimensions={dimensions}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
      />
    </div>
  );
}
