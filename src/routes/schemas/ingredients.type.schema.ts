import { body } from "express-validator";

const schema = [
    body("title")
        .trim()
        .not()
        .isEmpty()
        .withMessage("title is required")
        .not()
        .isNumeric()
        .withMessage("title must be a String"),
];

export { schema as typeSchema };
