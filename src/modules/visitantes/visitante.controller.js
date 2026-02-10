const visitanteService = require('./visitante.service');

class VisitanteController {
  async crear(req, res) {
    try {
      const visitante = await visitanteService.crear(req.body);
      res.status(201).json(visitante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const visitantes = await visitanteService.obtenerTodos();
      res.json(visitantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerActivos(req, res) {
    try {
      const visitantes = await visitanteService.obtenerActivos();
      res.json(visitantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const visitante = await visitanteService.obtenerPorId(req.params.id);
      if (!visitante) {
        return res.status(404).json({ error: 'Visitante no encontrado' });
      }
      res.json(visitante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorDepartamento(req, res) {
    try {
      const visitantes = await visitanteService.obtenerPorDepartamento(req.params.idDepartamento);
      res.json(visitantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorCategoria(req, res) {
    try {
      const visitantes = await visitanteService.obtenerPorCategoria(req.params.categoria);
      res.json(visitantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const visitante = await visitanteService.actualizar(req.params.id, req.body);
      res.json(visitante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async desactivar(req, res) {
    try {
      const visitante = await visitanteService.desactivar(req.params.id);
      res.json(visitante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async activar(req, res) {
    try {
      const visitante = await visitanteService.activar(req.params.id);
      res.json(visitante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await visitanteService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new VisitanteController();
