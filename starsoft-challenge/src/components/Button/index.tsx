import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import styles from "./styles.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", fullWidth = true, type = "button", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} ${className}`.trim()}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
