import { connect } from "mongoose";

const dbUrl = 'mongodb://127.0.0.1:27017';

export default async function mongooseInit() {
    try {
        await connect(dbUrl, {dbName: 'electronics'});
        console.log('Successfully connected to DB!');
    } catch (error) {
        console.log('Cannot connect to DB!' + error.message);
    }
}