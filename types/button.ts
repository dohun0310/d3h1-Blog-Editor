export interface ButtonProps {
  icon?: "add" | "edit" | "delete";
  label: string;
  variant?: "filled" | "linear";
  onClick: () => void;
}

export interface IconProps {
  icon: string;
}