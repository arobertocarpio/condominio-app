const departamentoService = require('./departamento.service');

class DepartamentoController {
  async crear(req, res) {
    try {
      const departamento = await departamentoService.crear(req.body);
      res.status(201).json(departamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const departamentos = await departamentoService.obtenerTodos();
      res.json(departamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const departamento = await departamentoService.obtenerPorId(req.params.id);
      if (!departamento) {
        return res.status(404).json({ error: 'Departamento no encontrado' });
      }
      res.json(departamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorEdificio(req, res) {
    try {
      const departamentos = await departamentoService.obtenerPorEdificio(req.params.idEdificio);
      res.json(departamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const departamento = await departamentoService.actualizar(req.params.id, req.body);
      res.json(departamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await departamentoService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DepartamentoController();
