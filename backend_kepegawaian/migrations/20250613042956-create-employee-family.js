'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_family', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employee', // REF TO EMPLOYEE TABLE
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
      },
      identifier: {
        type: Sequelize.STRING,
      },
      job: {
        type: Sequelize.STRING,
      },
      place_of_birth: {
        type: Sequelize.STRING,
      },
      date_of_birth: {
        type: Sequelize.DATE,
      },
      religion: {
        type: Sequelize.ENUM('Islam', 'Katolik', 'Buda', 'Protestan', 'Hindu'),
      },
      is_life: {
        type: Sequelize.BOOLEAN,
      },
      is_divorced: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      relation_status: {
        type: Sequelize.ENUM('Suami', 'Istri', 'Anak', 'Saudara'),
      },
      created_by: {
        type: Sequelize.STRING,
      },
      updated_by: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_family');
  },
};
