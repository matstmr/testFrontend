import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Checkpoint : frontend</h1>
      <Link href="/" className={styles.lien}>Countries</Link>
    </header>
  );
}
