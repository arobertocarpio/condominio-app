const administradorService = require('./administrador.service');

class AdministradorController {
  async crear(req, res) {
    try {
      const administrador = await administradorService.crear(req.body);
      res.status(201).json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const administradores = await administradorService.obtenerTodos();
      res.json(administradores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const administrador = await administradorService.obtenerPorId(req.params.id);
      if (!administrador) {
        return res.status(404).json({ error: 'Administrador no encontrado' });
      }
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorUsuario(req, res) {
    try {
      const administrador = await administradorService.obtenerPorUsuario(req.params.idUsuario);
      if (!administrador) {
        return res.status(404).json({ error: 'Administrador no encontrado' });
      }
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const administrador = await administradorService.actualizar(req.params.id, req.body);
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await administradorService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdministradorController();
