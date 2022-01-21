"use strict";

const {
  db,
  models: { User, Space, Card },
} = require("../server/db");

const spaces = [
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 0,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 0,
    gemIncrement: 1,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 0,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 1,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 1,
  },
  {
    trackerPresent: true,
    onPath: true,
    gemCount: 0,
    gemIncrement: 0,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 1,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 0,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 1,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 0,
    gemIncrement: 0,
  },
  {
    trackerPresent: false,
    onPath: true,
    gemCount: 1,
    gemIncrement: 0,
  },
];

const cards = [
  {
    suit: "dove",
    number: 1,
    movement: 0,
    special: "musician",
  },
  {
    suit: "dove",
    number: 2,
    movement: 3,
    special: null,
  },
  {
    suit: "dove",
    number: 3,
    movement: 2,
    special: "foxes",
  },
  {
    suit: "dove",
    number: 4,
    movement: 1,
    special: null,
  },
  {
    suit: "dove",
    number: 5,
    movement: 1,
    special: "gazelle",
  },
  {
    suit: "dove",
    number: 6,
    movement: 2,
    special: null,
  },
  {
    suit: "dove",
    number: 7,
    movement: 0,
    special: "gift",
  },
  {
    suit: "dove",
    number: 8,
    movement: 2,
    special: null,
  },
  {
    suit: "dove",
    number: 9,
    movement: 0,
    special: "royal heir",
  },
  {
    suit: "dove",
    number: 10,
    movement: 3,
    special: null,
  },
  {
    suit: "rose",
    number: 1,
    movement: 0,
    special: "musician",
  },
  {
    suit: "rose",
    number: 2,
    movement: 3,
    special: null,
  },
  {
    suit: "rose",
    number: 3,
    movement: 2,
    special: "foxes",
  },
  {
    suit: "rose",
    number: 4,
    movement: 1,
    special: null,
  },
  {
    suit: "rose",
    number: 5,
    movement: 1,
    special: "gazelle",
  },
  {
    suit: "rose",
    number: 6,
    movement: 2,
    special: null,
  },
  {
    suit: "rose",
    number: 7,
    movement: 0,
    special: "gift",
  },
  {
    suit: "rose",
    number: 8,
    movement: 2,
    special: null,
  },
  {
    suit: "rose",
    number: 9,
    movement: 0,
    special: "royal heir",
  },
  {
    suit: "rose",
    number: 10,
    movement: 3,
    special: null,
  },
  {
    suit: "star",
    number: 1,
    movement: 0,
    special: "musician",
  },
  {
    suit: "star",
    number: 2,
    movement: 3,
    special: null,
  },
  {
    suit: "star",
    number: 3,
    movement: 2,
    special: "foxes",
  },
  {
    suit: "star",
    number: 4,
    movement: 1,
    special: null,
  },
  {
    suit: "star",
    number: 5,
    movement: 1,
    special: "gazelle",
  },
  {
    suit: "star",
    number: 6,
    movement: 2,
    special: null,
  },
  {
    suit: "star",
    number: 7,
    movement: 0,
    special: "gift",
  },
  {
    suit: "star",
    number: 8,
    movement: 2,
    special: null,
  },
  {
    suit: "star",
    number: 9,
    movement: 0,
    special: "royal heir",
  },
  {
    suit: "star",
    number: 10,
    movement: 3,
    special: null,
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  //creating board spaces
  await Promise.all(
    spaces.map((space) => {
      return Space.create(space);
    })
  );

  //creating cards
  await Promise.all(
    cards.map((card) => {
      return Card.create(card);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
