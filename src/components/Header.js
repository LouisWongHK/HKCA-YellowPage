import Link from 'next/link';
import styles from '../styles/Header.module.css';
import globalStyles from '../styles/global.module.css';

export default function Header() {
  return (
    <header className={`${globalStyles.canadianRed} ${styles.header}`}>
      <div className={`${globalStyles.container} ${styles.container}`}>
        <h1 className={styles.title}>🇨🇦加拿大港人黃頁🇨🇦</h1>
        <p className={styles.subtitle}>一個網站睇曬加拿大港人組織/餐飲/旅遊/理財所有平台</p>
      </div>
      <nav className={globalStyles.nav}>
        | <Link href="/"><span className="lang" data-lang="en">Home</span><span className="lang hidden" data-lang="zh">主頁</span></Link>
        | <Link href="/contact"><span className="lang" data-lang="en">Contact</span><span className="lang hidden" data-lang="zh">聯絡我們</span></Link>
        | <Link href="/github"><span className="lang" data-lang="en">Github</span><span className="lang hidden" data-lang="zh">原始碼</span></Link>
      </nav>
    </header>
  );
}