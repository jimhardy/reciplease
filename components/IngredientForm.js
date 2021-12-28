import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Typography, FormControl, IconButton, Button, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';

export default function IngredientsForm({ submitIngredients, initialIngredients }) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  }, [saved]);

  const handleSubmit = async (e) => {
    try {
      const response = await submitIngredients(ingredients);
      if (response) {
        setSaved(true);
      }
    } catch (error) {
      console.log('error submitting ingredients');
      throw new Error(error);
    }
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
    setIngredients([...ingredients, { id: uuidv4(), name: '', amount: '', measure: '' }]);
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
                  name='name'
                  label='Ingredient'
                  variant='filled'
                  value={inputField.name}
                  InputLabelProps={{
                    shrink: !!inputField.name,
                  }}
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
          <Button className={'button'} variant='contained' color='primary' type='submit' onClick={handleSubmit}>
            Save
          </Button>
        </form>
      </FormControl>
    </Box>
  );
}
