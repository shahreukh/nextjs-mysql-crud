import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';
import AppContext from '@/context/appContext';
import axios from 'axios';

export default function Home({ users }) {
  const [myUsers, setMyUsers] = useState(users);

  return (
    <>
      <Head>
        <title>NextJS MySQL CRUD </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="Description" content="NextJS MySQL CRUD " />
        <meta name="author" content="shahreukh@gmail.com" />
        <meta name="og:url" content="https://www.linkedin.com/in/shahreukh" />
      </Head>
      <main>
        <AppContext.Provider
          value={{
            users: myUsers,
            setMyUsers: setMyUsers,
          }}
        >
          <Layout />
        </AppContext.Provider>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios(`${process.env.NEXT_PUBLIC_HOST}/api/users/`);
  const users = response.data;

  return {
    props: {
      users: users,
    },
  };
}
