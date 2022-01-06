import {NextApiRequest, NextApiResponse} from "next"
import knex from "../../../../database"
import administrator from "../../../../middlewares/administrator";
import nc from "next-connect"
import upload from "../../../../utils/upload"

const handler = nc()
    .use(upload.single('episode'))
    .post(async (req: NextApiRequest, res:NextApiResponse) => {
        const {name, description, anime} = req.body
        let existingAnime = await knex("animes").where({name:anime})
        if(!existingAnime[0]) {
            return res.status(400).json({message: `this anime doesn't exists`})
        }


        knex('episodes').insert({name,description,animeId: existingAnime[0].id, episodeUrl:req.file.location }, "id").then(function (id: [number]) {
            return res.status(201).json({
                id: id[0],
                name,
                description,
                episodeUrl:req.file.location,
                anime: {
                    id: existingAnime[0].id,
                    name: existingAnime[0].name,
                    thumbnailUrl: existingAnime[0].thumbnailUrl
                }
            })

        })
    })

export const config = {
    api: {
        bodyParser: false
    }
}


export default administrator(handler)