'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeFamily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeFamily.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee',
      });
      // define association here
    }
  }
  EmployeeFamily.init(
    {
      employee_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      identifier: DataTypes.STRING,
      job: DataTypes.STRING,
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      religion: DataTypes.ENUM('Islam', 'Katolik', 'Buda', 'Protestan', 'Hindu'),
      is_life: DataTypes.BOOLEAN,
      is_divorced: DataTypes.BOOLEAN,
      relation_status: DataTypes.ENUM('Suami', 'Istri', 'Anak', 'Saudara'),
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EmployeeFamily',
      tableName: 'employee_family',  
      underscored: true, 
      freezeTableName: true, 
      timestamps: true,
    }
  );
  return EmployeeFamily;
};
