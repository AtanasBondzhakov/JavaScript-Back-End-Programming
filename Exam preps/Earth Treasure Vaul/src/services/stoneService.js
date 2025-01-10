import Stone from "../models/Stone.js";

export const stoneService = {
    create(stoneData, ownerId) {
        return Stone.create({ ...stoneData, owner: ownerId });
    },
    getAll() {
        return Stone.find();
    },
    getOne(stoneId) {
        return Stone.findById(stoneId);
    },
    remove(stoneId) {
        return Stone.findByIdAndDelete(stoneId);
    },
    edit(stoneId, stoneData) {
        return Stone.findByIdAndUpdate(stoneId, stoneData);
    },
    lastThree() {
        return Stone.find().sort({ createdAt: -1 }).limit(3);
    },
    like(stoneId, userId) {
        return Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });
    }
}