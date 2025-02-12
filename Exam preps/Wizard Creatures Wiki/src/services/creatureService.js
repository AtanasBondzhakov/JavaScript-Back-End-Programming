import Creature from "../models/Creatures.js";

const getAll = () => Creature.find();

const create = (creatureData, ownerId) => {
    return Creature.create({ ...creatureData, owner: ownerId });
}

export default {
    getAll,
    create
}