import { Router } from "express";
const router = Router();

import {
  getMurmurs,
  getFollowedMurmurs,
  createMurmur,
  deleteMurmur,
  likeMurmur,
  getUserMurmurs
} from "../controller/murmur";

router.route("/")
    .post(createMurmur)
    .get(getMurmurs)
    .delete(deleteMurmur);


router.route('/followed').get(getFollowedMurmurs);
router.route('/like').post(likeMurmur);
router.route('/user').get(getUserMurmurs);

export default router;