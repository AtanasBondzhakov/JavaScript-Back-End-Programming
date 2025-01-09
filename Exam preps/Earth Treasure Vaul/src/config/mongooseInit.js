import { connect } from "mongoose";

const dbUrl = 'mongodb://127.0.0.1:27017';

export default async function mongooseInit() {
    try {
        await connect(dbUrl, { dbName: 'earth-treasures' });
        console.log('Successfully connected to DB!');
    } catch (err) {
        console.log('Cannot connect to DB!' + err.message);
    }
}