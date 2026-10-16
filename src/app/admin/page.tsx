import styles from "./page.module.css";

export default async function AdminDashboard() {
  // Datos simulados — cuando conectes Prisma, reemplaza con queries reales
  const kpis = [
    { label: "Reservas Hoy", value: "12", icon: "📋", change: "+3 vs ayer", positive: true },
    { label: "Ingresos del Mes", value: "$8,450", icon: "💰", change: "+18% vs mes anterior", positive: true },
    { label: "Vehículos Activos", value: "42", icon: "🚗", change: "8 disponibles", positive: true },
    { label: "Tasa de Ocupación", value: "81%", icon: "📊", change: "+5% vs mes anterior", positive: true },
  ];

  const recentReservations = [
    { id: 101, customer: "Carlos Pérez", car: "Toyota 4Runner", dates: "12 May - 16 May", total: "$638", status: "PENDING" },
    { id: 102, customer: "María Gómez", car: "BMW Serie 3", dates: "01 Jun - 05 Jun", total: "$750", status: "CONFIRMED" },
    { id: 103, customer: "Ana Rodríguez", car: "Toyota Yaris 2023", dates: "15 May - 18 May", total: "$135", status: "CONFIRMED" },
    { id: 104, customer: "Luis Fernández", car: "Jeep Wrangler", dates: "20 May - 25 May", total: "$600", status: "PENDING" },
    { id: 105, customer: "Rosa Martínez", car: "Mercedes C-Class", dates: "22 May - 28 May", total: "$1,260", status: "CANCELLED" },
  ];

  const fleetData = [
    { name: "Toyota 4Runner 2024", price: 110, status: "En alquiler", statusType: "rented" },
    { name: "BMW Serie 3", price: 150, status: "Disponible", statusType: "available" },
    { name: "Jeep Wrangler Rubicon", price: 120, status: "En alquiler", statusType: "rented" },
    { name: "Toyota Corolla 2024", price: 80, status: "Disponible", statusType: "available" },
    { name: "Mercedes Benz C-Class", price: 180, status: "Mantenimiento", statusType: "maintenance" },
    { name: "Toyota Yaris 2023", price: 45, status: "Disponible", statusType: "available" },
  ];

  return (
    <main className={styles.adminContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Panel de Administración</h1>
          <p className={styles.subtitle}>Bienvenido de vuelta. Aquí tienes un resumen de tu negocio.</p>
        </div>
        <button className={styles.actionBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Añadir Vehículo
        </button>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, i) => (
          <div key={i} className={styles.kpiCard}>
            <div className={styles.kpiIcon}>{kpi.icon}</div>
            <div className={styles.kpiContent}>
              <span className={styles.kpiLabel}>{kpi.label}</span>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <span className={`${styles.kpiChange} ${kpi.positive ? styles.kpiPositive : ""}`}>
                {kpi.positive ? "↑" : "↓"} {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={styles.dashboardGrid}>
        {/* Reservations Table */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Reservas Recientes</h2>
            <button className={styles.viewAllBtn}>Ver Todas →</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Vehículo</th>
                  <th>Fechas</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.map((res) => (
                  <tr key={res.id}>
                    <td>
                      <strong>{res.customer}</strong>
                      <span className={styles.subText}>ID: #{res.id}</span>
                    </td>
                    <td>{res.car}</td>
                    <td>{res.dates}</td>
                    <td><strong className={styles.totalValue}>{res.total}</strong></td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        res.status === "CONFIRMED" ? styles.statusConfirmed :
                        res.status === "CANCELLED" ? styles.statusCancelled :
                        styles.statusPending
                      }`}>
                        {res.status === "CONFIRMED" ? "Confirmado" :
                         res.status === "CANCELLED" ? "Cancelado" : "Pendiente"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        {res.status === "PENDING" && (
                          <button className={styles.confirmBtn}>Confirmar</button>
                        )}
                        {res.status !== "CANCELLED" && (
                          <button className={styles.cancelBtn}>Cancelar</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fleet Management */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Gestión de Flota</h2>
            <button className={styles.viewAllBtn}>Gestionar →</button>
          </div>

          <div className={styles.fleetList}>
            {fleetData.map((vehicle, i) => (
              <div key={i} className={styles.fleetItem}>
                <div className={styles.fleetInfo}>
                  <span className={styles.fleetName}>{vehicle.name}</span>
                  <span className={styles.fleetPrice}>${vehicle.price}/día</span>
                </div>
                <div className={styles.fleetRight}>
                  <span className={`${styles.fleetStatus} ${
                    vehicle.statusType === "available" ? styles.fleetAvailable :
                    vehicle.statusType === "maintenance" ? styles.fleetMaintenance :
                    styles.fleetRented
                  }`}>
                    {vehicle.status}
                  </span>
                  <button className={styles.editBtn}>Editar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
