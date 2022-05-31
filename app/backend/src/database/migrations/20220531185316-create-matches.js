'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.INTEGER
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER
      },
      awayTeam: {
        type: Sequelize.INTEGER
      },
      inProgress: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
