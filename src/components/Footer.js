import styles from '../styles/Footer.module.css';
import globalStyles from '../styles/global.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy; {currentYear} 加拿大港人黃頁. All rights reserved.</p>
      <p className={styles.description}>一個為在加港人而設嘅資源平台。</p>
    </footer>
  );
}