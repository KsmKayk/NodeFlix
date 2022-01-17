import type { NextPage } from 'next'
import Head from 'next/head'
import TopNav from "../components/TopNav";
import BodyS from "../components/BodyS";

const Home: NextPage = () => {
  return (
      <BodyS>
          <TopNav/>
      </BodyS>
  )
}

export default Home
