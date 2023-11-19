import { Request, Response, response } from "express";
import { connect } from "../db/database";
import { User } from "../model/user";
import { Follow } from "../model/follow";
import { RowDataPacket } from "mysql2";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function createUser(req: Request, res: Response) {
  let user: User = req.body;
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
  const conn = await connect();

  const newUser = await conn.query("INSERT INTO users SET ?", [user]);
  const token = jwt.sign(
    {
      email: user.email,
      userId: "",
    },
    "asdfg",
    {
      expiresIn: "1d",
    }
  );
  return res.json({
    message: "user created",
    token: token,
    status: 200,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      messsage: "invalid request",
    });
  }
  const conn = await connect();

  const userData = await conn.query("SELECT * FROM users WHERE email=?", [
    email,
  ]);
  const token = jwt.sign(
    {
      email,
      userId: "",
    },
    "asdfg",
    {
      expiresIn: "1d",
    }
  );
  //   let user: User = new User();
  //   user?.password = userData[0].pasword;
  //   if(!bcrypt.compareSync(user?.password, password))
  res.json({
    token: token,
    status: 200,
  });
}

export async function followUser(req: Request, res: Response) {
  const follow: Follow = req.body;
  const conn = await connect();
  const newFollow = await conn.query("INSERT INTO follows SET ?", [follow]);
  res.json({
    message: "user followerd successfully",
    status: 200,
  });
}

export async function unfollowUser(req: Request, res: Response) {
  const follow: Follow = req.body;
  const conn = await connect();
  const newFollow = await conn.query(
    "UPDATE follows SET ? WHERE follower=? && followee=?",
    [follow, follow.follower, follow.followee]
  );
  res.json({
    message: "user unfollowerd successfully",
    status: 200,
  });
}

export async function getFollowees(
  req: Request,
  res: Response
): Promise<Response> {
  const conn = await connect();
  const { userId } = req.query;
  console.log(userId);
  const [rows] = await conn.query("SELECT * FROM follows WHERE follower=?", [
    userId,
  ]);
  const followees = (rows as RowDataPacket[])[0];
  return res.json(followees);
}

export async function getFollowers(
  req: Request,
  res: Response
): Promise<Response> {
  const conn = await connect();
  const { userId } = req.query;

  const [rows] = await conn.query("SELECT * FROM follows WHERE followee=?", [
    userId,
  ]);
  const followers = (rows as RowDataPacket[])[0];
  return res.json(followers);
}
