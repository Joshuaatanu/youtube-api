import { Request, Response } from "express"
import { findUserByEmail } from "../user/user.service"
import { StatusCodes } from "http-status-codes"
import { signJWT } from "./auth.utils"
import omit from "../../helpers/omit"
import { LoginBody } from "./auth.schema"

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body

    // find user by email
    const user = await findUserByEmail(email)
    //  check user exist - return error 
    if (!user || !user.comparePassword(password)) {
        return res.status(StatusCodes.UNAUTHORIZED)
            .send("Invalid email password")
    }
    const payload = omit(user.toJSON(), ['password', '_v'])
    const jwt = signJWT(payload)
    res.cookie('accessToken', jwt, {
        maxAge: 3.154e10, // one year
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: "strict",
        secure: false
    })
    return res.status(StatusCodes.OK).send(jwt)
    //  verify user password
    //  if  wrong password
    // sign jwt 
    // add cookie 
    //  respond 
}