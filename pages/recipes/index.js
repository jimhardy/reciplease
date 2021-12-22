import Link from 'next/link';
import {useRouter} from 'next/router'
export default function Recipes() {
  const router = useRouter();

  const showRecipeHandler = () => {
    router.push('/recipes/pasta',)
  }

  return (
    <>
      <h1>Recipes Page</h1>;
      <ul>
        <li>
          <Link href='/recipes/pasta-and-butter'>Pasta and butter</Link>

        </li>
        <li>
          {/* alternative */}
          <button onClick={showRecipeHandler}>pasta</button>
        </li>
      </ul>
    </>
  );
}
