import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  TextField,
  Typography,
  FormControl,
  IconButton,
  Button,
  Box
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';

export default function Recipes() {
  const router = useRouter();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [],
    method: '',
    time: '',
  });

  const [ingredients, setIngredients] = useState([{ id: uuidv4(), ingredientName: '', amount: '', measure: '' }]);

  const handleSubmit = async (e) => {
    try {
      const submitRecipe = {
        ...recipe,
        ingredients,
      };
      if (!Object.values(submitRecipe).every((value) => value.length > 0)) {
        e.preventDefault();
        console.log('fields can not be blank');
      }
      const response = await fetch('/api/add-recipe', {
        method: 'POST',
        body: JSON.stringify(submitRecipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    } catch (error) {
      console.log('error submitting recipe');
      throw new Error(error);
    }
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.id]: e.target.value });
  };

  const handleChangeIngredients = (id, event) => {
    const newInputFields = ingredients.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setIngredients(newInputFields);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: uuidv4(), ingredientName: '', amount: '', measure: '' }]);
  };

  const handleRemoveIngredient = (id) => {
    const values = [...ingredients];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setIngredients(values);
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
      <Typography variant='h3'>New Recipe</Typography>
      <TextField id='title' label='Title' value={recipe.title} onChange={handleChange} />
      <FormControl>
        <form className={'root'} onSubmit={handleSubmit}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25%' },
            }}
            noValidate
            autoComplete='off'
          >
            {ingredients.map((inputField, index) => (
              <div key={inputField.id}>
                <TextField
                  name='ingredientName'
                  label='Ingredient'
                  variant='filled'
                  value={inputField.ingredientName}
                  onChange={(event) => handleChangeIngredients(inputField.id, event)}
                />
                <TextField
                  name='amount'
                  label='Amount'
                  variant='filled'
                  value={inputField.amount}
                  onChange={(event) => handleChangeIngredients(inputField.id, event)}
                />
                <TextField
                  name='measure'
                  label='Measure'
                  variant='filled'
                  value={inputField.measure}
                  onChange={(event) => handleChangeIngredients(inputField.id, event)}
                />
                <IconButton disabled={ingredients.length === 1} onClick={() => handleRemoveIngredient(inputField.id)}>
                  <RemoveIcon />
                </IconButton>
                {index + 1 === ingredients.length && (
                  <IconButton onClick={handleAddIngredient}>
                    <AddIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </Box>
          <TextField id='method' label='Method' multiline maxRows={99} value={recipe.method} onChange={handleChange} />
          <TextField
            id='time'
            label='Total time to make'
            type='time'
            value={recipe.time}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 30 }}
            onChange={handleChange}
          />
          <Button className={'button'} variant='contained' color='primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </FormControl>
    </Box>
  );
}
