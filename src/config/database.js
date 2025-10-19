import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://korucuoglu:<db_password>@cluster0.dtzfu.mongodb.net/bistify?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
