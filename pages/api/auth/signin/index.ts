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
            const { email, password} = req.body
            let existingUser: UsersData[] = await knex('users').where({email})
            if(!existingUser[0]) {
                return res.status(401).json({message: "email or password are incorrect"} )
            }

            bcrypt.compare(password, existingUser[0].passwordHash, function(err, result) {
                if(!result) {
                    return res.status(401).json({message: "email or password are incorrect"})
                }

                else {

                    let token = jwt.sign({
                        id: existingUser[0].id,
                        name: existingUser[0].name,
                        email: existingUser[0].email,
                        isAdministrator: existingUser[0].isAdministrator,
                        isPremium: existingUser[0].isPremium
                    }, process.env.JWT_SECRET, {expiresIn: "1d"})

                    return res.status(200).json({user: {
                            id: existingUser[0].id,
                            name: existingUser[0].name,
                            email: existingUser[0].email,
                            isAdministrator: existingUser[0].isAdministrator,
                            isPremium: existingUser[0].isPremium,
                            lastPaymentAt:existingUser[0].lastPaymentAt
                        }, token})
                }
            })

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