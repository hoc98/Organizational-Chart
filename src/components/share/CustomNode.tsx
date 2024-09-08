import React, { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface CustomNodeData {
  label: string;
  onAdd: () => void;
  onChangeLabel: (newLabel: string) => void;
  onDelete: () => void;
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
    <div className=" relative flex flex-col gap-1 bg-white shadow-lg rounded p-2 text-center w-36 ">
      <button
        onClick={data.onDelete}
        className="bg-red-600 text-white rounded-full p-1 w-3 h-3  absolute -top-[6px] left-0"
      >
        <div className="absolute -top-[6px] left-0 w-3 h-3 ">-</div>
      </button>
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
        <div className="flex justify-center gap-1">
          <button
            onClick={data.onAdd}
            className="bg-green-600 text-white rounded p-1 w-full"
          >
            <div className="text-xs">+</div>
          </button>
        </div>
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
