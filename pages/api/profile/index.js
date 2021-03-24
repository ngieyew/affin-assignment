import { getSession } from 'next-auth/client';

import { dbConnect } from '../../../helpers/dbProvider';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not Authenticated!' });
    return;
  }

  const { publicId, email, name } = req.body;

  const client = await dbConnect();

  const db = client.db();

  const existingUser = await db.collection('users').findOne({ publicId });

  if (!existingUser) {
    res.status(422).json({ message: 'User does not exist!' });
    client.close();
    return;
  }

  const updatedUser = await db
    .collection('users')
    .updateOne({ publicId }, { $set: { email, name } });

  res.status(201).json({ message: 'Profile Updated!' });
  client.close();
}

export default handler;
