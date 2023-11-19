import { Router } from "express";
const router = Router();

import {
  getMurmurs,
  getFollowedMurmurs,
  createMurmur,
  deleteMurmur,
  likeMurmur,
} from "../controller/murmur";

router.route("/murmur")
    .post(createMurmur)
    .get(getMurmurs)
    .delete(deleteMurmur);


router.route('/murmur/followed').get(getFollowedMurmurs);
router.route('/murmur/like').post(likeMurmur);

export default router;