import * as Sequelize from 'sequelize';

export async function up(sequelize: Sequelize.Sequelize) {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable('topics', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
}

export async function down(sequelize: Sequelize.Sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.dropTable('topics');
}
