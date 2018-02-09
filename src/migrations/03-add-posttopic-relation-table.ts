import * as Sequelize from 'sequelize'

export async function up(sequelize: Sequelize.Sequelize) {
  const queryInterface = sequelize.getQueryInterface()
  
  await queryInterface.createTable('posttopic', {
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    topicId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'topics',
        key: 'id'
      }
    }
  });
}

export async function down(sequelize: Sequelize.Sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.dropTable('posttopic');
}