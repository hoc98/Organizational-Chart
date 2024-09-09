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
import CustomNode from "../../share/CustomNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: {
      label: "مدیر عامل",
      onAdd: () => {},
      onChangeLabel: () => {},
      onDelete: () => {},
    },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 0, y: 100 },
    data: {
      label: "مدیر منابع انسانی",
      onAdd: () => {},
      onChangeLabel: () => {},
      onDelete: () => {},
    },
  },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = { customNode: CustomNode };

function NodePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(3);
  const [nodeName, setNodeName] = useState("");

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (sourceId?: string) => {
    const newLabel = nodeName.trim() || `نام را وارد کنید`;
    if (!newLabel) return;

    const newNode: Node = {
      id: nodeId.toString(),
      type: "customNode",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: newLabel,
        onAdd: () => addNode(nodeId.toString()),
        onChangeLabel: (newLabel: string) =>
          updateNodeLabel(nodeId.toString(), newLabel),
        onDelete: () => deleteNode(nodeId.toString()),
      },
    };

    const newEdge: Edge | undefined = sourceId
      ? {
          id: `e${sourceId}-${nodeId}`,
          source: sourceId,
          target: nodeId.toString(),
        }
      : undefined;

    setNodes((nds) => [...nds, newNode]);
    if (newEdge) setEdges((eds) => [...eds, newEdge]);
    setNodeId((id) => id + 1);
    setNodeName("");
  };

  const updateNodeLabel = (nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault();
      console.log("Enter key pressed");
      addNode();
    }
  };

  const updatedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onAdd: () => addNode(node.id),
      onChangeLabel: (newLabel: string) => updateNodeLabel(node.id, newLabel),
      onDelete: () => deleteNode(node.id),
    },
  }));

  return (
    <>
      <div
        style={{ width: "100vw", height: "80vh" }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="flex gap-1">
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="دپارتمان جدید رو وارد کنید"
            className="rounded-lg p-2 shadow-lg text-right"
            dir="ltr"
            autoFocus
          />
          <button
            onClick={() => addNode()}
            className="text-white bg-green-600 rounded-lg shadow-lg h-11 w-28"
          >
            افزودن
          </button>
        </div>
        <ReactFlow
          nodes={updatedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}

export default NodePage;
