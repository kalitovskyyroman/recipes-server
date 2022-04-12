import User from "../models/Users/User";

const getUsers = async () => {
    const users = await User.find();
    return users;
};

export { getUsers };
