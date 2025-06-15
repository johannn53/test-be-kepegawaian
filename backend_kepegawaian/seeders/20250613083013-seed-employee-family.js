'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employee_family', [
      {
        employee_id: 1,
        name: 'Lomo',
        identifier: 'LOMO123',
        job: 'Developer',
        place_of_birth: 'Bogor',
        date_of_birth: new Date('1992-04-15'),
        religion: 'Islam',
        is_life: true,
        is_divorced: false,
        relation_status: 'Saudara',
        created_by: 'system',
        updated_by: 'system',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee_family', null, {});
  },
};
