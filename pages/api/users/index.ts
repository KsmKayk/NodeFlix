import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../database"

const handler = (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const {method} = req

        if(method === "GET") {

            knex('users').then((results: Object) => {
                res.status(200).json(results);
            })
        } else {
            res.status(405).json({message: "method not allowed"})
        }

    } catch (err) {
        // @ts-ignore
        res.status(500).json(({statusCode: 500, message:err.message}))
    }
}

export default handler