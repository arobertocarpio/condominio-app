const prisma = require('../../config/prisma');

class EstadoPagoService {
  async crear(data) {
    return await prisma.estadoPago.create({
      data,
      include: {
        residente: {
          include: {
            departamento: true,
            edificio: true
          }
        }
      }
    });
  }

  async obtenerTodos() {
    return await prisma.estadoPago.findMany({
      include: {
        residente: {
          include: {
            departamento: true,
            edificio: true
          }
        }
      },
      orderBy: {
        fecha_vencimiento: 'desc'
      }
    });
  }

  async obtenerPorId(id) {
    return await prisma.estadoPago.findUnique({
      where: { id_pago: parseInt(id) },
      include: {
        residente: {
          include: {
            departamento: true,
            edificio: true,
            usuario: {
              select: {
                correo: true
              }
            }
          }
        }
      }
    });
  }

  async obtenerPorResidente(idResidente) {
    return await prisma.estadoPago.findMany({
      where: { id_residente_fk: parseInt(idResidente) },
      orderBy: {
        fecha_vencimiento: 'desc'
      }
    });
  }

  async obtenerPendientes() {
    return await prisma.estadoPago.findMany({
      where: {
        estatus: 'pendiente'
      },
      include: {
        residente: {
          include: {
            departamento: true,
            edificio: true,
            usuario: {
              select: {
                correo: true
              }
            }
          }
        }
      },
      orderBy: {
        fecha_vencimiento: 'asc'
      }
    });
  }

  async obtenerVencidos() {
    return await prisma.estadoPago.findMany({
      where: {
        fecha_vencimiento: {
          lt: new Date()
        },
        estatus: 'pendiente'
      },
      include: {
        residente: {
          include: {
            departamento: true,
            edificio: true,
            usuario: {
              select: {
                correo: true
              }
            }
          }
        }
      },
      orderBy: {
        fecha_vencimiento: 'asc'
      }
    });
  }

  async registrarPago(id) {
    return await prisma.estadoPago.update({
      where: { id_pago: parseInt(id) },
      data: {
        estado: 'pagado',
        estatus: 'completado',
        fecha_ultimopago: new Date()
      },
      include: {
        residente: {
          include: {
            departamento: true,
            usuario: {
              select: {
                correo: true
              }
            }
          }
        }
      }
    });
  }

  async actualizar(id, data) {
    return await prisma.estadoPago.update({
      where: { id_pago: parseInt(id) },
      data,
      include: {
        residente: {
          include: {
            departamento: true
          }
        }
      }
    });
  }

  async eliminar(id) {
    return await prisma.estadoPago.delete({
      where: { id_pago: parseInt(id) }
    });
  }
}

module.exports = new EstadoPagoService();
