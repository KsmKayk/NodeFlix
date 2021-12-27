import {NextApiRequest, NextApiResponse} from "next"

const handler = (req: NextApiRequest, res:NextApiResponse) => {
    try {
        const {method} = req

        if(method === "GET") {
            res.status(200).json({
                users: [
                    {id: 1, name: "john doe"},
                    {id: 2, name: "Janne doe"},
                    {id: 3, name: "Example user"}
                ]
            })
        }

        res.status(405).json({message: "method not allowed"})

    } catch (err) {
        // @ts-ignore
        res.status(500).json(({statusCode: 500, message:err.message}))
    }
}

export default handler