import Stone from "../models/Stone.js";

export const stoneService = {
    create(stoneData, ownerId) {
        return Stone.create({...stoneData, owner: ownerId});
    }
}