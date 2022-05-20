import db from "../db.js";
import { ObjectId } from "mongodb";

async function questions(req, res) {
    const { type, id } = req.params; 

    try {
        if (type === "random") {
            const allQuestions = await db.collection("questions").find({}).toArray();
            const allQuestionsRandom = allQuestions.sort(comparator);

            const findId = await db.collection("questions").findOne({ _id: new ObjectId(id) });

            if(findId != allQuestionsRandom[0].image){
                res.status(200).send({
                    image: allQuestionsRandom[0].image,
                    alternatives: [
                        { name: allQuestionsRandom[0].name, isCorrect: true },
                        { name: allQuestionsRandom[1].name, isCorrect: false },
                        { name: allQuestionsRandom[2].name, isCorrect: false },
                        { name: allQuestionsRandom[3].name, isCorrect: false }
                    ]
                });
            }
        }

        if (type === "game") {
            const allQuestions = await db.collection("questions").find({}).toArray();
            res.status(200).send(allQuestions.slice(0,7));
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

export { questions };