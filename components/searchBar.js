import { useState } from 'react';

export default function SearchBar({ ingredients }) {
  return (
    <>
      <span>
        {ingredients.map((ingredient) => {
          return <span key={ingredient.id}>{ingredient.name}</span>;
        })}
        <input type='text' />
      </span>
    </>
  );
}
