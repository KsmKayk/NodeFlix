import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../database"
import bcrypt from "bcrypt"
import authenticated from "../../../middlewares/authenticated"
import administrator from "../../../middlewares/administrator"

const saltRounds = 10

interface UsersData {
    id: number,
    name: string,
    email: string,
    passwordHash: string,
    isAdministrator: boolean,
    isPremium: boolean,
    lastPaymentAt: string,
    createdAt: string,
    updatedAt: string
}


const handler = async (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const {method} = req

        if(method === "GET") {

            knex('users').then((results: Object) => {
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
export default administrator(handler);