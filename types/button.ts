export interface ButtonProps {
  className?: string;
  icon?: "add" | "delete" | "edit" | "menu";
  label?: string;
  variant?: "filled" | "linear";
  onClick: () => void;
}

export interface IconProps {
  icon: string;
}