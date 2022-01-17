import type {NextComponentType} from "next"
import Head from 'next/head'

const HeadS: NextComponentType = () => {
    return (
        <Head>
            <title>NodeFlix</title>

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="../../styles/globals.css"/>
        </Head>
    )
}

export default HeadS