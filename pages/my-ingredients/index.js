import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Typography, FormControl, IconButton, Button, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import IngredientsForm from '../../components/IngredientForm';
import config from 'config';

export default function Pantry({ userIngredients, userId }) {
  const handleSubmit = async (ingredients) => {
    try {
      const response = await fetch(`/api/save-pantry?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify(ingredients),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.json();
    } catch (error) {
      console.log('error submitting ingredients');
      throw new Error(error);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h3'>Your Ingredients</Typography>
      <IngredientsForm submitIngredients={handleSubmit} initialIngredients={userIngredients} type={'pantry'} />
    </Box>
  );
}

export async function getStaticProps() {
  // const userId = window.localStorage.getItem('recipleaseUserId')
  const userId = '322211351154917961'; // for testing
  const res = await fetch(`${config.get('host')}/api/get-user?userId=${userId}`, {
    method: 'GET',
  });
  const data = await res.json();
  if (!data) {
    return { notfound: true };
  }

  return {
    props: {
      userIngredients: data.user.pantry.ingredients,
      userId: userId,
    },
    revalidate: 1,
  };
}
