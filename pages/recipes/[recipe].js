import { useRouter } from 'next/router';
export default function Recipe() {
  const router = useRouter()

  const recipeId = router.query.recipe;
  console.log(recipeId);

  // could use recipeId here to fetch from backend

  return <h1>Recipe Page</h1>;
}
