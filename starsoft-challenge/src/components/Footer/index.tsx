import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import styles from "./styles.module.scss";

const Footer: React.FC = () => {

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Rodapé do site">
      <div className={styles.copyrightBar}>
        <p>
          Starsoft &copy; Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
