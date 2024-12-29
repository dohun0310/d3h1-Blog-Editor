import styles from "./button.module.css";
import { ButtonProps, IconProps } from "@/types/button";

export default function Button({
  className = "",
  icon,
  label,
  variant = "filled",
  onClick
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} onClick={onClick}>
      {icon && <Icon icon={icon} />}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  )
}

function Icon({ icon }: IconProps) {
  return (
    <>
      {icon === "add" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M8.25 9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75H9.75V14.25H8.25V9.75Z" />
        </svg>
      )}
      {icon === "delete" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M5.25 15.75C4.8375 15.75 4.48438 15.6031 4.19063 15.3094C3.89688 15.0156 3.75 14.6625 3.75 14.25V4.5H3V3H6.75V2.25H11.25V3H15V4.5H14.25V14.25C14.25 14.6625 14.1031 15.0156 13.8094 15.3094C13.5156 15.6031 13.1625 15.75 12.75 15.75H5.25ZM12.75 4.5H5.25V14.25H12.75V4.5ZM6.75 12.75H8.25V6H6.75V12.75ZM9.75 12.75H11.25V6H9.75V12.75Z" />
        </svg>
      )}
      {icon === "edit" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M3.75 14.25H4.81875L12.15 6.91875L11.0813 5.85L3.75 13.1813V14.25ZM2.25 15.75V12.5625L12.15 2.68125C12.3 2.54375 12.4656 2.4375 12.6469 2.3625C12.8281 2.2875 13.0188 2.25 13.2188 2.25C13.4188 2.25 13.6125 2.2875 13.8 2.3625C13.9875 2.4375 14.15 2.55 14.2875 2.7L15.3188 3.75C15.4688 3.8875 15.5781 4.05 15.6469 4.2375C15.7156 4.425 15.75 4.6125 15.75 4.8C15.75 5 15.7156 5.19063 15.6469 5.37188C15.5781 5.55313 15.4688 5.71875 15.3188 5.86875L5.4375 15.75H2.25ZM11.6063 6.39375L11.0813 5.85L12.15 6.91875L11.6063 6.39375Z" />
        </svg>
      )}
      {icon === "menu" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
          <path d="M1.5 9V8H10.5V9H1.5ZM1.5 6.5V5.5H10.5V6.5H1.5ZM1.5 4V3H10.5V4H1.5Z" />
        </svg>
      )}
    </>
  )
}