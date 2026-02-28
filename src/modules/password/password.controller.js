const passwordService = require('./password.service');

class PasswordController {
  async cambiarPorEmail(req, res) {
    try {
      const { email, nuevaPassword } = req.body;

      if (!email || !nuevaPassword) {
        return res.status(400).json({
          error: 'email y nuevaPassword son requeridos'
        });
      }

      const resultado = await passwordService.cambiarPorEmail(
        email,
        nuevaPassword
      );

      res.json(resultado);

    } catch (error) {
      console.error('ERROR REAL:', error);
      res.status(500).json({
        error: error.message
      });
    }
  }
}

module.exports = new PasswordController();