'use strict';
const table = 'teamUsers';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      teamID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};