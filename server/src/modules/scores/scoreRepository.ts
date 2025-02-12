import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Scores = {
  id: number;
  user_id: number;
  time_taken: number;
  played_at: string;
};

class ScoreRepository {
  async create(scores: Omit<Scores, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO scores (user_id, time_taken, played_at)
             VALUES (?, ?, ?)`,
      [scores.user_id, scores.time_taken, scores.played_at],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * 
            FROM scores`,
    );
    return rows as Scores[];
  }

  async update(
    id: number,
    user_id: number,
    time_taken: number,
    played_at: string,
  ): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      `UPDATE scores 
          SET time_taken = ?, played_at = ? 
          WHERE id = ?`,
      [time_taken, played_at, id],
    );

    return result.affectedRows;
  }
}

export default new ScoreRepository();
