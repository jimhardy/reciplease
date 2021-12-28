import Link from 'next/link';
import { useRouter } from 'next/router';
import config from 'config';

import { Typography, ListItemText, Divider, ListItem, List } from '@mui/material';

export default function Recipes({ recipes }) {
  const router = useRouter();

  return (
    <>
      <h1>All Recipes</h1>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {recipes.map((recipe, index) => {
          return (
            <ListItem key={index} alignItems='flex-start'>
              <ListItemText
                primary={recipe.title}
                secondary={
                  <>
                    <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                    {(recipe.ingredientsSource.ingredients.map((ingredient, index) => ingredient.name)).join(', ')}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          );
        })}
        <Divider variant='inset' component='li' />
      </List>
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
