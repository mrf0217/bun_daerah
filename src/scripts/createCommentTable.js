// src/scripts/createCommentTable.js
import { sequelize, Comment } from '../models/index.js';

const createCommentTable = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Create the comment table
    await Comment.sync({ force: false });
    console.log('✅ comment table created/verified successfully');

    // Test insert
    const testComment = await Comment.create({
      content: 'This is a test comment for JMeter testing',
      author: 'Test User',
      email: 'test@example.com',
      status: 'pending'
    });
    
    console.log('✅ Test comment inserted:', testComment.id);
    
    // Clean up test data
    await testComment.destroy();
    console.log('✅ Test comment cleaned up');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.name === 'SequelizeConnectionError') {
      console.error('Database connection failed. Check your .env file:');
      console.error('- DB_HOST, DB_NAME, DB_USER, DB_PASS');
    }
  } finally {
    await sequelize.close();
  }
};

createCommentTable();

