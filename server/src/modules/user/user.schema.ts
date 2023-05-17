import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: "username is required"
        }),
        email: string({
            required_error: "email is required"
        }),
        password: string({
            required_error: "password is required"
        }).min(6, " password must be at least 6 characters long").max(64, "password is too long"),
        confirmPassword: string({
            required_error: "confirm password  is required"
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "passwords do not match",
        path: ["confirmPassword"],
    }),
};

export type registerUserBody = TypeOf<typeof registerUserSchema.body>;