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
    }
}