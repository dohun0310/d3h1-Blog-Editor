export interface ButtonProps {
  className?: string;
  icon?: "add" | "edit" | "delete";
  label?: string;
  variant?: "filled" | "linear";
  onClick: () => void;
}

export interface IconProps {
  icon: string;
}