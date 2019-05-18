'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('siswas', [{
      nama: 'Taufiq raihan',
      alamat: 'Bandar Lampung',
      kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama: 'Ganda Rain',
      alamat: 'Medan',
      kelas: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('siswas', null, {});

  }
};
