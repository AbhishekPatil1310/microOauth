import express from "express";
import passport from "passport";
import {googleCallback } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { session: false }), googleCallback);

export default router;
