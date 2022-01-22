//this is the access point for all things database related!
import db from './db';

import User from "./models/User";
import Space from "./models/space";
import Card from "./models/card";
import Deal from "./models/deal";

//associations could go here!

export {
  db,
  User,
  Space,
  Card,
  Deal,
};
