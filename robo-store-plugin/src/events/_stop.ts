// Imports Required
import mongoose from 'mongoose';

// Clossing mongo connection off
export default async () => {
	await mongoose.connection.close();
};
