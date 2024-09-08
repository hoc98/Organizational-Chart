import React, { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface CustomNodeData {
  label: string;
  onAdd: () => void;
  onChangeLabel: (newLabel: string) => void;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    data.onChangeLabel(label || "نامی وارد نشده است");
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setLabel(data.label);
  };

  return (
    <div className="flex flex-col gap-1 bg-white shadow-lg rounded p-2 text-center w-36 ">
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          onBlur={handleBlur}
          placeholder="نام دپارتمان را وارد کنید"
          className="rounded-lg shadow-lg text-[0.5rem] p-2"
          style={{ direction: "rtl", textAlign: "right" }}
          autoFocus
        />
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          className="text-[0.6rem] whitespace-nowrap "
        >
          {label.trim() === "" ? "نامی وارد نشده است" : label}
        </div>
      )}
      {!isEditing && (
        <button
          onClick={data.onAdd}
          className="bg-green-600 text-white rounded "
        >
          <div className="text-xs">+</div>
        </button>
      )}
      <Handle
        type="target"
        position={Position.Top}
        style={{ borderRadius: 6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ borderRadius: 6 }}
      />
    </div>
  );
};

export default CustomNode;
