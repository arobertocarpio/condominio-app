const dashboardService = require('./dashboard.service');

exports.obtenerEstadisticas = async (req, res) => {
    try {
        const stats = await dashboardService.obtenerEstadisticas();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
    }
};
