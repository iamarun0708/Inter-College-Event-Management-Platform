require('dotenv').config();
const connectDB = require('./config/db');
const CampusEventHub = require('./models/CampusEventHub.model');

const verifyCollection = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB.');

        // Create a sample record to ensure the collection is created
        const sampleRecord = new CampusEventHub({
            projectName: 'Campus Event Hub',
            description: 'Initial project setup record.',
            version: '1.0.0',
            status: 'active'
        });

        await sampleRecord.save();
        console.log('SUCCESS: Sample record saved to CampusEventHub collection.');

        const found = await CampusEventHub.findOne({ projectName: 'Campus Event Hub' });
        console.log('Verification: Found document:', found);

        process.exit(0);
    } catch (error) {
        console.error('FAILURE: Verification failed.');
        console.error(error);
        process.exit(1);
    }
};

verifyCollection();
