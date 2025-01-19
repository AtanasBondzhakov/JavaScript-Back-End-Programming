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
    }
}