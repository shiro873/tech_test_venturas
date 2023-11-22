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
  const existUserResult = await conn.query(
    "SELECT * FROM users WHERE email = ?",
    [user.email]
  );
  const existUserRow: any = existUserResult as RowDataPacket[];
  // console.log('exist user', existUserRow[0]);

  if (existUserRow[0].length > 0) {
    return res.json({
      message: "user already registered",
      status: 401,
    });
  }

  const newUserRow = await conn.query("INSERT INTO users SET ?", [user]);
  let newUser: any = newUserRow as RowDataPacket[];
  // console.log('new user', row[0].insertId);
  let userRows = await conn.query("SELECT * FROM users WHERE id != ?", [
    newUser[0].insertId,
  ]);
  let userList = userRows as RowDataPacket[];
  // console.log('users list ', userList[0]);
  userList[0].map(async (it: User) => {
    await conn.query(
      "INSERT INTO follows (follower, followee, status) VALUES (?, ?, ?)",
      [newUser[0].insertId, it.id, false]
    );
    await conn.query(
      "INSERT INTO follows (follower, followee, status) VALUES (?, ?, ?)",
      [it.id, newUser[0].insertId, false]
    );
  });

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
  console.log("inside follow");

  const follow: any = req.body;
  console.log(follow);
  const conn = await connect();
  // let userFollowResult = await conn.query('SELECT * FROM follows WHERE id=?', [follow.data.id])
  // let userFollowRow = userFollowResult as RowDataPacket[];

  let newFollow = await conn.query("UPDATE follows SET status=? WHERE id=?", [
    follow.data.status,
    follow.data.id,
  ]);
  // console.log('newFollow', newFollow, follow.data.id);

  res.json({
    successful: true,
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

  const [rows] = await conn.query("SELECT * FROM follows WHERE follower=?", [
    userId,
  ]);
  const followers = (rows as RowDataPacket[])[0];
  return res.json(followers);
}

export async function getUsers(req: Request, res: Response): Promise<Response> {
  const conn = await connect();
  const { userId } = req.query;
  // console.log(userId);
  const [rows] = await conn.query(
    "SELECT u.id, u.username, u.email, u.fullName, f.status, f.id as followId FROM test.users u JOIN test.follows f ON u.id = f.followee WHERE f.follower=?",
    [userId]
  );
  const followers = rows as RowDataPacket[];
  console.log(followers);
  return res.json(followers);
}
