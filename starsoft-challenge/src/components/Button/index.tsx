import React, { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  fullWidth = true,
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
