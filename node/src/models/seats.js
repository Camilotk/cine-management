const {Model, DataTypes} = require('sequelize');

class Seats extends Model {
  static init(sequelize) {
    super.init({
    qntAssentos: DataTypes.INTEGER,
    refAssentos: DataTypes.JSON,
    }, {
      sequelize,
      tableName: 'Seats',
    });
  }

  static associate(models) {
    this.belongsTo(models.Sessions, { foreignKey: 'session_id', as: 'sessions' });
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'users' });
  }
}

module.exports = Seats;