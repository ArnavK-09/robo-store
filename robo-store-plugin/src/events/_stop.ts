// Imports Required
import mongoose from 'mongoose';

// Closing mongo connection off
export default async () => {
	await mongoose.connection.close();
};
