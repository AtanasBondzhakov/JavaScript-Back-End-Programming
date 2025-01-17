import Electronic from "../models/Electronic.js"

export const electronicService = {
    create(electronicData, ownerId) {
        return Electronic.create({...electronicData, owner: ownerId});
    }
}