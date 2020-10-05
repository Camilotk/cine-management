module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      preco2d: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      preco3d: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Prices');
  },
};

