import Link from 'next/link';

import classes from './listing.module.css';

function Listing(props) {
  const { users } = props;

  return (
    <div className={classes.cardContainer}>
      {users.length > 0 ? (
        users.map((user) => (
          <div className={classes.card} key={user.publicId}>
            <div className={classes.info}>
              <p>{user.name}</p>
            </div>
            <div className={classes.actions}>
              <Link href={`/customer/${user.publicId}`}>
                <a className={classes.view}>Details</a>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className={classes.card}>
          <p>No Customers Available</p>
        </div>
      )}
    </div>
  );
}

export default Listing;
