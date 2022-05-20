import db from "../db.js";
import Joi from "joi";

async function validateName(req, res) {
    const { name, score } = req.body;
    const nameSchema = Joi.object({
        name: Joi.string().required(),
    });

    const { error } = nameSchema.validate(req.body, { abortEarly: false });

    if (error) {
        res.status(422).send(error.details.map((detail) => detail.message));
        return;
    }

    try {
        await db.collection("ranking").insertOne({ name: name, score: score });
        res.status(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export default validateName;