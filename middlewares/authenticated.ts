import {NextApiRequest, NextApiResponse} from "next"
import jwt from "jsonwebtoken";

const authenticated = (handler) => {
    return async (req: NextApiRequest, res:NextApiResponse) => {
        let token = req.headers.authorization?.split(" ")[1]
        if(!token) {
            return res.status(401).json({message: "you must be signed in and be administrator to do this operation"})
        }

        if(token) {
            try {
                let decoded = jwt.verify(token, process.env.JWT_SECRET)
                // @ts-ignore
                req.user = decoded;
            } catch (err) {
                return res.status(401).json({message:"invalid token"})
            }
        }

        return handler(req, res)
    }
}

export default authenticated;