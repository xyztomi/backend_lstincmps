const sequelize = require('./config/database');
const User = require('./models/User');
const Item = require('./models/Item');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); 
    console.log("Database synced successfully.");
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();
