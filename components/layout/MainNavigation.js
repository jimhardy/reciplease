import classes from './MainNavigation.module.css';
import Link from 'next/link';
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        {' '}
        <Link href='/'>Reciplease</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/all-recipes'>All Recipies</Link>
          </li>
          <li>
            <Link href='/my-ingredients'>My Ingredients</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
