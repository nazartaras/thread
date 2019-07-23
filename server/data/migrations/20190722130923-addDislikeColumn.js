'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
                'postReactions',
                'isDislike',
                {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
            )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
