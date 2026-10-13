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

/* Conversaciones del chat con soporte técnico interactivo y fotos */
const conversations = [
  {
    id: 1,
    specialistId: 1,
    specialist: "Roberto Medina",
    photo: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=80&h=80&fit=crop&auto=format",
    trade: "Plomería & Diagnóstico",
    time: "Ahora",
    unread: 1,
    status: "En línea",
    badge: "Diagnóstico en vivo",
    messages: [
      {
        from: "me",
        text: "Hola maestro Roberto, tengo una fuga constante bajo el lavabo. Aquí le adjunto la foto del problema:",
        photo: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=450&fit=crop&auto=format",
        photoLabel: "Avería: Fuga en codo de desagüe",
        time: "10:30",
      },
      {
        from: "them",
        text: "¡Hola Carlos! Ya revisé la foto detalladamente. Se nota que el empaque cónico del sifón se ha resecado y la rosca perdió estanqueidad. Cierra la llave angular de paso por seguridad. Llevo repuesto nuevo de PVC de 1 1/2\", empaquetadura y sellador teflón para repararlo en unos 30 minutos.",
        audioNote: { duration: "0:24" },
        quote: {
          title: "Presupuesto sugerido de reparación",
          amount: 65,
          desc: "Mano de obra + cambio de junta y prueba hidráulica",
        },
        time: "10:32",
      },
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
    status: "Desconectada",
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
    status: "En línea",
    messages: [
      { from: "me", text: "Valentina, necesito cambiar el centro de carga de mi casa.", time: "Lun 11:00" },
      { from: "them", text: "Entendido. ¿Cuántos circuitos tiene actualmente y cuántos necesitas?", time: "Lun 11:15" },
      { from: "me", text: "Actualmente 8, necesitaría unos 14 o 16.", time: "Lun 11:20" },
      { from: "them", text: "El presupuesto para el centro de carga sería S/.2,800 con llaves termomagnéticas Schneider.", time: "Lun 11:35" },
    ],
  },
];

/* Plantillas de problemas comunes en casa para diagnóstico rápido */
const problemPresets = [
  {
    id: "fuga",
    category: "plomeria",
    label: "Fuga de agua",
    title: "Tubería con goteo constante",
    subtitle: "Filtración bajo mueble o lavadero",
    icon: "💧",
    color: "#2D7A56",
    specialistId: 1,
    photo: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=450&fit=crop&auto=format",
    userPrompt: "Maestro, tengo esta fuga de agua debajo del lavabo, está goteando y mojando el piso.",
    techResponse: "¡Hola! Viendo la foto que enviaste, la tuerca de acople y el empaque cónico están fisurados. Cierra la llave de paso de abajo para que no dañe el mueble. Voy con repuesto de PVC y teflón para resolverlo en 30 minutos.",
    audioDuration: "0:24",
    estimatedCost: 65,
  },
  {
    id: "electricidad",
    category: "electricidad",
    label: "Cortocircuito",
    title: "Enchufe quemado / Salta llave",
    subtitle: "Tomacorriente con chispas o sin energía",
    icon: "⚡",
    color: "#245C40",
    specialistId: 2,
    photo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=450&fit=crop&auto=format",
    userPrompt: "Hola Valentina, este enchufe sacó chispas y huele a quemado, la llave del tablero se bajó.",
    techResponse: "¡Hola! Por seguridad no intentes rearmar la llave térmica hasta revisar. En la foto se ve recalentamiento en los bornes. Llevo multímetro y reemplazo Bticino para dejarlo seguro.",
    audioDuration: "0:28",
    estimatedCost: 75,
  },
  {
    id: "cerradura",
    category: "cerrajeria",
    label: "Chapa atascada",
    title: "Cerradura no gira / trabada",
    subtitle: "Puerta principal bloqueada",
    icon: "🔑",
    color: "#0D2B1F",
    specialistId: 1,
    photo: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=450&fit=crop&auto=format",
    userPrompt: "Maestro Roberto, la llave se quedó atascada en la cerradura principal y no gira ni sale.",
    techResponse: "Hola. Por la foto veo que los pines del bombín se han cruzado. No fuerces la llave para que no se parta adentro. Llevo extractor de cilindros y lubricante para destrabarla en 15 minutos.",
    audioDuration: "0:19",
    estimatedCost: 50,
  },
  {
    id: "humedad",
    category: "pintura",
    label: "Humedad en muro",
    title: "Pared inflada / Filtración",
    subtitle: "Desprendimiento de pintura o moho",
    icon: "🧱",
    color: "#52B788",
    specialistId: 5,
    photo: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&h=450&fit=crop&auto=format",
    userPrompt: "Buenas, tengo esta mancha de humedad y la pintura se está descascarando en la pared.",
    techResponse: "Hola. En la imagen se evidencia humedad por capilaridad o posible fuga interna. Llevo medidor de humedad para detectar el origen exacto, raspar y aplicar impermeabilizante antihongos.",
    audioDuration: "0:22",
    estimatedCost: 85,
  },
];

/* Datos de la portada y testimonios */
const portadaData = {
  hero: {
    tag: "Servicio #1 para el Hogar en Arequipa",
    title: "Soluciona cualquier avería en tu hogar con técnicos en directo",
    subtitle: "Muestra tu problema por foto, conversa al instante con especialistas verificados y recibe presupuesto claro antes de contratar.",
    stats: [
      { num: "2,500+", label: "Hogares atendidos" },
      { num: "4.9 ★", label: "Calificación media" },
      { num: "15 min", label: "Respuesta promedio" },
    ],
  },
  features: [
    {
      icon: "📸",
      title: "Muestra tu problema con fotos",
      desc: "Sube una imagen de la fuga, cortocircuito o avería para que el técnico lo evalúe al instante.",
    },
    {
      icon: "💬",
      title: "Chat interactivo en vivo",
      desc: "Conversa con el técnico antes de pagar, recibe notas de voz y resuelve dudas técnicas.",
    },
    {
      icon: "🛡️",
      title: "Técnicos 100% verificados",
      desc: "Profesionales con antecedentes revisados, cédula oficial y garantía escrita de trabajo.",
    },
    {
      icon: "💰",
      title: "Paga solo al finalizar",
      desc: "Sin cobros sorpresa por adelantado. Paga con tarjeta, Yape o efectivo cuando el trabajo esté listo.",
    },
  ],
  testimonials: [
    {
      name: "Mariana Alarcón",
      district: "Cayma, Arequipa",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      text: "Le envié una foto de la fuga de la terma a Roberto y en 2 minutos ya sabía qué pieza fallaba. Vino con el repuesto exacto. ¡Increíble!",
      rating: 5,
      service: "Plomería",
    },
    {
      name: "Gonzalo Valdivia",
      district: "Yanahuara",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
      text: "La chapa de la puerta se trabó a las 9pm. Pude mostrarle el tipo de cerradura por chat al técnico y en 25 minutos ya estaba en mi casa.",
      rating: 5,
      service: "Cerrajería urgente",
    },
  ],
};

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
