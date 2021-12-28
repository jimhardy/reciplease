import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { TextField, Typography, Button, IconButton, Box, List, ListItem } from '@mui/material';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/searchBar';
import config from 'config';
export default function Home({ user }) {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search-recipes?userId=${user.id}`, {
      method: 'GET',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Reciplease</title>
        <meta name='description' content='The meal planning tool' />
      </Head>

      <main className={styles.main}>
        <Typography variant='h3'>Reciplease</Typography>
        <Typography variant='h7'>Your ingredients:</Typography>
        <SearchBar />
        <Button onClick={handleSearch} variant='outlined'>
          Search
        </Button>
        {recipes.length ? <RecipeList recipes={recipes} /> : <Typography variant='h7'>click search</Typography>}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // const userId = window.localStorage.getItem('recipleaseUserId')
  const userId = 'user-uuid1234'; // for testing
  const res = await fetch(`${config.get('host')}/api/get-user?userId=${userId}`, {
    method: 'GET',
  });
  const data = await res.json();
  if (!data) {
    return { notfound: true };
  }
  console.log('here');
  console.log(data.user);
  return {
    props: {
      user: data.user,
    },
    revalidate: 10,
  };
}

// export async function getStaticPaths() {
//   // used for dynamic pages
//   // would programatically get all ids here => eg. get all recipeids from db
//   return {
//     fallback: false, // false = paths contains all pages | true = pages not found would be generated dynamically
//     // fallback is useful for prerendering popular pages
//     paths: [
//       {
//         params: {
//           recipeId: '1',
//         },
//       },
//       {
//         params: {
//           recipeId: '2',
//         },
//       },
//     ],
//   };
// }

// runs for every request => slower => only use if you need req, or if props change all the time
// export async function getServerSideProps(context) { // context is optional
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       test: 'i am a prop that is on request'
//     }
//   }
// }
