import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../database"
import authenticated from "../../../middlewares/authenticated"




const handler = async (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const {method} = req

        if(method === "GET") {
            const {pid} = req.query
            if(req.user.isAdministrator) {
                let user = await knex('users').where({id: pid})
                if(user[0]) {
                    return res.status(200).json(user[0])
                } else {
                    return res.status(404).json({message: "user not found or not exists"})
                }
            }

            if(!req.user.isAdministrator) {
                if(req.user.id.toString() === pid) {
                    let user = await knex('users').where({id: pid})
                    return res.status(200).json(user[0])
                } else {
                    res.status(401).json({message: "you don't have permission to do this operation"})
                }
            }
        }

        if(method !== "GET") {
            return res.status(405).json({message: "method not allowed"})
        }

    } catch (err) {
        // @ts-ignore
        return res.status(500).json(({statusCode: 500, message:err.message}))
    }
}
export default authenticated(handler);