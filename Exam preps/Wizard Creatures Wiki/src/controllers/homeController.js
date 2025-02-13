import { Router } from "express";
import { isAuth } from "../middlewares/authMIddleware.js";
import creatureService from "../services/creatureService.js";

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/my-posts', isAuth, async (req, res) => {

    try {
        const posts = await creatureService.getMyPosts(req.user?._id).lean();
        const owner = await creatureService.getOwner(req.user?._id);

        console.log(owner);

        res.render('home/my-posts', {
            title: 'My Posts',
            posts,
            owner
        });
    } catch (err) {
        console.log(err);
    }
})

export default homeController;