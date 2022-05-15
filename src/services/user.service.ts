import { getUserDto } from '../dtos/user.dto';
import ApiError from '../exceptions/api.errors';
import Role from '../models/Users/Role';
import User from '../models/Users/User';

const getUsers = async () => {
    const users = await User.find();

    const usersWithRole = await Promise.all(
        users.map(async (user) => {
            const role = await Role.findById(user.role._id);

            if (!role) {
                throw ApiError.NotFound('Role not found');
            }

            user.role = role;

            return user;
        })
    );

    return usersWithRole.map((user) => getUserDto(user));
};

export { getUsers };
