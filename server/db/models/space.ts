const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("space", {
  //is the team's tracker token currently on this space
  trackerPresent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  //is the space currently part of the path (if so: true) or if it covered by forest (if so: false)
  onPath: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  //how many gems are currently on the space
  gemCount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  //how many gems get added to this space at the end of a round
  gemIncrement: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});
