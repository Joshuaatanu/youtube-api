import express, { Router } from "express"
import { registerUserHandler } from "./user.controller"
import { processRequestBody } from "zod-express-middleware"
import { registerUserSchema } from "./user.schema"

const router = express.Router()

router.post('/', processRequestBody(registerUserSchema.body), registerUserHandler)



export default router