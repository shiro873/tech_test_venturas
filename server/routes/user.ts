import { Router } from "express";
const router = Router();

import { 
    createUser,
    login,
    followUser,
    unfollowUser,
    getFollowees,
    getFollowers,
    getUsers
 } from "../controller/user";

router.route('/signup').post(createUser);
router.route('/login').post(login);
router.route('/followers').get(getFollowers);
router.route('/followees').get(getFollowees);
router.route('/follow').post(followUser);
router.route('/unfollow').put(unfollowUser);
router.route('/').get(getUsers);

export default router;