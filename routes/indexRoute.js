const express = require("express")
const router = express.Router();
const {homepage , signup , signin, signout, follower, unfollower, createPost, DeletePost, like, unlike, comment, postDetails, postedDatabySingleUser} = require("../controller/indexController");
const { isLoggedIn } = require("../utils/auth");

// get /api/user to get users data
router.get("/api/user", isLoggedIn  , homepage)


// CREATE USER / SIGNUp

//post  /signup create user 

router.post("/signup" , signup)


//post   /api/authenticate for login a user 

router.post("/api/authenticate" , signin)

//post  /logout user 

router.get("/signout" , isLoggedIn , signout)


// follow user 

router.post("/api/follow/:id" , isLoggedIn , follower)

// unfollow user
 
router.post("/api/unfollow/:id" , isLoggedIn , unfollower)

// creating posts 

router.post("/api/posts" , isLoggedIn , createPost)

// delete post 

router.delete("/api/posts/:id" , isLoggedIn , DeletePost)

// like 

router.post("/api/like/:id" , isLoggedIn , like)


//unlike 

router.post("/api/unlike/:id" , isLoggedIn , unlike)

//comment
router.post("/api/comment/:id" , isLoggedIn , comment)


// get api for getting details for single post 
router.get("/api/posts/:id" ,  postDetails)


router.get("/api/all_posts" , isLoggedIn , postedDatabySingleUser)

module.exports = router;
