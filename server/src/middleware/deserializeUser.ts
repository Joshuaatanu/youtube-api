import { Request, Response, NextFunction } from "express"
import { verifyJWT } from "../modules/auth/auth.utils"

function deserializeUser(req: Request, res: Response, next: NextFunction) {


    const accessToken = (req.headers.authorization || req.cookies.accessToken || "").replace(/^Bearer\s/, "")

    if (!accessToken) {
        return next()
    }
    const decoaded = verifyJWT(accessToken)
    if (decoaded) {
        res.locals.user = decoaded
    }
    return next()
}


export default deserializeUser