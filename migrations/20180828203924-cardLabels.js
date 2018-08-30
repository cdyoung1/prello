'use strict';
const table= 'cardLabels';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      labelID: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'labels',
          key: 'id'
        }
      },
      cardID:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references: {
          model: 'cards',
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};
