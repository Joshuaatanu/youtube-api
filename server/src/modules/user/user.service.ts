import { userModel } from "./user.model";

export async function createUser(user){
    return userModel.create(user);
}