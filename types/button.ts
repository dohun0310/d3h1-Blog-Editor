export interface ButtonProps {
  className?: string;
  icon?: "add" | "delete" | "edit" | "menu" | "photo";
  label?: string;
  variant?: "filled" | "linear" | "icon";
  onClick: () => void;
}

export interface IconProps {
  icon: string;
}