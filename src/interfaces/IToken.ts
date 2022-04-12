import IUser from "./IUser";

interface IToken {
    user: IUser;
    refreshToken: string;
}

export default IToken;
