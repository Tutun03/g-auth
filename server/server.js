require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");//Import express-session
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const peopleSchema = require("./mongodb")


const app = express();
const port = process.env.PORT || 8080;

// Use express-session middleware
app.use(
    session({
        secret: "cyberwolve",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 //Set the maxAge in milliseconds
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.get("/po", (req, res) => {
    res.json({ "kjdfghf": "dfokghiug" });
    console.log("nhgjub");
});
app.get("/poc", (req, res) => {
    res.send(`<h1>${req.user.displayName}</h1>
    <img src=${req.user.photos[0].value}>
    `);

    // console.log(req.user);
    const data = {
        name: req.user.displayName,
        email: req.user.emails[0].value
    }
    console.log(data);
    const checking=peopleSchema.findOne({name:req.user.displayName})
    // if (checking) {
    //     res.send("user details already exists")
    // }
    // else{
         peopleSchema.insertMany([data])

    // }

});

//   app.get("/logout", (req, res) => {
//     req.logout(() => {}); // Provide an empty callback function
//     req.session.destroy(); // Destroy the session
//     res.redirect(process.env.CLIENT_URL);
// });

app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
