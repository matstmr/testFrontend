import styles from "@/styles/Country.module.css";

export default function CountryCard({ name, emoji, code, link }: { name: string, emoji: string, code: string, link: string }) {
    return (
        <a href={link}>
            <div className={styles.country}>
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.emoji}>{emoji}</p>
            </div>
        </a>
    )
}