const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

require("dotenv").config();

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json"); // Replace with your actual service account key file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Campus Social Network API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/test-firestore", async (req, res) => {
    try {
        const db = admin.firestore();
        const testDoc = await db.collection("test").add({
            message: "Hello from Firestore!",
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        res.send(`Document added with ID: ${testDoc.id}`);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});
