import Creature from "../models/Creatures.js";

const getAll = () => Creature.find();

export default {
    getAll
}