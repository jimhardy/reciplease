import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { userService, recipeService } from '../app/index';

export default function Home(props) {
  // the props here is from getStaticProps

  const handleAddRecipe = async () => {
    try {
      const res = await fetch('/api/add-recipe');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllRecipes = async () => {
    try {
      const res = await fetch('/api/all-recipes');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Reciplease</title>
        <meta name='description' content='The meal planning tool' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Reciplease</h1>
        <p>Add ingredients</p>
        <button onClick={handleAddRecipe}>Add Recipe</button>
        <button onClick={handleGetAllRecipes}>Get All Recipes</button>
      </main>
    </div>
  );
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

// export async function getStaticProps() {
//   // runs before component is rendered
//   // executed at build, not client side

//   return {
//     props: {
//       test: 'xxx',
//     },
//     revalidate: 10, // regenerates page on server every 10 seconds
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
