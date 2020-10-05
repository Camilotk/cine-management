const {Model, DataTypes} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
class Movies extends Model {
  static init(sequelize) {
    super.init({
      imagem: DataTypes.STRING,
      titulo: DataTypes.STRING,  
      descricao: DataTypes.STRING,
      duracao: DataTypes.TIME,
      faturamento: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'Movies',
    });
  }

  static associate(models) {
    this.hasMany(models.Sessions, { foreignKey: 'movie_id', as: 'sessions' });
  }
}
sequelizePaginate.paginate(Movies)
module.exports = Movies;