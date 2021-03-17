import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import classes from './navigation.module.css';

function Navigation() {
  const [session, loading] = useSession();

  function signOutHandler() {
    signOut();
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Affin Assignment</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {session && (
            <>
              <li>
                <Link href="/new-customer">Add Customer</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={signOutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
