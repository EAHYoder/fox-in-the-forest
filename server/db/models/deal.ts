import { Sequelize, Optional, Model, DataTypes } from 'sequelize';
import db from "../db"
import {DealAttributes} from "../../../models/DealAttributes"

// This line allows us to create a deal using Deal.create() and not have to supply an id because it's optional
interface DealCreationAttributes extends Optional <DealAttributes, 'id'>{}

// This interface is the type of the sequelize model generated from db.define
interface DealInstance extends Model<DealAttributes, DealCreationAttributes>, DealAttributes {}

module.exports = db.define<DealInstance>("deck", {
  id:{
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
  },
  undealtCards: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  player0Hand: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  player1Hand: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  decree: {
    type: DataTypes.INTEGER,
  },
});
