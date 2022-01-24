import { Sequelize, Optional, Model, DataTypes } from 'sequelize';
import db from "../db"
import {SpaceAttributes} from "../../../models/SpaceAttributes"

// This line allows us to create an User using User.create() and not have to supply an id because it's optional
interface SpaceCreationAttributes extends Optional <SpaceAttributes, 'id'>{}

// This interface is the type of the sequelize model generated from db.define
interface SpaceInstance extends Model<SpaceAttributes, SpaceCreationAttributes>, SpaceAttributes {
 }

module.exports = db.define<SpaceInstance>("space", {
  id:{
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
  },
  //is the team's tracker token currently on this space
  trackerPresent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  //is the space currently part of the path (if so: true) or if it covered by forest (if so: false)
  onPath: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  //how many gems are currently on the space
  gemCount: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  //how many gems get added to this space at the end of a round
  gemIncrement: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
});
