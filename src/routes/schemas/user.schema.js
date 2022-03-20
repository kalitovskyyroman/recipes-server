import { body } from "express-validator";

const schema = [
    body("name").exists(),
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 5 }).not().isNumeric().withMessage("name must be a String"),
];

export { schema as userSchema };
