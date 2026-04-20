const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        console.log("LOGIN EMAIL:", email);

        const user = await User.findOne({ email: email }).exec();
        console.log("FOUND USER:", user);

        if (!user) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        }

        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);