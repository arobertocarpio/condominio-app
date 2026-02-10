const cajonService = require('./cajon.service');

class CajonController {
  async crear(req, res) {
    try {
      const cajon = await cajonService.crear(req.body);
      res.status(201).json(cajon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const cajones = await cajonService.obtenerTodos();
      res.json(cajones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const cajon = await cajonService.obtenerPorId(req.params.id);
      if (!cajon) {
        return res.status(404).json({ error: 'Cajón no encontrado' });
      }
      res.json(cajon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorDepartamento(req, res) {
    try {
      const cajones = await cajonService.obtenerPorDepartamento(req.params.idDepartamento);
      res.json(cajones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerDisponibles(req, res) {
    try {
      const cajones = await cajonService.obtenerDisponibles();
      res.json(cajones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const cajon = await cajonService.actualizar(req.params.id, req.body);
      res.json(cajon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await cajonService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CajonController();
