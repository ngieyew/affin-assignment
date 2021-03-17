import { useState } from 'react';
import { useRouter } from 'next/router';

import CustomerForm from './customer-form';
import classes from './details.module.css';

function Details(props) {
  const { customer } = props;
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  function updateHandler() {
    setIsEditing(true);
  }

  async function deleteHandler() {
    const response = await fetch('/api/customer', {
      method: 'DELETE',
      body: JSON.stringify({ email: customer.email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      router.push('/');
    }
  }

  if (isEditing) {
    return <CustomerForm formType="update" formData={customer} />;
  }

  return (
    <div className={classes.card}>
      <div className={classes.details}>
        <p>{customer.name}</p>
      </div>
      <div className={classes.details}>
        <p>{customer.email}</p>
      </div>
      <div>
        <button onClick={updateHandler} className={classes.update}>
          Update
        </button>
        <button onClick={deleteHandler} className={classes.delete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Details;
