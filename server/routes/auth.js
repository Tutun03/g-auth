const router=require("express").Router();
const passport=require("passport");

router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message: "Sucessfully loged in",
            user: req.user,
        });
    }
    else{
        res.status(403).json({error:true,message:"Not Authorized"});
    }
});

router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message: "login failure",
    })
})

router.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect:"/poc",
        failureRedirect:"/login/failed",
    })
)




router.get("/google",passport.authenticate("google",["profile","email"]));

// router.get("/logout", (req, res) => {
//     req.logout(() => {}); // Provide an empty callback function
//     req.session.destroy(); // Destroy the session
//     res.redirect(process.env.CLIENT_URL);
// });
// router.get("/logout", (req, res) => {
//     req.logout(() => {}); // Provide an empty callback function
//     // req.session.destroy(); // Destroy the session
//     res.redirect(process.env.CLIENT_URL);
// });
router.get("/logout", async (req, res) => {

 try{
        req.logout( function(err){
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: err.message,
                });
            }
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err.message);
                    return res.status(500).json({
                        error: true,
                        message: "Error logging out",
                    });
                }
                
                return res.json({status:true, message:"Successfully logout"})
                res.redirect('/'); // Redirect the user after logout
            });
        })
 }catch(err){
    return req.json({status:false, message: err.message})
 }
   
    // req.logout(function(err) {
    //     if (err) {
    //         console.log("Error logout", err.message);
    //         return next(err); }
    //     req.session.destroy((err) => {
    //         if (err) {
    //             console.error("Error destroying session:", err);
    //             return res.status(500).json({
    //                 error: true,
    //                 message: "Error logging out",
    //             });
    //         }
    //         res.redirect('/'); // Redirect the user after logout
    //     });
    //   }); // Logout the user
    
});



module.exports=router;