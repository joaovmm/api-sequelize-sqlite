const Sequelize = require('sequelize');

const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculasPorEstudante = await matriculaServices.pegaEContaRegistros(
        {
          where: {
            estudante_id: Number(estudante_id),
            status: 'Matriculado'
          },
          limit: 2,
          order: [['id', 'DESC']] 
        });
      return res.status(200).json(listaMatriculasPorEstudante);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async pegaCursosLotados(req, res) {
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.pegaEContaRegistros(
        {
          where: {
            status: 'Matriculado'
          },
          attributes: ['curso_id'],
          group: ['curso_id'],
          having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`),
        });
      return res.status(200).json(cursosLotados.count);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MatriculaController; 