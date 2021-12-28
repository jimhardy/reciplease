// todo: search result page
// todo: filters
// todo: seperate full matches and partial matches

import Link from 'next/link';
import { useRouter } from 'next/router';
// import config from 'config';

import { Typography, ListItemText, Divider, ListItem, List } from '@mui/material';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
      <Divider variant='inset' component='li' />
    </List>
  );
}
