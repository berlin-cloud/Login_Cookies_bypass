import initials from "./routes/initials.js";
import login from "./routes/login.js";
import submit from "./routes/secret.js";

initials.app.use("/", login);
initials.app.use("/secrets", submit);

initials.passport.use(
  "local",
  new initials.LocalStrategy({ usernameField: "Email" }, async function verify(
    email,
    password,
    cb,
  ) {
    try {
      const result = await initials.db.query(
        "select * from users where email = $1",
        [email],
      );
      const user = result.rows;
      if (user.length > 0) {
        const passhash = await initials.bcrypt.compare(
          password,
          user[0].password,
        );
        if (passhash) {
          return cb(null, user[0]);
        } else {
          return cb(null, false);
        }
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err);
    }
  }),
);

initials.passport.use(
  "google",
  new initials.GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, cb) {
      try{
        const result1 = await initials.db.query("select * from users where email = $1", [profile.email]);
        const user1 = result1.rows;
        if(user1.length === 0){
          const result2 = await initials.db.query("insert into users(email, password) values ($1, $2) returning *;", [profile.email, "google"]);
          const user2 = result2.rows;
          cb(null, user2[0]);
        }
        else{
          cb(null, user1[0]);
        }
      }
      catch(err){
        cb(err);
      }
    },
  ),
);

initials.passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

initials.passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

initials.app.listen(initials.port, () => {
  console.log(`The port ${initials.port} is running`);
});
