const edificioService = require('./edificio.service');

class EdificioController {
  async crear(req, res) {
    try {
      const edificio = await edificioService.crear(req.body);
      res.status(201).json(edificio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const edificios = await edificioService.obtenerTodos();
      res.json(edificios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const edificio = await edificioService.obtenerPorId(req.params.id);
      if (!edificio) {
        return res.status(404).json({ error: 'Edificio no encontrado' });
      }
      res.json(edificio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const edificio = await edificioService.actualizar(req.params.id, req.body);
      res.json(edificio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await edificioService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EdificioController();
