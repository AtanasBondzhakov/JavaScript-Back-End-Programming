import { Router } from "express";
import creatureService from "../services/creatureService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMIddleware.js";

const creatureController = Router();

creatureController.get('/all-posts', async (req, res) => {
    try {
        const creatures = await creatureService.getAll().lean();

        res.render('creatures/all-posts', { title: 'Catalog Page', creatures });
    } catch (err) {
        res.render('creatures/all-posts', { title: 'Catalog Page', error: getErrorMessage(err) });
    }
});

creatureController.get('/create', isAuth, (req, res) => {
    res.render('creatures/create', { title: 'Create Page' });
});

creatureController.post('/create', isAuth, async (req, res) => {
    const creatureData = req.body;
    const ownerId = req.user?._id;

    try {
        await creatureService.create(creatureData, ownerId);

        res.redirect('/creatures/all-posts');
    } catch (err) {
        res.render('creatures/create', { title: 'Create Page', error: getErrorMessage(err), creature: creatureData });
    }
});

creatureController.get('/:creatureId/details', async (req, res) => {
    const creatureId = req.params.creatureId;

    try {
        const creature = await creatureService.getOne(creatureId).lean();
        const owner = await creatureService.getOwner(creature.owner);

        const isOwner = req.user?._id == creature.owner;
        const hasVoted = creature.votes.some(user => user._id == req.user?._id);

        const votesList = await Promise.all(creature.votes.map(async userId => {
            const user = await creatureService.getUser(userId);
            return user.email;
        }))

        res.render('creatures/details', {
            title: 'Details Page',
            creature,
            owner: `${owner.firstName} ${owner.lastName}`,
            isOwner,
            hasVoted,
            votesList: votesList.join(', '),
            votesCount: votesList.length
        });
    } catch (err) {
        res.render('creatures/all-posts', { title: 'Catalog Page', error: getErrorMessage(err) });
    }
});

creatureController.get('/:creatureId/vote-up', isAuth, async (req, res) => {
    const creatureId = req.params.creatureId;
    const userId = req.user?._id;

    try {
        await creatureService.vote(creatureId, userId);

        res.redirect(`/creatures/${creatureId}/details`);
    } catch (err) {
        res.render('creatures/all-posts', { title: 'Catalog Page', error: getErrorMessage(err) });
    }
});

async function isCreator(req, res, next) {
    const creature = await creatureService.getOne(req.params.creatureId);
    if(creature.owner == req.user?._id) {
        return next();
    } 

    res.redirect('/404');
}

export default creatureController;