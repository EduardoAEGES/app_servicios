/* =========================================================
   DATOS DE LA APP
   Edita aquí categorías, especialistas, reseñas, chats y
   servicios del perfil. No hace falta tocar nada más.
   ========================================================= */

const categories = [
  { id: "plomeria", label: "Plomería", icon: "💧", color: "#2D7A56" },
  { id: "electricidad", label: "Electricidad", icon: "⚡", color: "#245C40" },
  { id: "limpieza", label: "Limpieza", icon: "🧹", color: "#40916C" },
  { id: "carpinteria", label: "Carpintería", icon: "🪵", color: "#1B4332" },
  { id: "pintura", label: "Pintura", icon: "🖌️", color: "#52B788" },
  { id: "jardineria", label: "Jardinería", icon: "🌿", color: "#2D7A56" },
  { id: "climatizacion", label: "Clima", icon: "❄️", color: "#245C40" },
  { id: "cerrajeria", label: "Cerrajería", icon: "🔑", color: "#0D2B1F" },
];

/* rate: tarifa por hora en soles. 0 = "Consultar" */
const specialists = [
  {
    id: 1,
    name: "Roberto Medina",
    trade: "Plomería",
    rating: 4.9,
    reviews: 128,
    rate: 90,
    location: "Ciudad de Arequipa",
    experience: 14,
    photo: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&auto=format",
    bio: "Plomero certificado con 14 años de experiencia. Especializado en detección de fugas, tuberías y remodelación de baños. Trabajo con garantía escrita.",
    skills: ["Detección de fugas", "Tuberías de cobre", "Calentadores", "Baños", "Cisternas"],
    availability: "Lun–Sáb, 8am–7pm",
    jobs: 340,
    verified: true,
  },
  {
    id: 2,
    name: "Valentina Cruz",
    trade: "Electricidad",
    rating: 4.8,
    reviews: 95,
    rate: 120,
    location: "Cayma",
    experience: 9,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format",
    bio: "Ingeniera electricista con cédula profesional. Instalaciones residenciales y comerciales, centros de carga e iluminación LED. Emergencias 24h.",
    skills: ["Cableado residencial", "Centros de carga", "Iluminación LED", "Contactos", "Emergencias 24h"],
    availability: "Lun–Dom, 24h",
    jobs: 210,
    verified: true,
  },
  {
    id: 3,
    name: "Andrés Fuentes",
    trade: "Carpintería",
    rating: 4.7,
    reviews: 73,
    rate: 0,
    location: "Miraflores",
    experience: 18,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
    bio: "Maestro carpintero con taller propio. Muebles a medida, instalación de pisos de madera y restauración de piezas antiguas.",
    skills: ["Muebles a medida", "Pisos de madera", "Closets", "Puertas", "Restauración"],
    availability: "Lun–Vie, 9am–6pm",
    jobs: 180,
    verified: true,
  },
  {
    id: 4,
    name: "Sofía Ramírez",
    trade: "Limpieza",
    rating: 4.9,
    reviews: 214,
    rate: 0,
    location: "Yanahuara",
    experience: 7,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
    bio: "Especialista en limpieza profunda y mantenimiento periódico. Productos ecológicos, puntual y con referencias verificadas.",
    skills: ["Limpieza profunda", "Mudanzas", "Tapicería", "Ventanas", "Desinfección"],
    availability: "Lun–Sáb, 7am–5pm",
    jobs: 510,
    verified: true,
  },
  {
    id: 5,
    name: "Carlos Ibarra",
    trade: "Pintura",
    rating: 4.6,
    reviews: 61,
    rate: 0,
    location: "Cayma",
    experience: 11,
    photo: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=400&fit=crop&auto=format",
    bio: "Pintor profesional de interiores y exteriores. Texturas decorativas, fachadas y acabados. Materiales de primera calidad.",
    skills: ["Pintura interior", "Fachadas", "Texturas", "Esmaltes", "Techos"],
    availability: "Lun–Sáb, 8am–6pm",
    jobs: 145,
    verified: false,
  },
  {
    id: 6,
    name: "Lucía Vega",
    trade: "Jardinería",
    rating: 4.8,
    reviews: 87,
    rate: 0,
    location: "Alto Selva Alegre",
    experience: 6,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format",
    bio: "Paisajista certificada. Diseño de jardines, riego automatizado y mantenimiento mensual. Plantas de temporada.",
    skills: ["Diseño de jardines", "Riego automatizado", "Poda", "Plantas interior", "Huertos"],
    availability: "Mar–Dom, 8am–4pm",
    jobs: 220,
    verified: true,
  },
];

/* Reseñas por id de especialista */
const reviewsMap = {
  1: [
    { author: "María García", rating: 5, date: "15 ago 2026", text: "Roberto llegó puntual, identificó la fuga en minutos y dejó todo impecable. Muy profesional.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" },
    { author: "Javier López", rating: 5, date: "2 ago 2026", text: "Excelente trabajo en la remodelación de mi baño. Cumplió tiempos y presupuesto.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format" },
    { author: "Ana Torres", rating: 4, date: "18 jul 2026", text: "Buen trabajo en el calentador. Tardó un poco más de lo esperado pero el resultado fue perfecto.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format" },
  ],
  2: [
    { author: "Pedro Soto", rating: 5, date: "10 sep 2026", text: "Valentina instaló todo el cableado de mi casa en dos días. Muy ordenada y profesional.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format" },
    { author: "Rosa Méndez", rating: 5, date: "25 ago 2026", text: "Me atendió una emergencia a las 11pm. Rapidísima y muy competente.", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&auto=format" },
  ],
  3: [
    { author: "Felipe Rojas", rating: 5, date: "5 sep 2026", text: "Los closets son una obra de arte. Madera sólida, acabados perfectos.", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format" },
  ],
  4: [
    { author: "Daniela Mora", rating: 5, date: "8 sep 2026", text: "Sofía dejó mi departamento reluciente para la mudanza. Rapidísima.", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&auto=format" },
    { author: "Luis Herrera", rating: 5, date: "1 sep 2026", text: "Venía cada quincena y la casa siempre quedaba perfecta. Super recomendada.", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&auto=format" },
  ],
  5: [
    { author: "Miguel Castillo", rating: 5, date: "3 sep 2026", text: "Pintó toda la fachada de mi casa perfectamente. Pulcro, rápido y buen precio.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format" },
  ],
  6: [
    { author: "Gabriela Núñez", rating: 5, date: "7 sep 2026", text: "El jardín que diseñó Lucía transformó completamente mi terraza.", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&auto=format" },
  ],
};

/* Conversaciones del chat */
const conversations = [
  {
    id: 1,
    specialistId: 1,
    specialist: "Roberto Medina",
    photo: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=80&h=80&fit=crop&auto=format",
    trade: "Plomería",
    time: "10:42",
    unread: 1,
    messages: [
      { from: "me", text: "Hola Roberto, tengo una fuga debajo del lavabo.", time: "10:30" },
      { from: "them", text: "Hola! ¿Desde cuándo ocurre la fuga? ¿Es constante o solo cuando abre el agua?", time: "10:35" },
      { from: "me", text: "Es constante, desde ayer. Hay algo de humedad en el mueble.", time: "10:38" },
      { from: "them", text: "Claro, puedo ir el viernes por la mañana.", time: "10:42" },
    ],
  },
  {
    id: 2,
    specialistId: 4,
    specialist: "Sofía Ramírez",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
    trade: "Limpieza",
    time: "Ayer",
    unread: 0,
    messages: [
      { from: "me", text: "Sofía, ¿tienes disponibilidad este sábado para limpieza profunda?", time: "Ayer 15:00" },
      { from: "them", text: "Sí, tengo disponible de 9am a 1pm. ¿Cuántos m² es el departamento?", time: "Ayer 15:10" },
      { from: "me", text: "Son 80m², 2 habitaciones y 2 baños.", time: "Ayer 15:15" },
      { from: "them", text: "¡Perfecto! Nos vemos el sábado a las 9am.", time: "Ayer 15:20" },
    ],
  },
  {
    id: 3,
    specialistId: 2,
    specialist: "Valentina Cruz",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format",
    trade: "Electricidad",
    time: "Lun",
    unread: 0,
    messages: [
      { from: "me", text: "Valentina, necesito cambiar el centro de carga de mi casa.", time: "Lun 11:00" },
      { from: "them", text: "Entendido. ¿Cuántos circuitos tiene actualmente y cuántos necesitas?", time: "Lun 11:15" },
      { from: "me", text: "Actualmente 8, necesitaría unos 14 o 16.", time: "Lun 11:20" },
      { from: "them", text: "El presupuesto para el centro de carga sería S/.2,800.", time: "Lun 11:35" },
    ],
  },
];

/* Categorías del formulario de emergencia */
const emergencyCategories = [
  { id: "plomeria", label: "Plomería", icon: "💧" },
  { id: "electricidad", label: "Electricidad", icon: "⚡" },
  { id: "gas", label: "Gas", icon: "🔥" },
  { id: "cerrajeria", label: "Cerrajería", icon: "🔑" },
  { id: "climatizacion", label: "Clima / AC", icon: "❄️" },
  { id: "estructural", label: "Estructural", icon: "🏗️" },
  { id: "limpieza", label: "Limpieza urgente", icon: "🧹" },
  { id: "otro", label: "Otro", icon: "🔧" },
];

/* Servicios contratados (pestaña Perfil) */
const bookings = [
  { id: 1, specialist: "Roberto Medina", trade: "Plomería", date: "10 sep 2026", status: "Completado", rating: 5, amount: 700, photo: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=80&h=80&fit=crop&auto=format" },
  { id: 2, specialist: "Sofía Ramírez", trade: "Limpieza", date: "5 sep 2026", status: "Completado", rating: 5, amount: 400, photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format" },
  { id: 3, specialist: "Valentina Cruz", trade: "Electricidad", date: "18 sep 2026", status: "Programado", rating: 0, amount: 840, photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format" },
  { id: 4, specialist: "Andrés Fuentes", trade: "Carpintería", date: "20 sep 2026", status: "Programado", rating: 0, amount: 1100, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
];

/* Usuario de ejemplo */
const userProfile = {
  name: "Carlos Mendoza",
  phone: "+51 902 666 187",
  address: "Av. Insurgentes Sur 123 - Cayma",
  email: "carlos.mendoza@gmail.com",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
};
