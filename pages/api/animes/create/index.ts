import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../../database"
import administrator from "../../../../middlewares/administrator";
import nc from "next-connect"
import upload from "../../../../utils/upload"

interface animeData {
    id: number,
    name: string,
    description:string,
    thumbnailUrl:string,
    categoryId:number,
}

const handler = nc()
    .use(upload.single('thumbnail'))
    .post(async (req: NextApiRequest, res:NextApiResponse) => {
        const {name, description, category} = req.body
        let existingAnime = await knex('animes').where({name})
        if(existingAnime[0]) {
            return res.status(400).json({message: `anime already exists`} )
        }

        let existingCategory = await knex("categories").where({name:category.toUpperCase()})
        if(!existingCategory[0]) {
            return res.status(400).json({message: `this category doesn't exists`})
        }

        knex('animes').insert({name,description,categoryId: existingCategory[0].id, thumbnailUrl:req.file.location }, "id").then(function (id: [number]) {


            knex('animes').where({id: id[0]}).then(function (result: animeData[]) {
                return res.status(201).json({
                    id: result[0].id,
                    name: result[0].name,
                    description:result[0].description,
                    thumbnailUrl:result[0].thumbnailUrl,
                    category: {
                        id: existingCategory[0].id,
                        name: existingCategory[0].name
                    }
                })
            })
        })
    })

export const config = {
    api: {
        bodyParser: false
    }
}


export default administrator(handler)