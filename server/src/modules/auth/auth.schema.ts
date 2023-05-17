import { object, string, TypeOf } from 'zod'


export const loginSchema = {
    body: object({
        email: string({
            required_error: "email is requirerd",
        }).email("nat a valid email address"),
        password: string({
            required_error: "passowrd is required",
        }).min(6, "passowrd must be at least 6 characters").max(64, "passowrd must be at most 64 characters"),
    })
}
export type LoginBody = TypeOf<typeof loginSchema.body>