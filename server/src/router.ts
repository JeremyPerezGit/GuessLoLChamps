import express from "express";

const router = express.Router();

// Users-related routes
import usersActions from "./modules/users/userActions";

router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.put("/api/users/:id", usersActions.edit);
router.post("/api/users", usersActions.add);
router.delete("/api/users/:id", usersActions.destroy);

/* ************************************************************************* */

// Scores-related routes
import scoreActions from "./modules/scores/scoreActions";

router.get("/api/score", scoreActions.browse);
router.put("/api/score/:id", scoreActions.edit);
router.post("/api/score", scoreActions.add);

/* ************************************************************************* */

// Champions-related routes
import championActions from "./modules/champions/championActions";

router.get("/api/champion", championActions.browse);
router.put("/api/champion/:id", championActions.edit);
router.post("/api/champion", championActions.add);
router.post("/api/champion/:id", championActions.add);

/* ************************************************************************* */

export default router;
