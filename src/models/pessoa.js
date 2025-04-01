'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.curso, { 
        foreignKey: 'docente_id', 
      });
      Pessoa.hasMany(models.matricula, {
        foreignKey: 'estudante_id', 
      });
     
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    emai: DataTypes.STRING,
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas'
  });
  return Pessoa;
};