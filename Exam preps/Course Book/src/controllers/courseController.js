import { Router } from "express";

import { isAuth } from "../middlewares/authMIddleware.js";
import { courseService } from "../services/courseService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const courseController = Router();

courseController.get('/create', isAuth, (req, res) => {
    res.render('courses/create', { title: 'Create Page' });
});

courseController.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;
    const ownerId = req.user?._id;

    try {
        await courseService.create(courseData, ownerId);

        res.redirect('/courses/all-courses');
    } catch (err) {
        res.render('courses/create', { title: 'Create Page', error: getErrorMessage(err) });
    }
});

courseController.get('/all-courses', async (req, res) => {
    const courses = await courseService.getAll().lean();

    res.render('courses/catalog', { title: 'Catalog Page', courses });
});

courseController.get('/:courseId/details', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await courseService.getOne(courseId).lean();
    const owner = await courseService.getOwner(course.owner);

    const isOwner = req.user?._id == course.owner;
    const isSignedUp = course.signUpList.some(user => user._id == req.user?._id);
    
    const signedList = await Promise.all(course.signUpList.map(async userId => {
        const user = await courseService.getUser(userId);
        return user.username;
    }));


    res.render('courses/details', {
        title: 'Details Page',
        course,
        owner: owner.email,
        isOwner,
        isSignedUp,
        signedList: signedList.join(', ')
    });
});

courseController.get('/:courseId/sign-up', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user?._id

    await courseService.signUp(courseId, userId);

    res.redirect(`/courses/${courseId}/details`);
})


export default courseController;