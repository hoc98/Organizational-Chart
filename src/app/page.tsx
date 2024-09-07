"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "مدیر عامل" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "مدیر منابع انسانی" } },
];
const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(3);
  const [nodeName, setNodeName] = useState(""); // State for node name

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    if (!nodeName.trim()) return; 
    const newNode: Node = {
      id: nodeId.toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: nodeName }, 
    };
    const newEdge: Edge = {
      id: `e${nodeId - 1}-${nodeId}`,
      source: (nodeId - 1).toString(),
      target: nodeId.toString(),
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setNodeId((id) => id + 1);
    setNodeName(""); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNode();
    }
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="flex gap-1">
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="دپارتمان جدید رو وارد کنید"
          className="rounded-lg p-2 shadow-lg"
          style={{ direction: "rtl", textAlign: "right" }} 
        />
        <button
          onClick={addNode}
          className="text-white bg-green-600 rounded-lg  shadow-lg h-11 w-28"
        >
          افزودن 
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
