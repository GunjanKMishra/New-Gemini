import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import "dotenv/config"
import cors from "cors";
import bodyParser from "body-parser";
const app = express()

app.use(cors({
    origin: "https://new-gemini-three.vercel.app",
    methods: "GET,POST",
}));
//     preflightContinue: true,
//     optionsSuccessStatus: 200,
//     credentials: true,
//     allowedHeaders: "Content-Type, Accept"

// app.use(cors());

app.options('*', cors()) // include before other routes
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/ask', async (req, res) => {
    const prompt = await req.body['prompt'];
    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        console.log(text);
        res.status(201).json({
            success: true,
            text
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            text: "Something went wrong"
        })
    }
})
// async function run() {
//     const prompt = "what are top 5 travel tips?"
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();
//     console.log(text);
// }

// run();

app.listen(3000, () => {
    console.log("server has started at 3000")
})

// async function run() {
// const result = await model.generateContent([
// "What is in this photo?",
// {inlineData: {data: Buffer.from(fs.readFileSync('path/to/image.png')).toString("base64"),
// mimeType: 'image/png'}}]
// );
// console.log(result.response.text());
// }
// run();