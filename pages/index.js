import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  // the props here is from getStaticProps
  return (
    <div className={styles.container}>
      <Head>
        <title>Reciplease</title>
        <meta name='description' content='The meal planning tool' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Reciplease</h1>
        <p>Add ingredients</p>
      </main>
    </div>
  );
}

// export async function getStaticPaths() {
//   // used for dynamic pages
//   // would programatically get all ids here => eg. get all recipeids from db
//   return {
//     fallback: false, // false = paths contails all pages | true = pages not found would be generated dynamically
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

export async function getStaticProps() {
  // runs before component is rendered
  // executed at build, not client side
  return {
    props: {
      test: 'i am a prop that is generated at build time',
    },
    revalidate: 10, // regenerates page on server every 10 seconds
  };
}

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
