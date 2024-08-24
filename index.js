const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(require('cors')());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('/share', (req, res) => {
    const imageurl = req.query.imageUrl;
    const text = req.query.text;
    console.log(req.query); // Fixed: log req.query to view the incoming query parameters

    if (imageurl) {
        // Serve HTML with OG meta tags
        res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta property="og:title" content="Facebook Share" />
        <meta property="og:description" content="${text || ''}" />
        <meta property="og:image" content="${imageurl}" />
        <meta property="og:url" content="https://cure-ten.vercel.app" />
      </head>
      <body>
        <p>Redirecting to product page...</p>
      </body>
      </html>
    `);
    } else {
        res.status(404).send('Product not found');
    }
});

app.post("/sec", async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'perry.pawan@rubicotech.in',
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailoption = {
        from: req.body.email,
        to: 'bpawan277@gmail.com',
        subject: "277PAWAN",
        text: req.body.message,
    };

    transporter.sendMail(mailoption, (error, info) => {
        if (error) {
            console.log("Error: " + error.message);
            return res.status(500).json({ message: "Error sending email" });
        } else {
            console.log("Success: " + info.response);
            return res.status(200).json({ message: "Email Sent Successfully." });
        }
    });
});

app.listen(3002, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("listening on port 3002");
    }
});
