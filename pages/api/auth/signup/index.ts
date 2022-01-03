import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../../database"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


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

        if(method === "POST") {
            const {name, email, password} = req.body
            let existingUser = await knex('users').where({email})
            if(existingUser[0]) {
                return res.status(400).json({message: "email already registered"} )
            }

            else {

                bcrypt.hash(password, saltRounds).then(function (passwordHash) {
                    knex('users').insert({name, email, passwordHash}, "id").then(function (id: [number]) {


                        knex('users').where({id: id[0]}).then(function (result: UsersData[]) {
                            return res.status(201).json({
                                name: result[0].name,
                                email: result[0].email,
                                isAdministrator: result[0].isAdministrator,
                                isPremium: result[0].isPremium
                            })
                        })
                    })
                })
            }
        }

        if(method !== "POST") {
            return res.status(405).json({message: "method not allowed"})
        }

    } catch (err) {
        // @ts-ignore
        return res.status(500).json(({statusCode: 500, message:err.message}))
    }
}

export default handler