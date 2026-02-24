const vigilanteService = require('./vigilante.service');

class VigilanteController {
  async crear(req, res) {
    try {
      const vigilante = await vigilanteService.crear(req.body);
      res.status(201).json(vigilante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const vigilantes = await vigilanteService.obtenerTodos();
      res.json(vigilantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const vigilante = await vigilanteService.obtenerPorId(req.params.id);
      if (!vigilante) {
        return res.status(404).json({ error: 'Vigilante no encontrado' });
      }
      res.json(vigilante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorUsuario(req, res) {
    try {
      const vigilante = await vigilanteService.obtenerPorUsuario(req.params.idUsuario);
      if (!vigilante) {
        return res.status(404).json({ error: 'Vigilante no encontrado' });
      }
      res.json(vigilante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const vigilante = await vigilanteService.actualizar(req.params.id, req.body);
      res.json(vigilante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await vigilanteService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new VigilanteController();
