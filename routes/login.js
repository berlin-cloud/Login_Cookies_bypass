import initials from "./initials.js";

const router = initials.express.Router();

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    initials.passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    }),
  );

router.route("/").get(async(req, res) => {
  if (req.isAuthenticated()) {
    const data = await initials.db.query("select secret from users where email = $1", [req.user.email]);
    const user = data.rows;
    console.log(user);
    if(user[0].secret){
      res.render("secrets", {data: user[0].secret});
    }
    else{
      res.render("secrets", {data: "Please provide your secret"});
    }
    
  } else {
    res.redirect("/registration");
  }
});

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(async (req, res, next) => {
    try {
      const result1 = await initials.db.query(
        "select * from users where email = $1",
        [req.body.Email],
      );
      const user = result1.rows;
      if (user.length > 0) {
        res.redirect("/login");
      } else {
        const hashing = await initials.bcrypt.hash(
          req.body.password,
          initials.saltRounds,
        );
        const result2 = await initials.db.query(
          "insert into users(email, password) values ($1, $2) returning *;",
          [req.body.Email, hashing],
        );
        const user1 = result2.rows;
        req.login(user1[0], function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

router.get("/registration", (req, res) => {
  res.render("index");
});

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get('/auth/google',
  initials.passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/auth/google/secrets',
    initials.passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/signup'
}));

export default router;
