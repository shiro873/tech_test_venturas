import { Router } from "express";
const router = Router();

import { 
    createUser,
    login,
    followUser,
    unfollowUser,
    getFollowees,
    getFollowers
 } from "../controller/user";

router.route('/signup').post(createUser);
router.route('/login').post(login);
router.route('/followers').get(getFollowers);
router.route('/followees').get(getFollowers);
router.route('/follow').post(followUser);
router.route('/unfollow').put(unfollowUser);

export default router;