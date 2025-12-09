import './globals.css';

export const metadata = {
  title: 'Meu Site - Página Inicial',
  description: 'Bem-vindo ao meu site construído com Next.js',
};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}