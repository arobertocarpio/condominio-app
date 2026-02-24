const matriculaService = require('./matricula.service');

class MatriculaController {
  async crear(req, res) {
    try {
      const matricula = await matriculaService.crear(req.body);
      res.status(201).json(matricula);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodas(req, res) {
    try {
      const matriculas = await matriculaService.obtenerTodas();
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const matricula = await matriculaService.obtenerPorId(req.params.matricula);
      if (!matricula) {
        return res.status(404).json({ error: 'Matrícula no encontrada' });
      }
      res.json(matricula);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorResidente(req, res) {
    try {
      const matriculas = await matriculaService.obtenerPorResidente(req.params.idResidente);
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorVisitante(req, res) {
    try {
      const matriculas = await matriculaService.obtenerPorVisitante(req.params.idVisitante);
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const matricula = await matriculaService.actualizar(req.params.matricula, req.body);
      res.json(matricula);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await matriculaService.eliminar(req.params.matricula);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MatriculaController();
