'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployeeProfile extends Model {
    static associate(models) {
      EmployeeProfile.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee',
      });
    }
  }

  EmployeeProfile.init(
    {
      employee_id: DataTypes.INTEGER,
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      gender: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
      is_married: DataTypes.BOOLEAN,
      prof_pict: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EmployeeProfile',
      tableName: 'employee_profile',
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );

  return EmployeeProfile;
};
