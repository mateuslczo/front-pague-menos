
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Site corporativo
        </h1>
        
        <div className={styles.grid}>

          <Link href="/login-form" className={styles.card}>
            <h3>Login &rarr;</h3>
            <p>Acesse sua conta</p>
          </Link>

        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 SoftTek. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}