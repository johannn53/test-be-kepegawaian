'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employee_profile', [
      {
        employee_id: 1,
        place_of_birth: 'Jakarta',
        date_of_birth: new Date('1996-04-09'),
        gender: 'Laki-Laki',
        is_married: true,
        prof_pict: 'Ari.jpg',
        created_by: 'system',
        updated_by: 'system',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        employee_id: 2,
        place_of_birth: 'Bandung',
        date_of_birth: new Date('1990-01-01'),
        gender: 'Laki-Laki',
        is_married: false,
        prof_pict: 'Johand.jpg',
        created_by: 'system',
        updated_by: 'system',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee_profile', null, {});
  }
};
