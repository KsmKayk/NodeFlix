import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../database"

const handler = async (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const {method} = req

        if(method === "GET") {
            const {pid} = req.query
            let episode = await knex('episodes').where({id: pid})
            if(episode[0]) {
                return res.status(200).json(episode[0])
            } else {
                    return res.status(404).json({message: "episode not found or not exists"})
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
export default handler;