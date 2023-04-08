const User = require("../models/userModel")
const Posts = require("../models/postsModel")
const Comment = require("../models/commentModel")
const { sendToken } = require("../utils/auth")



exports.homepage = (req, res, next) => {
    res.json({ name: req.user.name, followers: req.user.follower.length, following: req.user.following.length })
}

exports.signup = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email }).select("+password").exec()
        if (user) {
            return res.status(501).json({ message: "user exists" })
        }
        const newUser = new User(req.body);
        user = await newUser.save()
        // res.json(user)
        sendToken(user, req, res, 200);

    } catch (error) {
        res.status(501).json({ message: error.message })
    }
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email }).select("+password").exec()
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        const matchpassword = user.comparepassword(password);

        if (!matchpassword) {
            return res.status(500).json({ message: "wrong credients" })
        }

        sendToken(user, req, res, 200);
    } catch (error) {
        res.status(501).json({ message: error.message })
    }
}

exports.currentuser = (req, res) => {
    res.status(200).json({ user: req.user })
}

exports.signout = async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "log out successfully" })
}


exports.follower = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findById(id).exec();
        if (!req.user.following.includes(id)) {
            req.user.following.push(id);
            await req.user.save();
            
            data.follower.push(req.user._id)
            await data.save();
            
            res.status(200).json("now you are following " + data.name)
        }
        else {
            res.json("already  followed")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}


exports.unfollower = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const data = await User.findById(id).exec();
        if (req.user.following.includes(id)) {
            req.user.following.splice(req.user.following.indexOf(id), 1);
            await req.user.save();
            
            data.follower.splice(data.follower.indexOf(req.user._id), 1);
            await data.save();
            
            res.status(200).json("you unfollwed " + data.name)

        }
        else {
            res.json("first  follow for unfollow")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}



exports.createPost = async (req, res, next) => {
    try {
        const posts = new Posts({ ...req.body, author: req.user._id })
        await posts.save()
        
        req.user.posts.push(posts._id);
        await req.user.save();
        res.status(200).json({ PostID: posts._id, Title: posts.Title, Description: posts.Description, CreatedTime: posts.createdAt })
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.DeletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        req.user.post.splice(req.user.post.indexOf(id) , 1)
        
        await Posts.findByIdAndDelete(id).exec();
        
        res.status(200).json("Post Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.like = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const data = await Posts.findById(id).exec();
        // 
        if (data.like.includes(req.user._id) === false) {
            data.like.push(req.user._id);
            await data.save();
            res.status(200).json("already liked")
        }
        else {
            res.json("first unliked")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}




exports.unlike = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const data = await Posts.findById(id).exec();
        if (data.like.includes(req.user._id) === true) {
            data.like.splice(data.like.indexOf(req.user._id) , 1);
            await data.save();
            res.status(200).json("unlinked")
        }
        else {
            res.status(200).json("already unlinked")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.comment = async (req, res , next ) => 
{
    try {
        const comment = new Comment({ ...req.body, author: req.user._id })
        await comment.save()
        const id = req.params.id;
        
        const data = await Posts.findById(id).exec();
        data.comment.push(comment._id)
        await data.save();
        res.status(200).json(comment._id)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.postDetails = async (req , res , next) => 
{
    try {
        const id = req.params.id;
        const postdetails = await Posts.findById(id).populate("like").populate("comment").exec();
        res.status(200).json({Details : postdetails , likes :  postdetails.like.length , Comments : postdetails.comment.length})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.postedDatabySingleUser = async (req , res , next) =>
{
    try {
        const {posts} = await  User.findById(req.user._id).populate("posts")
        res.status(200).json({posts})

    } catch (error) {
        res.status(500).json(error)
    }
}