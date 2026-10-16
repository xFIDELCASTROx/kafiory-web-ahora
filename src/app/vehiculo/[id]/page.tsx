import styles from "./page.module.css";
import Link from "next/link";
import { cars, getCarById } from "@/data/cars";

export function generateStaticParams() {
  return cars.map((car) => ({ id: String(car.id) }));
}

export default async function VehiculoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCarById(Number(id));

  if (!car) {
    return (
      <main className={styles.detailContainer}>
        <div className={styles.notFound}>
          <div className={styles.notFoundIcon}>🚗</div>
          <h1>Vehículo no encontrado</h1>
          <p>El vehículo que buscas no existe o fue removido.</p>
          <Link href="/catalogo">
            <button className={styles.backBtn}>Volver al Catálogo</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.detailContainer}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <Link href="/catalogo" className={styles.breadcrumbLink}>Catálogo</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{car.name}</span>
      </nav>

      <div className={styles.heroSection}>
        {/* Image */}
        <div className={styles.imageGallery}>
          <span className={styles.typeBadge}>{car.type}</span>
          <img
            src={car.img}
            alt={car.name}
            className={styles.mainImage}
          />
        </div>

        {/* Info Panel */}
        <div className={styles.carInfo}>
          <h1 className={styles.carName}>{car.name}</h1>
          <div className={styles.carPrice}>
            ${car.price}
            <span className={styles.priceUnit}> / día</span>
          </div>

          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <div className={styles.specIcon}>💺</div>
              <div>
                <strong>Capacidad</strong><br />{car.seats} Pasajeros
              </div>
            </div>
            <div className={styles.specItem}>
              <div className={styles.specIcon}>⚙️</div>
              <div>
                <strong>Transmisión</strong><br />{car.trans}
              </div>
            </div>
            <div className={styles.specItem}>
              <div className={styles.specIcon}>🚗</div>
              <div>
                <strong>Tipo</strong><br />{car.type}
              </div>
            </div>
            <div className={styles.specItem}>
              <div className={styles.specIcon}>⛽</div>
              <div>
                <strong>Combustible</strong><br />Gasolina
              </div>
            </div>
          </div>

          <p className={styles.description}>{car.description}</p>

          <Link href={`/reserva/${car.id}`} className={styles.bookBtnLink}>
            <button className={styles.bookBtn}>
              Continuar a la Reserva
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Lo Que Incluye</h2>
        <div className={styles.featuresGrid}>
          {car.features.map((feature, i) => (
            <div key={i} className={styles.featureItem}>
              <div className={styles.featureCheck}>✓</div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Policies Section */}
      <section className={styles.policiesSection}>
        <h2 className={styles.sectionTitle}>Políticas de Alquiler</h2>
        <div className={styles.policiesGrid}>
          <div className={styles.policyCard}>
            <div className={styles.policyIcon}>⛽</div>
            <h4>Combustible</h4>
            <p>El vehículo se entrega con tanque lleno y debe devolverse con tanque lleno. Cargo adicional si no se cumple.</p>
          </div>
          <div className={styles.policyCard}>
            <div className={styles.policyIcon}>🎂</div>
            <h4>Edad Mínima</h4>
            <p>El conductor principal debe tener al menos 21 años y una licencia vigente con mínimo 2 años de antigüedad.</p>
          </div>
          <div className={styles.policyCard}>
            <div className={styles.policyIcon}>📋</div>
            <h4>Documentos</h4>
            <p>Se requiere licencia de conducir vigente, pasaporte o cédula, y tarjeta de crédito a nombre del titular.</p>
          </div>
          <div className={styles.policyCard}>
            <div className={styles.policyIcon}>🚫</div>
            <h4>Multas</h4>
            <p>El arrendatario es responsable de todas las multas de tránsito incurridas durante el periodo de alquiler.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
