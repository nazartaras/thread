'use strict';
export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
        .transaction(transaction => Promise.all([
    queryInterface.addColumn('commentReaction', 'userId', {
      type: Sequelize.UUID,
      references: {
          model: 'users',
          key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
  }, { transaction }),
  queryInterface.addColumn('commentReaction', 'commentId', {
      type: Sequelize.UUID,
      references: {
          model: 'comments',
          key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
  }, { transaction })
])),
  

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
