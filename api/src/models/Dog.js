const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    weight_min:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    height_min:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    height_max:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    life:{
      type: DataTypes.STRING
    },
    image:{
      type: DataTypes.STRING,
      
    }
  });

};
