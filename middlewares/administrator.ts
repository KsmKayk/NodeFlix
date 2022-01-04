import {NextApiRequest, NextApiResponse} from "next"
import jwt from "jsonwebtoken";

const administrator = (handler) => {
    return async (req: NextApiRequest, res:NextApiResponse) => {
        let token = req.headers.authorization?.split(" ")[1]
        if(!token) {
            return res.status(401).json({message: "you must be signed in and be administrator to do this operation"})
        }

        if(token) {
            try {
                // @ts-ignore
                let decoded = jwt.verify(token, process.env.JWT_SECRET)
                // @ts-ignore
                req.user = decoded;
            } catch (err) {
                return res.status(401).json({message:"invalid token"})
            }
        }
        // @ts-ignore
        if(!req.user.isAdministrator) {
            return res.status(401).json({message: "you don't have permission to do this operation"})
        }

        return handler(req, res)
    }
}

export default administrator;