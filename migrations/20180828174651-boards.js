'use strict';
const table = 'boards';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastViewed: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull:false
      },
      ownerID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: true
      },
      teamID: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};
