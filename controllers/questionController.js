import db from "../db.js";

async function questions(req, res) {
    const { type } = req.query;

    try {
        if (type === "random") {
            const allQuestions = await db.collection("questions").find({}).toArray();
            let allQuestionsRandom = allQuestions.sort(comparator);

            allQuestionsRandom = allQuestionsRandom.filter(question => question.type === allQuestionsRandom[0].type);

            console.log("ALLQUESTIONFILTER", allQuestionsRandom);

            res.status(200).send({
                image: allQuestionsRandom[0].url, id: allQuestionsRandom[0]._id,
                alternatives: [
                    { name: allQuestionsRandom[0].name, type: allQuestionsRandom[0].type, isCorrect: true },
                    { name: allQuestionsRandom[1].name, type: allQuestionsRandom[1].type, isCorrect: false },
                    { name: allQuestionsRandom[2].name, type: allQuestionsRandom[2].type, isCorrect: false },
                    { name: allQuestionsRandom[3].name, type: allQuestionsRandom[3].type, isCorrect: false }
                ]
            });
        }

        if (type === "game") {
            const allQuestions = await db.collection("questions").find({}).toArray();



            let allQuestionsSorted = allQuestions.sort(comparator).slice(0, 7)
            let arrAllQuestionsSorted = allQuestionsSorted.map(item => {
                let allWrongAnswers = allQuestions.filter(item2 => item2.type === item.type).sort(comparator).slice(0, 3);

                return {
                    ...item, alternatives: [
                        { name: allQuestionsSorted[0].name, type: allQuestionsSorted[0].type, isCorrect: true },
                        { name: allWrongAnswers[0].name, type: allWrongAnswers[0].type, isCorrect: false },
                        { name: allWrongAnswers[1].name, type: allWrongAnswers[1].type, isCorrect: false },
                        { name: allWrongAnswers[2].name, type: allWrongAnswers[2].type, isCorrect: false }
                    ]
                }
            })

            res.status(200).send(arrAllQuestionsSorted);
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