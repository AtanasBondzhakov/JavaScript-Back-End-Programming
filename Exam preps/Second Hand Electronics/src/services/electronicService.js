import Electronic from "../models/Electronic.js"

export const electronicService = {
    create(electronicData, ownerId) {
        return Electronic.create({ ...electronicData, owner: ownerId });
    },
    getAll() {
        return Electronic.find();
    },
    getOne(electronicId) {
        return Electronic.findById(electronicId);
    },
    buy(electronicId, userId) {
        return Electronic.findByIdAndUpdate(electronicId, { $push: { buyingList: userId } });
    },
    remove(electronicId) {
        return Electronic.findByIdAndDelete(electronicId);
    },
    edit(electronicId, electronicData) {
        return Electronic.findByIdAndUpdate(electronicId, electronicData, { runValidators: true });
    },
    search(query) {
        if (query.searchName) {
            return Electronic.find({ name: { $regex: query.searchName, $options: 'i' } }).lean();
        }

        if (query.searchType) {
            return Electronic.find({ type: { $regex: query.searchType, $options: 'i' } }).lean();
        }
    }
}