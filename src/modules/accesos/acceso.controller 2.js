const accesoService = require('./acceso.service');

class AccesoController {
  async registrarEntrada(req, res) {
    try {
      const acceso = await accesoService.registrarEntrada(req.body);
      res.status(201).json(acceso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async registrarSalida(req, res) {
    try {
      const acceso = await accesoService.registrarSalida(req.params.id);
      res.json(acceso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const accesos = await accesoService.obtenerTodos();
      res.json(accesos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const acceso = await accesoService.obtenerPorId(req.params.id);
      if (!acceso) {
        return res.status(404).json({ error: 'Acceso no encontrado' });
      }
      res.json(acceso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorMatricula(req, res) {
    try {
      const accesos = await accesoService.obtenerPorMatricula(req.params.matricula);
      res.json(accesos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorVigilante(req, res) {
    try {
      const accesos = await accesoService.obtenerPorVigilante(req.params.idVigilante);
      res.json(accesos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerAccesosActivos(req, res) {
    try {
      const accesos = await accesoService.obtenerAccesosActivos();
      res.json(accesos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorFecha(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: 'Se requieren fechaInicio y fechaFin' });
      }
      const accesos = await accesoService.obtenerPorFecha(fechaInicio, fechaFin);
      res.json(accesos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const acceso = await accesoService.actualizar(req.params.id, req.body);
      res.json(acceso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await accesoService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AccesoController();
