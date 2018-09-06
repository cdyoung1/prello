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
        defaultValue: Sequelize.fn('NOW'),
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
        references: {
          model: 'teams',
          key: 'id',
        },
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
      
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};
