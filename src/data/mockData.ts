// Mock data para el dashboard de nómina

export const nominaData = {
  resumenGeneral: {
    totalNeto: 1250000,
    totalBruto: 1680000,
    empleadosActivos: 85,
    costoPromedio: 19764.71,
    variacionMensual: {
      neto: 5.2,
      bruto: 4.8,
      empleados: 2,
      costo: 3.1
    }
  },
  
  incidencias: {
    faltas: 12,
    retardos: 28,
    incapacidades: 5,
    permisos: 8,
    tendencias: {
      faltas: "down",
      retardos: "up",
      incapacidades: "neutral"
    }
  },

  distribucionCostos: [
    { name: "Sueldos Base", value: 924000, percentage: 55, color: "#2563eb" },
    { name: "Horas Extras", value: 134400, percentage: 8, color: "#10b981" },
    { name: "Bonos", value: 201600, percentage: 12, color: "#f59e0b" },
    { name: "Prestaciones", value: 252000, percentage: 15, color: "#8b5cf6" },
    { name: "Deducciones", value: 168000, percentage: 10, color: "#ef4444" }
  ],

  cumplimiento: {
    procesoNomina: {
      enProceso: 15,
      validado: 65,
      timbrado: 83,
      pagado: 78,
      total: 85
    },
    cfdi: {
      timbrados: 83,
      pendientes: 2,
      porcentaje: 98
    },
    alertas: [
      { id: 1, tipo: "critica", mensaje: "2 empleados sin timbrar", fecha: "2024-01-15" },
      { id: 2, tipo: "advertencia", mensaje: "5 documentos por vencer", fecha: "2024-01-14" },
      { id: 3, tipo: "info", mensaje: "Proceso de nómina iniciado", fecha: "2024-01-13" }
    ]
  },

  altasBajas: {
    movimientos: [
      { mes: "Sep", altas: 6, bajas: 4 },
      { mes: "Oct", altas: 8, bajas: 3 },
      { mes: "Nov", altas: 5, bajas: 7 },
      { mes: "Dic", altas: 7, bajas: 5 },
      { mes: "Ene", altas: 8, bajas: 5 }
    ],
    motivosBaja: [
      { motivo: "Renuncia", cantidad: 15, porcentaje: 60 },
      { motivo: "Despido", cantidad: 5, porcentaje: 20 },
      { motivo: "Fin de Contrato", cantidad: 3, porcentaje: 12 },
      { motivo: "Otros", cantidad: 2, porcentaje: 8 }
    ],
    rotacionMensual: 7.6,
    rotacionAnual: 18.2
  },

  plantillaDepartamentos: [
    { departamento: "Ventas", empleados: 25, vacantes: 3, capacidad: 28 },
    { departamento: "Operaciones", empleados: 20, vacantes: 2, capacidad: 22 },
    { departamento: "Administración", empleados: 15, vacantes: 1, capacidad: 16 },
    { departamento: "IT", empleados: 12, vacantes: 2, capacidad: 14 },
    { departamento: "RRHH", empleados: 8, vacantes: 0, capacidad: 8 },
    { departamento: "Dirección", empleados: 5, vacantes: 1, capacidad: 6 }
  ],

  antiguedad: {
    distribucion: [
      { rango: "0-6 meses", empleados: 15, porcentaje: 18 },
      { rango: "6-12 meses", empleados: 12, porcentaje: 14 },
      { rango: "1-3 años", empleados: 28, porcentaje: 33 },
      { rango: "3-5 años", empleados: 16, porcentaje: 19 },
      { rango: "5+ años", empleados: 14, porcentaje: 16 }
    ],
    promedioAntiguedad: 3.2,
    empleadosMas5Anos: 28,
    tasaRetencion: 85,
    riesgoRotacion: [
      { departamento: "Ventas", riesgo: "alto" },
      { departamento: "IT", riesgo: "medio" },
      { departamento: "Operaciones", riesgo: "bajo" }
    ]
  },

  documentacion: {
    porcentajeCompleto: 78,
    expedientesPendientes: 19,
    tiposDocumento: [
      { tipo: "Identificación", completos: 85, total: 85, porcentaje: 100 },
      { tipo: "Contrato", completos: 83, total: 85, porcentaje: 98 },
      { tipo: "CURP", completos: 82, total: 85, porcentaje: 96 },
      { tipo: "RFC", completos: 80, total: 85, porcentaje: 94 },
      { tipo: "Comprobante Domicilio", completos: 75, total: 85, porcentaje: 88 },
      { tipo: "Examen Médico", completos: 70, total: 85, porcentaje: 82 }
    ],
    proximosVencimientos: [
      { documento: "Exámenes Médicos", empleados: 8, dias: 15 },
      { documento: "Contratos Temporales", empleados: 5, dias: 30 },
      { documento: "Certificaciones", empleados: 3, dias: 60 }
    ]
  },

  topIncidencias: [
    { nombre: "Juan Pérez", faltas: 8, retardos: 12, puntos: 20, riesgo: "alto" },
    { nombre: "María García", faltas: 6, retardos: 10, puntos: 16, riesgo: "medio" },
    { nombre: "Carlos López", faltas: 5, retardos: 8, puntos: 13, riesgo: "medio" },
    { nombre: "Ana Martínez", faltas: 4, retardos: 9, puntos: 13, riesgo: "medio" },
    { nombre: "Luis Rodríguez", faltas: 3, retardos: 7, puntos: 10, riesgo: "bajo" }
  ],

  horasExtrasPorArea: [
    { area: "Producción", horas: 120, limite: 100 },
    { area: "Ventas", horas: 85, limite: 100 },
    { area: "Logística", horas: 95, limite: 100 },
    { area: "Administración", horas: 45, limite: 100 },
    { area: "IT", horas: 110, limite: 100 }
  ]
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};