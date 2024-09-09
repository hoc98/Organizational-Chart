export interface CustomNodeData {
    label: string;
    onAdd: () => void;
    onChangeLabel: (newLabel: string) => void;
    onDelete: () => void;
  }