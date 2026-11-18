import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import multer from "multer"


dotenv.config();

const app = express();

app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: "GET, POST"
    }
));

app.use(express.json());


//schema

const UserSchema = new mongoose.Schema({
    user: String,
    email: String,
    imageUrl: String
});
const User = mongoose.model("User", UserSchema);

// cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// multer setup
const upload = multer ({ dest: "uploads/ "});

// api upload data + image
app.post("/api/users", upload.single("image"), async (req, res) =>{             //single image sava ka liya
// app.post("/api/users", upload.array("images", 5), async (req, res) => {}     //multiplle image

    try {
        const { name, email } = req.body;
        const file = req.file;

        const result = await cloudinary.uploader.upload(file.path, { folder: "users" })

        const user = new User({
            name, email, imageUrl: result.secure_url,
        });

        await user.save();
        res.json(user);

    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "upload failed" });
    }
});

app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

import router from './graphQL/graphQL.js'
app.use("/api/test", router)


//Db connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("mongoDB connected"))
    .catch((error) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`);
});