import { User ,userModel } from "./user.model";

export async function createUser(user : Omit<User, "comparePassword">) {
    return userModel.create(user);
}
export async function findUserByEmail(email: User['email']) {
    return userModel.findOne({email})
} 
