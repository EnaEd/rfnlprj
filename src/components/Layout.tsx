import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

// Компонент-обёртка (демонстрация props: принимает children).
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
