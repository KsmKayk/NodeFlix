import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../../database"
import administrator from "../../../../middlewares/administrator";

interface CategoriesData {
    id: number,
    name: string
}

const handler = async (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const {method} = req

        if(method === "POST") {
            const {name} = req.body
            let existingCategory = await knex('categories').where({name: name.toUpperCase()})
            if(existingCategory[0]) {
                return res.status(400).json({message: `category ${name.toUpperCase()} already exists`} )
            }

            knex('categories').insert({name: name.toUpperCase()}, "id").then(function (id: [number]) {


                knex('categories').where({id: id[0]}).then(function (result: CategoriesData[]) {
                    return res.status(201).json({
                        id: result[0].id,
                        name: result[0].name
                    })
                })
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

export default administrator(handler)