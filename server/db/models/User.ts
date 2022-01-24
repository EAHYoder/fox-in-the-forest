import { Sequelize, Optional, Model, DataTypes } from 'sequelize';
import db from "../db"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import axios from "axios"
import {UserAttributes} from "../../../models/UserAttributes"

const SALT_ROUNDS = 5;

// This line allows us to create an User using User.create() and not have to supply an id because it's optional
interface UserCreationAttributes extends Optional <UserAttributes, 'id'>{}

// This interface is the type of the sequelize model generated from db.define
//any method that exists on the class needs to be declared here (along with the type of what they return) so typescript knows to expect the method when it is created later.
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
   authenticate():string;
   findByToken():object;
 }

const User = db.define<UserInstance>("user", {
  id:{
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  //null means the player is not logged in.  0 means they are player 0, 1 means they are player 1.
  player: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  //is this the active player
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  //is this player leading the current trick?
  isLeading: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});



//instanceMethods
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

//classMethods
User.authenticate = async function ({ username, password }) {
  //determine how many users are already logged in
  const playersIn = await User.findAll({
    where: {
      player: {
        [Sequelize.Op.not]: null,
      },
    },
  });
  let playerCount = playersIn.length;

  //if 2 players are already logged deny log in because the game is full.
  if (playerCount >= 2) {
    const error = Error("Maximum number of players already logged in");
    error.status = 401;
    throw error;
  }

  //if we have reached this line it means we will allow login attempt because the game is not yet full
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }

  //ifwe have reached this line it means the game is not full and the user provided a valid password, so we need to update the user to indicate they are logged in and whether they are player0 or player1

  //if 1 player is already logged in set this user's player to 1 (since 0 should already be taken)
  if (playerCount === 1) {
    await user.update({ player: 1 });
  }

  //if no players are already logged in set this user's player to 0.
  if (playerCount === 0) {
    await user.update({ player: 0 });
  }

  //by this point it is confirmed that the game is not full, the user has provided a valid password and username, the user's player status has been correctly updated.  so a token can be provided.
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "Could not find a user with that token's id";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

//hooks
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

export default User;
