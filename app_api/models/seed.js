const mongoose = require('./db');
const Trip = require('./travler');

const fs = require ('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

const seedDB = async () => {
     try {
    // Remove existing records
    await Trip.deleteMany();
    console.log('Existing records deleted.');

    await Trip.insertMany(trips);
     console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

seedDB()
    .then(async () => {
        await Mongoose.connection.close();
        process.exit(0);
 })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
