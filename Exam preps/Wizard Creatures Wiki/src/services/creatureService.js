import Creature from "../models/Creatures.js";
import User from "../models/User.js";

const getAll = () => Creature.find();

const create = (creatureData, ownerId) => Creature.create({ ...creatureData, owner: ownerId });

const getOne = (creatureId) => Creature.findById(creatureId);

const getOwner = (ownerId) => User.findById(ownerId);

const vote = async (creatureId, userId) => Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } });

const getUser = (userId) => User.findById(userId);

const remove = (creatureId) => Creature.findByIdAndDelete(creatureId);

const edit = (creatureId, creatureData) => Creature.findByIdAndUpdate(creatureId, creatureData, { runValidators: true });

const getMyPosts = (userId) => Creature.find({ owner: userId });

export default {
    getAll,
    create,
    getOne,
    getOwner,
    vote,
    getUser,
    remove,
    edit,
    getMyPosts
}