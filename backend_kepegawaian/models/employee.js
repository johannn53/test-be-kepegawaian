'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasOne(models.EmployeeProfile, {
        foreignKey: 'employee_id',
        as: 'profile',
        onDelete: 'CASCADE',
      });

      Employee.hasMany(models.EmployeeFamily, {
        foreignKey: 'employee_id',
        as: 'families',
        onDelete: 'CASCADE',
      });

      Employee.hasMany(models.Education, {
        foreignKey: 'employee_id',
        as: 'educations',
        onDelete: 'CASCADE',
      });
    }
  }

  Employee.init(
    {
      nik: DataTypes.STRING,
      name: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Employee',
      tableName: 'employee',
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Employee;
};
