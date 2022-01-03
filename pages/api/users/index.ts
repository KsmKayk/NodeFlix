import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../database"
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

        if(method === "GET") {
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

            // @ts-ignore
            if(!req.user.isAdministrator) {
                return res.status(401).json({message: "you don't have permission to do this operation"})
            }


            knex('users').then((results: Object) => {
                 // @ts-ignore
                return res.status(200).json(results);
            })
        }

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

        if(method !== "GET" && method !== "POST") {
             return res.status(405).json({message: "method not allowed"})
        }

    } catch (err) {
        // @ts-ignore
         return res.status(500).json(({statusCode: 500, message:err.message}))
    }
}

export default handler