require('dotenv').config();
const mongoose = require('mongoose');

const listCollections = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to: ${process.env.MONGODB_URI}`);

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        console.log('Collections in database:');
        collections.forEach(col => console.log(`- ${col.name}`));

        process.exit(0);
    } catch (error) {
        console.error('Error listing collections:', error);
        process.exit(1);
    }
};

listCollections();
