import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../database"


const handler = async (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const {method} = req

        if(method === "GET") {

            knex('categories').then((results: Object) => {
                // @ts-ignore
                return res.status(200).json(results);
            })
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