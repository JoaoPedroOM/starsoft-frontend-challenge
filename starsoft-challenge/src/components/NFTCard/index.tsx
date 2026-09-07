import Image, { StaticImageData } from "next/image";
import ethIcon from "../../assets/images/ETH.png";
import styles from "./styles.module.scss";

export interface NFTCardProps {
    imageSrc?: string | StaticImageData;
    name?: string;
    description?: string;
    price?: number | string;
    onBuy?: () => void;
}

const NFTCard = ({
    imageSrc,
    name = "Lorem Ipsum",
    description = "Redesigned from scratch and completely revised.",
    price = 32,
    onBuy,
}: NFTCardProps) => {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={name}
                        width={200}
                        height={200}
                        className={styles.nftImage}
                    />
                ) : (
                    <div className={styles.nftImage} />
                )}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.priceWrapper}>
                <Image
                    src={ethIcon}
                    alt="Ethereum Icon"
                    width={29}
                    height={29}
                    className={styles.ethIcon}
                />
                <span className={styles.price}>{price} ETH</span>
            </div>

            <button type="button" className={styles.buyButton} onClick={onBuy}>
                COMPRAR
            </button>
        </article>
    );
};

export default NFTCard;