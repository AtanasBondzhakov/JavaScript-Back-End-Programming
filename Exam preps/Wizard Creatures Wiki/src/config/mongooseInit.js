import { connect } from "mongoose";

const dbUrl = 'mongodb://localhost:27017';

export default async function mongooseInit() {
    try {
        // TODO change dbName
        await connect(dbUrl, {dbName: 'volcanoes'});
        console.log('Successfully connected to DB!');
    } catch (error) {
        console.log('Cannot connect to DB!' + error.message);
    }
}