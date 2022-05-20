import db from "../db.js";

async function ranking(req, res) {
    try {
        const results = await db.collection("ranking").find({}).toArray();
        res.status(200).send(results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export default ranking;