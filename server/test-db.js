const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('🔌 Connecting to MongoDB Atlas...');
        console.log('📊 Database:', 'talentai');
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected successfully!');
        console.log('📚 Database name:', mongoose.connection.db.databaseName);
        
        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📁 Collections:', collections.map(c => c.name).length || 'None yet');
        
        await mongoose.disconnect();
        console.log('👋 Disconnected');
        console.log('\n🎉 MongoDB is ready for TalentAI!');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('\n💡 Troubleshooting:');
        console.error('   1. Check password is correct');
        console.error('   2. Check IP is whitelisted (152.59.10.102)');
        console.error('   3. Check internet connection');
    }
};

testConnection();