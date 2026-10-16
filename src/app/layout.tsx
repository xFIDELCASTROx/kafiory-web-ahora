"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-alt",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <head>
        <title>Kafiory Tours | Alquiler de Vehículos Premium</title>
        <meta
          name="description"
          content="Más de 25 años de experiencia. Reserva tu vehículo ideal en nuestra isla paradisíaca con Kafiory Tours."
        />
      </head>
      <body>
        <header>
          {/* Top Bar */}
          <div className={styles.headerTop}>
            <div className={styles.topLinks}>
              <Link href="#" className={styles.topLink}>
                Iniciar Sesión
              </Link>
              <Link href="#" className={styles.topLink}>
                Registrarse
              </Link>
              <Link href="#" className={styles.topLink}>
                Alquiler Corporativo
              </Link>
              <Link href="#" className={styles.topLink}>
                Atención al Cliente
              </Link>
            </div>
          </div>

          {/* Main Nav */}
          <div
            className={`${styles.headerMain} ${scrolled ? styles.headerScrolled : ""}`}
          >
            <div className={styles.navContainer}>
              <Link href="/" className={styles.logoContainer}>
                <img
                  src="/logo.png"
                  alt="Kafiory Tours Logo"
                  className={styles.logoImage}
                />
              </Link>

              {/* Desktop Nav */}
              <nav className={styles.navLinks}>
                <Link href="#" className={styles.navLink}>
                  Reservas
                </Link>
                <Link href="#" className={styles.navLink}>
                  Ofertas
                </Link>
                <Link href="#" className={styles.navLink}>
                  Vehículos y Servicios
                </Link>
                <Link href="#" className={styles.navLink}>
                  Ubicaciones
                </Link>
              </nav>

              {/* Hamburger Button */}
              <button
                className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
              >
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
              </button>
            </div>
          </div>

          {/* Mobile Overlay */}
          <div
            className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayVisible : ""}`}
            onClick={() => setMenuOpen(false)}
          />

          {/* Mobile Drawer */}
          <nav
            className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ""}`}
          >
            <div className={styles.mobileDrawerHeader}>
              <img
                src="/logo.png"
                alt="Kafiory Tours"
                className={styles.mobileDrawerLogo}
              />
              <button
                className={styles.mobileDrawerClose}
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className={styles.mobileDrawerLinks}>
              <Link
                href="#"
                className={styles.mobileDrawerLink}
                onClick={() => setMenuOpen(false)}
              >
                Reservas
              </Link>
              <Link
                href="#"
                className={styles.mobileDrawerLink}
                onClick={() => setMenuOpen(false)}
              >
                Ofertas
              </Link>
              <Link
                href="#"
                className={styles.mobileDrawerLink}
                onClick={() => setMenuOpen(false)}
              >
                Vehículos y Servicios
              </Link>
              <Link
                href="#"
                className={styles.mobileDrawerLink}
                onClick={() => setMenuOpen(false)}
              >
                Ubicaciones
              </Link>
            </div>
            <div className={styles.mobileDrawerBottom}>
              <Link
                href="#"
                className={styles.mobileDrawerBottomLink}
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                href="#"
                className={styles.mobileDrawerBottomLink}
                onClick={() => setMenuOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          </nav>
        </header>

        {children}

        {/* ===== Footer ===== */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerGrid}>
              {/* Column 1 */}
              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Búsquedas Populares</h4>
                <Link href="#" className={styles.footerLink}>
                  Alquiler a Largo Plazo
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Solo Ida
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Mejoras Gratis
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Preguntas Frecuentes
                </Link>
              </div>
              {/* Column 2 */}
              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Nuestra Flota</h4>
                <Link href="#" className={styles.footerLink}>
                  Vehículos Económicos
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Camionetas y SUVs
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Autos de Lujo
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Flota Completa
                </Link>
              </div>
              {/* Column 3 */}
              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Destinos en Margarita</h4>
                <Link href="#" className={styles.footerLink}>
                  Aeropuerto Intl.
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Porlamar Centro
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Pampatar
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Playa El Agua
                </Link>
              </div>
              {/* Column 4 */}
              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Socios Comerciales</h4>
                <Link href="#" className={styles.footerLink}>
                  Afiliados
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Agentes de Viaje
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Convenios Hoteleros
                </Link>
              </div>
              {/* Column 5 */}
              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Soporte Kafiory</h4>
                <Link href="#" className={styles.footerLink}>
                  Contáctanos
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Asistencia en Vía
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Opciones de Combustible
                </Link>
              </div>
              {/* Column 6 */}
              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Acerca de la Empresa</h4>
                <Link href="#" className={styles.footerLink}>
                  Nuestra Historia
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Términos de Uso
                </Link>
                <Link href="#" className={styles.footerLink}>
                  Política de Privacidad
                </Link>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <div className={styles.footerSelectors}>
                <select className={styles.footerSelect}>
                  <option>Venezuela</option>
                  <option>Estados Unidos</option>
                  <option>España</option>
                </select>
                <select className={styles.footerSelect}>
                  <option>Español</option>
                  <option>English</option>
                </select>
              </div>
              <div className={styles.footerSocial}>
                {/* Facebook */}
                <a
                  href="#"
                  className={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                {/* X / Twitter */}
                <a
                  href="#"
                  className={styles.socialIcon}
                  aria-label="X (Twitter)"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
