import { Request, Response } from "express";
import { connect } from "../db/database";
import { Murmur } from "../model/murmur";
import { Like } from "../model/like";
import { RowDataPacket } from "mysql2";

export async function getMurmurs(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.query;
  const conn = await connect();
  console.log("id", req.query);
  const rows = await conn.query(
    `
    SELECT m.id, m.content, u.username, u.fullName, m.createdAt, COUNT(l.userId) as likes FROM test.follows f 
    INNER JOIN test.murmurs m ON m.createdBy = f.followee
    INNER JOIN test.users u ON u.id = m.createdBy
    LEFT JOIN test.likes l ON l.murmurId = m.id
    WHERE f.follower = ?
    GROUP BY m.id
    `,
    [id]
  );
  const murmurs = (rows as RowDataPacket[])[0];
  // console.log("murmurs", murmurs);
  return res.json(murmurs);
}

export async function getFollowedMurmurs(req: Request, res: Response) {
  const conn = await connect();
  const rows = await conn.query(
    "SELECT * FROM murmurs WHERE createdBy IN ?",
    req.body
  );
  const murmurs = (rows as RowDataPacket[])[0];
  return res.json(murmurs);
}

export async function createMurmur(req: Request, res: Response) {
  const murmur: Murmur = req.body;
  const conn = await connect();
  const newMurmur = await conn.query("INSERT INTO murmurs (content, createdBy, createdAt) VALUES (?, ?, SYSDATE())", [murmur.content, murmur.createdBy]);
  // console.log(newMurmur);
  return res.json({
    message: "Successfully created murmur",
    status: 200,
  });
}

export async function deleteMurmur(req: Request, res: Response) {
  const murmurId = req.query?.murmurId;
  // const userId = req.query?.userId;
  console.log(murmurId);
  const conn = await connect();
  await conn.query("DELETE FROM murmurs WHERE id = ?", [
    murmurId,
  ]);
  return res.json({
    message: "Murmur Deleted",
    status: 200,
  });
}

export async function likeMurmur(req: Request, res: Response) {
  const like: Like = req.body;

  const conn = await connect();
  const newLike = await conn.query("INSERT INTO likes SET ?", [like]);
  console.log(newLike);
  return res.json({
    message: "liked successfully",
    status: 200,
  });
}

export async function getUserMurmurs(
  req: Request,
  res: Response
): Promise<Response> {
  const { userId } = req.query;
  const conn = await connect();
  console.log("id", req.query);
  const rows = await conn.query(
    `
    SELECT m.id, m.content, u.username, u.fullName, m.createdAt, COUNT(l.userId) as likes FROM test.follows f 
    INNER JOIN test.murmurs m ON m.createdBy = f.followee
    INNER JOIN test.users u ON u.id = m.createdBy
    LEFT JOIN test.likes l ON l.murmurId = m.id
    WHERE u.id = ?
    GROUP BY m.id
    `,
    [userId]
  );
  const murmurs = (rows as RowDataPacket[])[0];
  // console.log("user murmurs", murmurs);
  return res.json(murmurs);
}
