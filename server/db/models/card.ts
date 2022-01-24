import { Sequelize, Optional, Model, DataTypes } from 'sequelize';
import db from "../db"
import {CardAttributes} from "../../../models/CardAttributes"

// This line allows us to create an User using User.create() and not have to supply an id because it's optional
interface CardCreationAttributes extends Optional <CardAttributes, 'id'>{}

// This interface is the type of the sequelize model generated from db.define
interface CardInstance extends Model<CardAttributes, CardCreationAttributes>, CardAttributes {}

const Card = db.define<CardInstance>("card", {
  id:{
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
  },
  suit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 10,
    },
  },
  movement: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 3,
    },
  },
  //certain cards have a special name associated powers.  I probably won't get that far in this project, but this is here as a place holder
  special: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

module.exports = Card;
