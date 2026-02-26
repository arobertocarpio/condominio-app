const anuncioService = require('./anuncio.service');
const fs = require('fs');
const path = require('path');

class AnuncioController {
  async crear(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) {
        data.ruta_archivo = `/uploads/anuncios/${req.file.filename}`;
      }
      // Convertir id_admin_fk a entero
      if (data.id_admin_fk) {
        data.id_admin_fk = parseInt(data.id_admin_fk);
      }
      const anuncio = await anuncioService.crear(data);
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
      const data = { ...req.body };
      if (req.file) {
        // Eliminar archivo anterior si existe
        const anuncioActual = await anuncioService.obtenerPorId(req.params.id);
        if (anuncioActual && anuncioActual.ruta_archivo) {
          const archivoAnterior = path.join(__dirname, '../..', anuncioActual.ruta_archivo);
          if (fs.existsSync(archivoAnterior)) {
            fs.unlinkSync(archivoAnterior);
          }
        }
        data.ruta_archivo = `/uploads/anuncios/${req.file.filename}`;
      }
      if (data.id_admin_fk) {
        data.id_admin_fk = parseInt(data.id_admin_fk);
      }
      const anuncio = await anuncioService.actualizar(req.params.id, data);
      res.json(anuncio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      // Eliminar archivo asociado si existe
      const anuncio = await anuncioService.obtenerPorId(req.params.id);
      if (anuncio && anuncio.ruta_archivo) {
        const archivoPath = path.join(__dirname, '../..', anuncio.ruta_archivo);
        if (fs.existsSync(archivoPath)) {
          fs.unlinkSync(archivoPath);
        }
      }
      await anuncioService.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AnuncioController();
