const passwordService = require('./password.service');

class PasswordController {
  async cambiar(req, res) {
    try {
      const { idUsuario } = req.params;

      const nuevaPassword = req.body?.nuevaPassword;
      console.log("BODY COMPLETO:", req.body);
      console.log('ID Usuario:', idUsuario);
      console.log('Nueva Contraseña:', nuevaPassword);

      if (!nuevaPassword) {
        return res.status(400).json({
          error: 'nuevaPassword es requerida'
        });
      }

      if (nuevaPassword.length < 6) {
        return res.status(400).json({
          error: 'La contraseña debe tener al menos 6 caracteres'
        });
      }

      const resultado = await passwordService.cambiar(
        idUsuario,
        nuevaPassword
      );

      return res.json(resultado);

    } catch (error) {
      console.error('ERROR REAL:', error);

      return res.status(500).json({
        error: 'Error al cambiar la contraseña'
      });
    }
  }
}

module.exports = new PasswordController();