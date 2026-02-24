const anuncioService = require('./anuncio.service');

class AnuncioController {
  async crear(req, res) {
    try {
      const anuncio = await anuncioService.crear(req.body);
      res.status(201).json(anuncio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const anuncios = await anuncioService.obtenerTodos();
      res.json(anuncios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerRecientes(req, res) {
    try {
      const limite = parseInt(req.query.limite) || 10;
      const anuncios = await anuncioService.obtenerRecientes(limite);
      res.json(anuncios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const anuncio = await anuncioService.obtenerPorId(req.params.id);
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }
      res.json(anuncio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerPorAdministrador(req, res) {
    try {
      const anuncios = await anuncioService.obtenerPorAdministrador(req.params.idAdmin);
      res.json(anuncios);
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
      const anuncios = await anuncioService.obtenerPorFecha(fechaInicio, fechaFin);
      res.json(anuncios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const anuncio = await anuncioService.actualizar(req.params.id, req.body);
      res.json(anuncio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await anuncioService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AnuncioController();
