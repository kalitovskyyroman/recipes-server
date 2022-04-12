import { body } from "express-validator";

const schema = [
    body("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("name is required")
        .not()
        .isNumeric()
        .withMessage("name must be a String"),
];

export { schema as roleSchema };
