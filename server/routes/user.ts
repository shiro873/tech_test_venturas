import { Router } from "express";
const router = Router();

import { 
    createUser,
    login,
    followUser,
    getFollowees,
    getFollowers,
    getUsers,
    getUserDetails
 } from "../controller/user";

router.route('/signup').post(createUser);
router.route('/login').post(login);
router.route('/followers').get(getFollowers);
router.route('/followees').get(getFollowees);
router.route('/follow').post(followUser);
router.route('/').get(getUsers);
router.route('/profile').get(getUserDetails);

export default router;