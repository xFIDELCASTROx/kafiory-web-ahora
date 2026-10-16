"use client";

import { useState, useMemo } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { cars, getCarById } from "@/data/cars";
import { use } from "react";

const extras = [
  { id: "seguro", name: "🛡️ Seguro Full Cover", desc: "Protección total sin deducible. Viaja con 100% de tranquilidad.", price: 25 },
  { id: "silla", name: "👶 Silla de Bebé", desc: "Asiento de seguridad homologado para niños de 0 a 4 años.", price: 10 },
  { id: "cava", name: "🧊 Cava con Hielo", desc: "Perfecto para llevar tus bebidas frías a la playa.", price: 5 },
  { id: "conductor", name: "👤 Conductor Adicional", desc: "Añade un segundo conductor autorizado para turnarse al volante.", price: 15 },
];

export default function ReservaCheckout({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const car = getCarById(Number(id));

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("zelle");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((e) => e !== extraId) : [...prev, extraId]
    );
  };

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const diff = new Date(returnDate).getTime() - new Date(pickupDate).getTime();
    const d = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return d > 0 ? d : 1;
  }, [pickupDate, returnDate]);

  const extrasTotal = useMemo(() => {
    return extras
      .filter((e) => selectedExtras.includes(e.id))
      .reduce((sum, e) => sum + e.price, 0);
  }, [selectedExtras]);

  const baseTotal = (car?.price || 0) * days;
  const extrasTotalAmount = extrasTotal * days;
  const tax = Math.round((baseTotal + extrasTotalAmount) * 0.16);
  const grandTotal = baseTotal + extrasTotalAmount + tax;

  if (!car) {
    return (
      <main className={styles.reservaContainer}>
        <div className={styles.notFound}>
          <h1>Vehículo no encontrado</h1>
          <Link href="/catalogo">
            <button className={styles.backBtn}>Volver al Catálogo</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.reservaContainer}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <Link href="/catalogo" className={styles.breadcrumbLink}>Catálogo</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <Link href={`/vehiculo/${car.id}`} className={styles.breadcrumbLink}>{car.name}</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>Reserva</span>
      </nav>

      <div className={styles.checkoutLayout}>
        {/* Left Column - Forms */}
        <div className={styles.formSection}>
          {/* Step 1: Dates */}
          <div className={styles.stepCard}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNumber}>1</span>
              Fechas de Reserva
            </h2>
            <div className={styles.twoColumns}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="pickup-date">Fecha de Retiro</label>
                <input
                  id="pickup-date"
                  type="date"
                  className={styles.inputField}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="return-date">Fecha de Entrega</label>
                <input
                  id="return-date"
                  type="date"
                  className={styles.inputField}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="pickup-location">Lugar de Entrega / Retiro</label>
              <select id="pickup-location" className={styles.inputField}>
                <option>Aeropuerto Internacional (Incluye Rastreo de Vuelo)</option>
                <option>Oficina Central Kafiory Tours</option>
                <option>Entrega a Domicilio / Hotel</option>
              </select>
            </div>
            {days > 1 && (
              <div className={styles.daysInfo}>
                📅 Tu reserva es por <strong>{days} días</strong>
              </div>
            )}
          </div>

          {/* Step 2: Extras */}
          <div className={styles.stepCard}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNumber}>2</span>
              Extras Recomendados
            </h2>

            {extras.map((extra) => (
              <div
                key={extra.id}
                className={`${styles.extraItem} ${selectedExtras.includes(extra.id) ? styles.extraSelected : ""}`}
                onClick={() => toggleExtra(extra.id)}
              >
                <div className={styles.extraInfo}>
                  <h4>{extra.name}</h4>
                  <p>{extra.desc}</p>
                </div>
                <div className={styles.extraRight}>
                  <span className={styles.extraPrice}>+${extra.price}/día</span>
                  <div className={`${styles.extraCheckbox} ${selectedExtras.includes(extra.id) ? styles.extraCheckboxActive : ""}`}>
                    {selectedExtras.includes(extra.id) && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step 3: Payment */}
          <div className={styles.stepCard}>
            <h2 className={styles.stepTitle}>
              <span className={styles.stepNumber}>3</span>
              Método de Pago
            </h2>
            <div className={styles.paymentGrid}>
              {[
                { id: "zelle", name: "Zelle", icon: "💳" },
                { id: "binance", name: "Binance Pay", icon: "₿" },
                { id: "paypal", name: "PayPal", icon: "🅿️" },
              ].map((method) => (
                <div
                  key={method.id}
                  className={`${styles.paymentOption} ${paymentMethod === method.id ? styles.paymentSelected : ""}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <span className={styles.paymentIcon}>{method.icon}</span>
                  <span className={styles.paymentName}>{method.name}</span>
                  {paymentMethod === method.id && (
                    <div className={styles.paymentCheck}>✓</div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.formFields}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="full-name">Nombre Completo</label>
                <input
                  id="full-name"
                  type="text"
                  className={styles.inputField}
                  placeholder="Como aparece en su ID"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  className={styles.inputField}
                  placeholder="Para enviar la confirmación"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryLabel}>Resumen de Reserva</h3>
            <h2 className={styles.summaryCarName}>{car.name}</h2>
            <img
              src={car.img}
              alt={car.name}
              className={styles.summaryImage}
            />

            <div className={styles.summaryRow}>
              <span>Precio Base ({days} {days === 1 ? "día" : "días"})</span>
              <span>${baseTotal.toFixed(2)}</span>
            </div>

            {selectedExtras.length > 0 && (
              <>
                {extras
                  .filter((e) => selectedExtras.includes(e.id))
                  .map((e) => (
                    <div key={e.id} className={styles.summaryRow}>
                      <span>{e.name.replace(/^[^\s]+\s/, "")}</span>
                      <span>${(e.price * days).toFixed(2)}</span>
                    </div>
                  ))}
              </>
            )}

            <div className={styles.summaryRow}>
              <span>Impuestos (16%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total a Pagar</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button className={styles.checkoutBtn}>
              Confirmar y Pagar
            </button>
            <p className={styles.securityNote}>
              🔒 Transacción 100% segura. Su información está protegida.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
