const estadoPagoService = require('./estadopago.service');

class EstadoPagoController {
  async crear(req, res) {
    try {
      const pago = await estadoPagoService.crear(req.body);
      res.status(201).json(pago);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const pagos = await estadoPagoService.obtenerTodos();
      res.json(pagos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const pago = await estadoPagoService.obtenerPorId(req.params.id);
      if (!pago) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }
      res.json(pago);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorResidente(req, res) {
    try {
      const pagos = await estadoPagoService.obtenerPorResidente(req.params.idResidente);
      res.json(pagos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPendientes(req, res) {
    try {
      const pagos = await estadoPagoService.obtenerPendientes();
      res.json(pagos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerVencidos(req, res) {
    try {
      const pagos = await estadoPagoService.obtenerVencidos();
      res.json(pagos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async registrarPago(req, res) {
    try {
      const pago = await estadoPagoService.registrarPago(req.params.id);
      res.json(pago);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const pago = await estadoPagoService.actualizar(req.params.id, req.body);
      res.json(pago);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await estadoPagoService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EstadoPagoController();
