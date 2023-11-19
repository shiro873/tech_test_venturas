import { Request, Response } from "express";
import { connect } from "../db/database";
import { Murmur } from "../model/murmur";
import { Like } from "../model/like";

export async function getMurmurs(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const murmurs = await conn.query('SELECT * FROM murmurs'); 
    return res.json(murmurs[0]);
}

export async function getFollowedMurmurs(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const murmurs = await conn.query('SELECT * FROM murmurs WHERE createdBy IN ?', req.body);
    return res.json(murmurs[0]);
}

export async function createMurmur(req: Request, res: Response) {
    const murmur: Murmur = req.body;
    const conn = await connect();
    const newMurmur = await conn.query('INSERT INTO murmurs SET ?', [murmur]);
    console.log(newMurmur);
    return res.json({
        message: 'Successfully created murmur',
        status: 200
    });
}

export async function deleteMurmur(req: Request, res: Response) {
    const murmurId = req.query?.murmurId;
    const userId = req.query?.userId;

    const conn = await connect();
    await conn.query('DELETE FROM murmurs WHERE id = ? && createdby = ?', [murmurId, userId]);
    return res.json({
        message: 'Murmur Deleted',
        status: 200
    });
}

export async function likeMurmur(req: Request, res: Response) {
    const like: Like = req.body;

    const conn = await connect();
    const newLike = await conn.query('INSERT INTO murmurs SET ?', [like]);
    console.log(newLike);
    return res.json({
        message: 'liked successfully',
        status: 200
    });
}