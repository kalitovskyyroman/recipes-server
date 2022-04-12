import { body } from "express-validator";

const registerSchema = [
    body("name").exists(),
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 5 }),
];

const loginSchema = [body("email").exists().isEmail(), body("password").exists().isLength({ min: 5 })];

export { registerSchema, loginSchema };
