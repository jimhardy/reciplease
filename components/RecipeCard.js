// todo: rendered by the recipe list
// todo: shows recipe summary and thumbnails
// todo: calories, amount of time, rating etc

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Typography, ListItemText, Divider, ListItem, List } from '@mui/material';

export default function RecipeCard({ recipe }) {
  const router = useRouter();

  return (
    <ListItem alignItems='flex-start'>
      <ListItemText
        primary={recipe.title}
        secondary={
          <>
            <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
              {recipe.method}
            </Typography>
          </>
        }
      />
      <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
        {recipe.ingredientsSource.ingredients.map((ingredient, index) => ingredient.name).join(', ')}
      </Typography>
    </ListItem>
  );
}
