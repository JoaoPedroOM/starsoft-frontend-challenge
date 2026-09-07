import Image from "next/image";
import logo from "../../assets/images/logo.png";
import bag from "../../assets/icons/Bag.svg";
import styles from "./styles.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <Image src={logo} alt="Logo" width={101} height={38} priority />
            <div className={styles.cartContainer}>
                <button type="button" className={styles.cartButton}>
                    <Image src={bag} alt="Bag" width={24} height={24} />
                    <p>0</p>
                </button>
            </div>
        </header>
    );
};

export default Header;

