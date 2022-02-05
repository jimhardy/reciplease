import Link from 'next/link';
import { useRouter } from 'next/router';
import config from 'config';

import { Typography, ListItemText, Divider, ListItem, List } from '@mui/material';
import RecipeList from '../../components/RecipeList';

export default function Recipes({ recipes }) {
  const router = useRouter();

  return (
    <>
      <h1>All Recipes</h1>
      <RecipeList recipes={recipes} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${config.get('host')}/api/all-recipes`, {
    method: 'GET',
  });
  const data = await res.json();

  if (!data) {
    return { notfound: true };
  }

  return {
    props: {
      recipes: data.recipes,
    },
    revalidate: 10,
  };
}
