"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    revealElements.forEach((el) => observer.observe(el));

    // Back to top visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.main}>
      {/* ===== Hero Section ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroHeadline}>
            <h1 className={styles.heroTitle}>
              Descubre Margarita{" "}
              <span className={styles.heroTitleAccent}>a Tu Ritmo</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Más de 25 años llevándote por los mejores destinos de la isla.
              Reserva tu vehículo ideal y vive la aventura.
            </p>
          </div>

          <div className={styles.bookingBarWrapper}>
            <div className={styles.bookingBar}>
              <form className={styles.searchFormHorizontal}>
                <div
                  className={styles.searchGroupHorizontal}
                  style={{ flex: 2 }}
                >
                  <label className={styles.searchLabel} htmlFor="pickup-location">
                    Lugar de Recogida
                  </label>
                  <select
                    id="pickup-location"
                    className={styles.searchInputHorizontal}
                  >
                    <option value="aeropuerto">
                      Aeropuerto Santiago Mariño Porlamar
                    </option>
                  </select>
                </div>

                <div
                  className={styles.searchGroupHorizontal}
                  style={{ flex: 1 }}
                >
                  <label className={styles.searchLabel} htmlFor="pickup-date">
                    Fecha de Recogida
                  </label>
                  <input
                    id="pickup-date"
                    type="date"
                    className={styles.searchInputHorizontal}
                  />
                </div>

                <div
                  className={styles.searchGroupHorizontal}
                  style={{ flex: 1 }}
                >
                  <label className={styles.searchLabel} htmlFor="pickup-time">
                    Hora de Recogida
                  </label>
                  <input
                    id="pickup-time"
                    type="time"
                    className={styles.searchInputHorizontal}
                    defaultValue="12:00"
                  />
                </div>
              </form>
            </div>

            <div className={styles.submitContainer}>
              <button type="button" className={styles.searchButtonCenter}>
                Seleccionar Mi Vehículo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats / Trust Section ===== */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={`${styles.statItem} reveal stagger-1`}>
            <span className={styles.statIcon}>🏆</span>
            <div className={styles.statNumber}>25+</div>
            <div className={styles.statLabel}>Años de Experiencia</div>
          </div>
          <div className={`${styles.statItem} reveal stagger-2`}>
            <span className={styles.statIcon}>😊</span>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Clientes Satisfechos</div>
          </div>
          <div className={`${styles.statItem} reveal stagger-3`}>
            <span className={styles.statIcon}>🚗</span>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Vehículos Disponibles</div>
          </div>
          <div className={`${styles.statItem} reveal stagger-4`}>
            <span className={styles.statIcon}>🛡️</span>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Asistencia en Vía</div>
          </div>
        </div>
      </section>

      {/* ===== Offers Section ===== */}
      <section className={styles.offersSection}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} reveal`}>
            Nuestras Mejores Ofertas
          </h2>
          <p className={`${styles.sectionSubtitle} reveal`}>
            Beneficios exclusivos para que tu experiencia sea perfecta desde el
            primer momento.
          </p>

          <div className={styles.offersGrid}>
            <div className={`${styles.offerCard} reveal stagger-1`}>
              <div className={styles.offerIcon}>🏷️</div>
              <h3 className={styles.offerTitle}>Descuento por Semana</h3>
              <p className={styles.offerDesc}>
                Ahorra hasta un 15% al reservar tu vehículo por 7 días o más.
                Ideal para vacaciones largas.
              </p>
            </div>
            <div className={`${styles.offerCard} reveal stagger-2`}>
              <div className={styles.offerIcon}>⚡</div>
              <h3 className={styles.offerTitle}>Entrega Express</h3>
              <p className={styles.offerDesc}>
                Te llevamos el auto directamente a tu hotel o al aeropuerto sin
                filas ni demoras.
              </p>
            </div>
            <div className={`${styles.offerCard} reveal stagger-3`}>
              <div className={styles.offerIcon}>🛡️</div>
              <h3 className={styles.offerTitle}>Reserva Sin Riesgo</h3>
              <p className={styles.offerDesc}>
                Cambios y cancelaciones flexibles hasta 48 horas antes de tu
                viaje. Viaja tranquilo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Fleet Showcase Section ===== */}
      <section className={styles.fleetSection}>
        <div className="container">
          <div className={`${styles.fleetHeader} reveal`}>
            <h2 className={styles.trustTitle}>Nuestra Flota Destacada</h2>
            <p style={{ color: "var(--color-gray)" }}>
              Encuentra el vehículo perfecto para tu aventura.
            </p>
          </div>

          <div className={styles.fleetGrid}>
            {/* Car 1 */}
            <div className={`${styles.carCard} reveal stagger-1`}>
              <div className={styles.carImageContainer}>
                <span className={styles.carBadge}>Premium</span>
                <img
                  src="/corolla 2024.png"
                  alt="Toyota Corolla 2024"
                  className={styles.carImage}
                />
              </div>
              <div className={styles.carDetails}>
                <h3 className={styles.carName}>Toyota Corolla 2024</h3>
                <div className={styles.carFeatures}>
                  <span>💺 5 Asientos</span>
                  <span>⚙️ Automático</span>
                  <span>❄️ A/C</span>
                  <span>✨ Premium</span>
                </div>
                <div className={styles.carFooter}>
                  <div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-gray)",
                      }}
                    >
                      Desde
                    </span>
                    <br />
                    <span className={styles.carPrice}>
                      $80
                      <span
                        style={{
                          fontSize: "1rem",
                          color: "var(--color-gray)",
                          fontWeight: "normal",
                        }}
                      >
                        /día
                      </span>
                    </span>
                  </div>
                  <Link href="/catalogo">
                    <button className={styles.bookButton}>Reservar</button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Car 2 */}
            <div className={`${styles.carCard} reveal stagger-2`}>
              <div className={styles.carImageContainer}>
                <span className={styles.carBadge}>Sedán</span>
                <img
                  src="/corolla2018.png"
                  alt="Toyota Corolla 2018"
                  className={styles.carImage}
                />
              </div>
              <div className={styles.carDetails}>
                <h3 className={styles.carName}>Toyota Corolla 2018</h3>
                <div className={styles.carFeatures}>
                  <span>💺 5 Asientos</span>
                  <span>⚙️ Automático</span>
                  <span>❄️ A/C</span>
                  <span>✨ Premium</span>
                </div>
                <div className={styles.carFooter}>
                  <div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-gray)",
                      }}
                    >
                      Desde
                    </span>
                    <br />
                    <span className={styles.carPrice}>
                      $60
                      <span
                        style={{
                          fontSize: "1rem",
                          color: "var(--color-gray)",
                          fontWeight: "normal",
                        }}
                      >
                        /día
                      </span>
                    </span>
                  </div>
                  <Link href="/catalogo">
                    <button className={styles.bookButton}>Reservar</button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Car 3 */}
            <div className={`${styles.carCard} reveal stagger-3`}>
              <div className={styles.carImageContainer}>
                <span className={styles.carBadge}>Compacto</span>
                <img
                  src="/yaris2023.png"
                  alt="Toyota Yaris 2023"
                  className={styles.carImage}
                />
              </div>
              <div className={styles.carDetails}>
                <h3 className={styles.carName}>Toyota Yaris 2023</h3>
                <div className={styles.carFeatures}>
                  <span>💺 5 Asientos</span>
                  <span>⚙️ Automático</span>
                  <span>❄️ A/C</span>
                  <span>✨ Premium</span>
                </div>
                <div className={styles.carFooter}>
                  <div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-gray)",
                      }}
                    >
                      Desde
                    </span>
                    <br />
                    <span className={styles.carPrice}>
                      $45
                      <span
                        style={{
                          fontSize: "1rem",
                          color: "var(--color-gray)",
                          fontWeight: "normal",
                        }}
                      >
                        /día
                      </span>
                    </span>
                  </div>
                  <Link href="/catalogo">
                    <button className={styles.bookButton}>Reservar</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link href="/catalogo">
              <button className={styles.searchButton}>
                Ver Todo el Catálogo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} reveal`}>
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className={`${styles.sectionSubtitle} reveal`}>
            Cientos de viajeros confían en Kafiory Tours para explorar
            Margarita.
          </p>

          <div className={styles.testimonialsGrid}>
            <div className={`${styles.testimonialCard} reveal stagger-1`}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &ldquo;Excelente servicio. El auto estaba impecable y la entrega
                en el aeropuerto fue super rápida. Sin duda repetiré en mi
                próxima visita a Margarita.&rdquo;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>MC</div>
                <div>
                  <div className={styles.testimonialName}>María Castillo</div>
                  <div className={styles.testimonialRole}>
                    Turista desde Caracas
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.testimonialCard} reveal stagger-2`}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &ldquo;Llevo 3 años alquilando con Kafiory y siempre es la
                misma calidad. Precios justos, autos en perfecto estado y
                atención personalizada.&rdquo;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>JR</div>
                <div>
                  <div className={styles.testimonialName}>Jorge Rodríguez</div>
                  <div className={styles.testimonialRole}>
                    Cliente frecuente
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.testimonialCard} reveal stagger-3`}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &ldquo;Necesitábamos un vehículo para toda la familia y nos
                dieron opciones increíbles. La asistencia 24/7 nos dio mucha
                tranquilidad.&rdquo;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>LP</div>
                <div>
                  <div className={styles.testimonialName}>Laura Pérez</div>
                  <div className={styles.testimonialRole}>
                    Viaje familiar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WhatsApp Floating Button ===== */}
      <a
        href="https://wa.me/584123577788"
        className={styles.whatsappFloat}
        target="_blank"
        rel="noopener noreferrer"
        title="Contactar por WhatsApp"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ===== Back to Top Button ===== */}
      <button
        className={`${styles.backToTop} ${showBackToTop ? styles.visible : ""}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
        title="Volver arriba"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </main>
  );
}
