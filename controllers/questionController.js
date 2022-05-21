import db from "../db.js";
import { ObjectId } from "mongodb";

async function questions(req, res) {
    const { type, id } = req.query;

    try {
        if (type === "random") {
            const allQuestions = await db.collection("questions").find({}).toArray();
            const allQuestionsRandom = allQuestions.sort(comparator);

            const findId = await db.collection("questions").findOne({ _id: new ObjectId(id) });

            if (findId._id != allQuestionsRandom[0]._id) {
                res.status(200).send({
                    image: allQuestionsRandom[0].image, id: allQuestionsRandom[0]._id,
                    alternatives: [
                        { name: allQuestionsRandom[0].name, type: allQuestionsRandom[0].type, isCorrect: true },
                        { name: allQuestionsRandom[1].name, type: allQuestionsRandom[1].type, isCorrect: false },
                        { name: allQuestionsRandom[2].name, type: allQuestionsRandom[2].type, isCorrect: false },
                        { name: allQuestionsRandom[3].name, type: allQuestionsRandom[3].type, isCorrect: false }
                    ]
                });
            }
        }

        if (type === "game") {
            const allQuestions = await db.collection("questions").find({}).toArray().sort(comparator).slice(0, 7);
            res.status(200).send(allQuestions);
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

function comparator() {
    return Math.random() - 0.5;
}

export default questions;