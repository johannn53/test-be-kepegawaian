'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('education', [
      {
        employee_id: 1,
        name: 'BINUS',
        level: 'S1',
        description: 'Komunikasi',
        created_by: 'system',
        updated_by: 'system',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        employee_id: 2,
        name: 'Universitas Padjadjaran',
        level: 'S2',
        description: 'Akuntansi',
        created_by: 'system',
        updated_by: 'system',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('education', null, {});
  }
};
