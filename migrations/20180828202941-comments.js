'use strict';
const table="comments";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      cardID: {
        type:Sequelize.INTEGER,
        references: {
          model: 'cards',
          key: 'id',
        },
        onDelete: 'cascade'
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      dateTime: {
        type: Sequelize.DATE,
        default: Sequelize.NOW,
        allowNull:false
      },
      body: {
        type: Sequelize.STRING,
        allowNull:false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};
