import initials from "./initials.js";

const router = initials.express.Router();

router.route("/submit").get((req, res)=>{
    if(req.isAuthenticated()){
        res.render("submit");
    }
    else{
        res.redirect("/login");
    }
}).post(async(req, res)=>{
    try{
        await initials.db.query("update users set secret = $1 where email = $2",[req.body.secret, req.user.email]);
        res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
});

export default router;