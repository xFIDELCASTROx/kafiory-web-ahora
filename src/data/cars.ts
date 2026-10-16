export interface Car {
  id: number;
  name: string;
  type: string;
  trans: string;
  seats: number;
  price: number;
  img: string;
  description: string;
  features: string[];
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Yaris 2023",
    type: "Compacto",
    trans: "Automático",
    seats: 4,
    price: 45,
    img: "/yaris2023.png",
    description:
      "El Toyota Yaris 2023 es perfecto para moverse por la ciudad y explorar la isla con agilidad. Excelente rendimiento de combustible y fácil de estacionar en cualquier lugar.",
    features: ["A/C", "Bluetooth", "USB", "Cámara trasera", "Airbags", "Km Ilimitados"],
  },
  {
    id: 2,
    name: "Toyota Corolla 2024",
    type: "Sedán",
    trans: "Automático",
    seats: 5,
    price: 80,
    img: "/corolla 2024.png",
    description:
      "El Corolla 2024 combina elegancia y rendimiento. Ideal para familias o viajes de negocios con máximo confort y las últimas tecnologías de seguridad Toyota.",
    features: ["A/C Dual", "Android Auto", "Apple CarPlay", "Sensores", "Airbags", "Km Ilimitados"],
  },
  {
    id: 3,
    name: "Toyota Corolla 2018",
    type: "Sedán",
    trans: "Automático",
    seats: 5,
    price: 60,
    img: "/corolla2018.png",
    description:
      "Un sedán confiable y probado. El Corolla 2018 ofrece una conducción suave, excelente rendimiento de combustible y el espacio necesario para viajar cómodo por toda Margarita.",
    features: ["A/C", "Bluetooth", "USB", "Airbags", "Km Ilimitados", "Seguro básico"],
  },
  {
    id: 4,
    name: "Toyota 4Runner",
    type: "SUV",
    trans: "Automático",
    seats: 7,
    price: 110,
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
    description:
      "La Toyota 4Runner es la SUV perfecta para explorar la isla con toda la familia. Su tracción 4x4 te permitirá acceder a las playas más escondidas sin preocuparte por el terreno.",
    features: ["4x4", "A/C Dual Zona", "7 Puestos", "GPS", "Bluetooth", "Km Ilimitados"],
  },
  {
    id: 5,
    name: "Jeep Wrangler Rubicon",
    type: "4x4",
    trans: "Manual",
    seats: 4,
    price: 120,
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800",
    description:
      "Para los aventureros de verdad. El Wrangler Rubicon te lleva donde ningún otro vehículo puede. Techo removible para disfrutar del sol caribeño al máximo.",
    features: ["4x4 Off-Road", "Techo Removible", "A/C", "Bluetooth", "Km Ilimitados", "Gancho de remolque"],
  },
  {
    id: 6,
    name: "BMW Serie 3",
    type: "Premium",
    trans: "Automático",
    seats: 5,
    price: 150,
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    description:
      "Lujo y deportividad alemana en la isla. El BMW Serie 3 ofrece una experiencia de conducción premium con interiores de cuero, tecnología de punta y performance excepcional.",
    features: ["Cuero", "Sunroof", "Nav GPS", "Harman Kardon", "A/C Dual", "Km Ilimitados"],
  },
  {
    id: 7,
    name: "Kia Picanto 2022",
    type: "Compacto",
    trans: "Manual",
    seats: 4,
    price: 35,
    img: "https://images.unsplash.com/photo-1616422285623-14ff01621500?auto=format&fit=crop&q=80&w=800",
    description:
      "El más económico de nuestra flota. Perfecto para quienes buscan movilidad práctica sin gastar de más. Ideal para parejas o viajeros solo.",
    features: ["A/C", "Radio FM", "USB", "Airbags", "Bajo consumo", "Fácil estacionamiento"],
  },
  {
    id: 8,
    name: "Chevrolet Tahoe",
    type: "SUV",
    trans: "Automático",
    seats: 8,
    price: 140,
    img: "https://images.unsplash.com/photo-1563720310243-d28fbbccac47?auto=format&fit=crop&q=80&w=800",
    description:
      "La SUV más grande de nuestra flota. Espacio para toda la familia y su equipaje. Ideal para grupos grandes o quienes necesitan máximo espacio y potencia.",
    features: ["8 Puestos", "A/C Triple Zona", "GPS", "Bluetooth", "Apple CarPlay", "Km Ilimitados"],
  },
  {
    id: 9,
    name: "Mercedes Benz C-Class",
    type: "Premium",
    trans: "Automático",
    seats: 5,
    price: 180,
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    description:
      "La máxima expresión de lujo en nuestra flota. El Mercedes C-Class te ofrece una experiencia de conducción incomparable con la elegancia y refinamiento que solo Mercedes puede dar.",
    features: ["Cuero Nappa", "MBUX System", "Burmester Audio", "Sunroof", "A/C Dual", "Km Ilimitados"],
  },
];

export function getCarById(id: number): Car | undefined {
  return cars.find((car) => car.id === id);
}

export function getCarTypes(): string[] {
  return [...new Set(cars.map((car) => car.type))];
}

export function getTransTypes(): string[] {
  return [...new Set(cars.map((car) => car.trans))];
}
