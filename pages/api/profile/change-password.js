import { getSession } from 'next-auth/client';

import { dbConnect } from '../../../helpers/dbProvider';
import { hashPassword, verifyPassword } from '../../../helpers/auth';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not Authenticated!' });
    return;
  }

  const { publicId, oldPassword, newPassword } = req.body;

  if (
    !newPassword ||
    newPassword.trim() === '' ||
    newPassword.trim().length < 7
  ) {
    res
      .status(422)
      .json({ message: 'Password should be at least 7 characters.' });
    return;
  }

  const client = await dbConnect();

  const db = client.db();

  const existingUser = await db.collection('users').findOne({ publicId });

  if (!existingUser) {
    res.status(422).json({ message: 'User does not exist!' });
    client.close();
    return;
  }

  const isValid = await verifyPassword(oldPassword, existingUser.password);

  if (!isValid) {
    res.status(422).json({ message: 'Old password does not match!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const updatedUser = await db
    .collection('users')
    .updateOne({ publicId }, { $set: { password: hashedPassword } });

  res.status(201).json({ message: 'Password updated!' });
  client.close();
}

export default handler;
