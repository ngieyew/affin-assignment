import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './customer-form.module.css';

function CustomerForm(props) {
  const { formType, formData } = props;
  const router = useRouter();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (formType === 'update') {
      setEmailInput(formData.email);
      setNameInput(formData.name);
    }
  }, [formType]);

  async function submitHandler(event) {
    event.preventDefault();
    if (formType == 'update') {
      const response = await fetch('/api/customer', {
        method: 'PATCH',
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          name: nameInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        router.push('/');
      }
    } else {
      const response = await fetch('/api/customer', {
        method: 'POST',
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          name: nameInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        router.push('/');
      }
    }
  }

  const emailHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const passwordHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const nameHandler = (event) => {
    setNameInput(event.target.value);
  };

  return (
    <section className={classes.auth}>
      <div className={classes.header}>
        <p>
          {formType === 'update'
            ? 'Update Customer Details'
            : 'Create New Customer'}
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={emailInput}
            onChange={emailHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={passwordInput}
            onChange={passwordHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            value={nameInput}
            onChange={nameHandler}
          />
        </div>
        <div className={classes.actions}>
          <button>{formType === 'update' ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </section>
  );
}

export default CustomerForm;
