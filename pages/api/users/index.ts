import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../database"
import bcrypt from "bcrypt"

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
                res.status(200).json(results);
            })
        }

        if(method === "POST") {
            const {name, email, password} = req.body
            let existingUser = await knex('users').where({email})
            if(existingUser[0]) {
                res.status(400).json({message: "email already registered"} )
            }

            else {

                bcrypt.hash(password, saltRounds).then(function (passwordHash) {
                    knex('users').insert({name, email, passwordHash}, "id").then(function (id: [number]) {


                        knex('users').where({id: id[0]}).then(function (result: UsersData[]) {
                            res.status(201).json(result[0])
                        })


                    })
                })





            }


        }

        else {
            res.status(405).json({message: "method not allowed"})
        }

    } catch (err) {
        // @ts-ignore
        res.status(500).json(({statusCode: 500, message:err.message}))
    }
}

export default handler