require('dotenv').config();
const connectDB = require('./config/db');

const testConnection = async () => {
    console.log('Testing MongoDB connection...');
    console.log(`URI: ${process.env.MONGODB_URI}`);

    try {
        await connectDB();
        console.log('SUCCESS: MongoDB connection test passed!');
        process.exit(0);
    } catch (error) {
        console.error('FAILURE: MongoDB connection test failed.');
        console.error(error);
        process.exit(1);
    }
};

testConnection();
