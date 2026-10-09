import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {findUserByGoogleId,findUserByEmail,createGoogleUser,} from "../services/userService";



passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(null, false);
                }

                const google_id = profile.id;
                const name = profile.name?.givenName || profile.displayName;
                const surname = profile.name?.familyName || null;
                const profile_image = profile.photos?.[0]?.value || null;

                let user = await findUserByGoogleId(google_id);

                if (!user) {
                    user = await findUserByEmail(email);

                    if (user) {
                        return done(
                            new Error(
                                "An account with this email already exists. Please sign in using your existing login method."
                            ),
                            undefined
                        );
                    }

                    user = await createGoogleUser(
                        google_id,
                        email,
                        name,
                        surname,
                        profile_image
                    );
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

export default passport;