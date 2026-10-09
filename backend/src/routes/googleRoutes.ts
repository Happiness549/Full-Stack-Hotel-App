import { Router } from "express";
import passport from "../config/passport";
import {googleAuthCallback, googleAuthFailure,} from "../controllers/userController";

const router = Router();

// Start Google sign-in
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

// Handle Google's callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/auth/google/failure",
    }),
    googleAuthCallback
);

// Handle failed Google sign-in
router.get("/google/failure", googleAuthFailure);

export default router;