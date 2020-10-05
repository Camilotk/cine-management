const {Model, DataTypes} = require('sequelize');
class Prices extends Model {
  static init(sequelize) {
    super.init({
      preco2d: DataTypes.STRING,
      preco3d: DataTypes.STRING,  
     
    }, {
      sequelize,
      tableName: 'Prices',
    });
  }

  static associate(models) {
    
  }
}

module.exports = Prices;