'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee',
      });
    }
  }

  Education.init(
    {
      employee_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      level: DataTypes.ENUM('SD', 'SMP', 'SMA', 'Diploma', 'S1', 'S2', 'S3'),
      description: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Education',
      tableName: 'education',
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Education;
};
