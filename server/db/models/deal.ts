const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("deck", {
  undealtCards: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
  player0Hand: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
  player1Hand: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
  decree: {
    type: Sequelize.INTEGER,
  },
});
