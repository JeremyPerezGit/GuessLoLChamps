import type { RequestHandler } from "express";
import scoreRepository from "./scoreRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const score = await scoreRepository.readAll();

    res.json(score);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newScore = {
      id: Number(req.params.id),
      user_id: req.body.user_id,
      time_taken: req.body.time_taken,
      played_at: req.body.played_at,
    };

    const insertId = await scoreRepository.create(newScore.user_id);

    res.status(204).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const score = {
      id: Number(req.params.id),
      user_id: req.body.user_id,
      time_taken: req.body.time_taken,
      played_at: req.body.played_at,
    };

    const affectedRows = await scoreRepository.update(
      score.id,
      score.user_id,
      score.time_taken,
      score.played_at,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, edit };
