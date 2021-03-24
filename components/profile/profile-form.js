import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './profile-form.module.css';

function ProfileForm(props) {
  const { user } = props;
  const router = useRouter();
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');

  useEffect(() => {
    setEmailInput(user.email);
    setNameInput(user.name);
  }, []);

  async function submitHandler(event) {
    event.preventDefault();

    let response;

    if (!isChangePassword) {
      response = await fetch('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          publicId: user.publicId,
          email: emailInput,
          name: nameInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      response = await fetch('/api/profile/change-password', {
        method: 'PATCH',
        body: JSON.stringify({
          publicId: user.publicId,
          oldPassword: oldPasswordInput,
          newPassword: newPasswordInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      router.push('/');
    }
  }

  const emailHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const nameHandler = (event) => {
    setNameInput(event.target.value);
  };

  const oldPasswordHandler = (event) => {
    setOldPasswordInput(event.target.value);
  };

  const newPasswordHandler = (event) => {
    setNewPasswordInput(event.target.value);
  };

  return (
    <section className={classes.auth}>
      <div className={classes.header}>
        <p>{isChangePassword ? 'Update Password' : 'Update Profile'} </p>
      </div>
      <form onSubmit={submitHandler}>
        {isChangePassword ? (
          <>
            <div className={classes.control}>
              <label htmlFor="old-password">Old Password</label>
              <input
                type="password"
                id="old-password"
                required
                value={oldPasswordInput}
                onChange={oldPasswordHandler}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                required
                value={newPasswordInput}
                onChange={newPasswordHandler}
              />
            </div>
          </>
        ) : (
          <>
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                required
                value={nameInput}
                onChange={nameHandler}
              />
            </div>
          </>
        )}

        <div className={classes.actions}>
          <button>Update</button>

          <button
            type="button"
            className={classes.toggle}
            onClick={() => setIsChangePassword((prev) => !prev)}
          >
            {isChangePassword
              ? 'Switch to Profile'
              : 'Switch to Change Password'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProfileForm;
