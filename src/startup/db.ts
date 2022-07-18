import mongoose from 'mongoose'
require('dotenv').config();

export const dbConnect = () => {
	try {
		console.log('Waiting for db to connect...');
		mongoose.connect(process.env.DB_CONN_STRING as string);
		console.log('DB is connected!');
	} catch (error) {
		console.clear();
		console.error(`Some error while connection to db ${error}`);
	}
};
