const residenteService = require('./residente.service');

class ResidenteController {
  async crear(req, res) {
    try {
      const residente = await residenteService.crear(req.body);
      res.status(201).json(residente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const residentes = await residenteService.obtenerTodos();
      res.json(residentes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const residente = await residenteService.obtenerPorId(req.params.id);
      if (!residente) {
        return res.status(404).json({ error: 'Residente no encontrado' });
      }
      res.json(residente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorDepartamento(req, res) {
    try {
      const residentes = await residenteService.obtenerPorDepartamento(req.params.idDepartamento);
      res.json(residentes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorUsuario(req, res) {
    try {
      const residente = await residenteService.obtenerPorUsuario(req.params.idUsuario);
      if (!residente) {
        return res.status(404).json({ error: 'Residente no encontrado' });
      }
      res.json(residente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const residente = await residenteService.actualizar(req.params.id, req.body);
      res.json(residente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await residenteService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ResidenteController();
