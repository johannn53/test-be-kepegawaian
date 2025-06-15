'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employee', [
      {
        nik: '11012',
        name: 'Ari',
        is_active: true,
        start_date: new Date('2025-01-01'),
        end_date: null,
        created_by: 'system',
        updated_by: 'system',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nik: '11013',
        name: 'Johand',
        is_active: true,
        start_date: new Date('2025-06-06'),
        end_date: null,
        created_by: 'system',
        updated_by: 'system',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee', null, {});
  },
};
