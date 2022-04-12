import ITimestamps from "./ITimestamps";
import IRole from "./IRole";

interface IUser extends ITimestamps {
    name: string;
    email: string;
    role: IRole;
    password: string;
}

export default IUser;
