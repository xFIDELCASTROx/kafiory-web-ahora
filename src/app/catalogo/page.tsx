"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { cars, getCarTypes, getTransTypes } from "@/data/cars";

export default function Catalogo() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTrans, setSelectedTrans] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("price-asc");
  const [showFilters, setShowFilters] = useState(false);

  const carTypes = getCarTypes();
  const transTypes = getTransTypes();

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleTrans = (trans: string) => {
    setSelectedTrans((prev) =>
      prev.includes(trans) ? prev.filter((t) => t !== trans) : [...prev, trans]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedTrans([]);
    setMaxPrice(300);
  };

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(car.type);
      const matchesTrans = selectedTrans.length === 0 || selectedTrans.includes(car.trans);
      const matchesPrice = car.price <= maxPrice;
      return matchesType && matchesTrans && matchesPrice;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedTypes, selectedTrans, maxPrice, sortBy]);

  const activeFiltersCount = selectedTypes.length + selectedTrans.length + (maxPrice < 300 ? 1 : 0);

  return (
    <main className={styles.catalogContainer}>
      {/* Mobile Filter Toggle */}
      <button
        className={styles.filterToggle}
        onClick={() => setShowFilters(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        Filtros
        {activeFiltersCount > 0 && (
          <span className={styles.filterBadge}>{activeFiltersCount}</span>
        )}
      </button>

      {/* Mobile Overlay */}
      <div
        className={`${styles.filterOverlay} ${showFilters ? styles.filterOverlayVisible : ""}`}
        onClick={() => setShowFilters(false)}
      />

      {/* Sidebar de Filtros */}
      <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Filtros</h2>
          <button
            className={styles.sidebarClose}
            onClick={() => setShowFilters(false)}
          >
            ✕
          </button>
        </div>

        {activeFiltersCount > 0 && (
          <button className={styles.clearFilters} onClick={clearFilters}>
            Limpiar filtros ({activeFiltersCount})
          </button>
        )}

        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Tipo de Vehículo</h3>
          {carTypes.map((type) => (
            <label key={type} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />
              <span className={styles.checkboxCustom}>
                {selectedTypes.includes(type) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              {type}
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Transmisión</h3>
          {transTypes.map((trans) => (
            <label key={trans} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedTrans.includes(trans)}
                onChange={() => toggleTrans(trans)}
              />
              <span className={styles.checkboxCustom}>
                {selectedTrans.includes(trans) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              {trans}
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Precio Máximo / Día</h3>
          <input
            type="range"
            min="30"
            max="300"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={styles.priceRange}
          />
          <div className={styles.priceLabels}>
            <span>$30</span>
            <span className={styles.priceValue}>${maxPrice}{maxPrice >= 300 ? "+" : ""}</span>
            <span>$300+</span>
          </div>
        </div>

        <button
          className={styles.applyFiltersMobile}
          onClick={() => setShowFilters(false)}
        >
          Ver {filteredCars.length} vehículos
        </button>
      </aside>

      {/* Contenido Principal */}
      <section className={styles.mainContent}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Flota Disponible</h1>
            <span className={styles.resultCount}>
              Mostrando {filteredCars.length} de {cars.length} vehículos
            </span>
          </div>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          >
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        {filteredCars.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No hay vehículos con esos filtros</h3>
            <p>Intenta ajustar tus filtros para ver más opciones.</p>
            <button className={styles.clearFiltersBtn} onClick={clearFilters}>
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className={styles.carGrid}>
            {filteredCars.map((car, index) => (
              <div
                key={car.id}
                className={styles.carCard}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={styles.carImageContainer}>
                  <span className={styles.carBadge}>{car.type}</span>
                  <img src={car.img} alt={car.name} className={styles.carImage} />
                </div>
                <div className={styles.carDetails}>
                  <h3 className={styles.carName}>{car.name}</h3>
                  <div className={styles.carFeatures}>
                    <span className={styles.featureTag}>💺 {car.seats} Asientos</span>
                    <span className={styles.featureTag}>⚙️ {car.trans}</span>
                    <span className={styles.featureTag}>🚗 {car.type}</span>
                  </div>
                  <div className={styles.carFooter}>
                    <div>
                      <span className={styles.priceLabel}>Precio por día</span>
                      <span className={styles.carPrice}>${car.price}</span>
                    </div>
                    <Link href={`/vehiculo/${car.id}`}>
                      <button className={styles.bookButton}>Ver Detalles</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
