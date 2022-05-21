import db from "../db.js";

async function ranking(req, res) {
    try {
        const results = await db.collection("ranking").find({}).toArray();

        const sortResults = results.sort((a, b) => {
            if (a.score > b.score) {
                return 1;
            } else if (a.score < b.score) {
                return -1;
            }
            return 0;
        }).reverse().slice(0, Math.min(0, lista.length))
        
        res.status(200).send(sortResults);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export default ranking;