import { hashPassword } from '../../../helpers/auth';
import { dbConnect } from '../../../helpers/dbProvider';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.body;

    const client = await dbConnect();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    client.close();
    return;
  }
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7 ||
      name.trim() === ''
    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also be at least 7 characters long and name should not be blank',
      });
      return;
    }

    const client = await dbConnect();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
      role: 'customer',
      name: name,
    });

    res.status(201).json({ message: 'Created user!' });
    client.close();
    return;
  }
  if (req.method === 'PATCH') {
    const { email, password, name } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7 ||
      name.trim() === ''
    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also be at least 7 characters long and name should not be blank',
      });
      return;
    }

    const client = await dbConnect();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    if (!existingUser) {
      res.status(422).json({ message: 'User does not Exist!' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').updateOne(
      { email: existingUser.email },
      {
        $set: {
          email: email,
          password: hashedPassword,
          name: name,
        },
      }
    );

    res.status(201).json({ message: 'Updated user!' });
    client.close();
    return;
  }
  if (req.method === 'DELETE') {
    const { email } = req.body;

    const client = await dbConnect();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    if (!existingUser) {
      res.status(422).json({ message: 'User does not Exist!' });
      client.close();
      return;
    }

    const result = await db.collection('users').deleteOne({ email });

    res.status(201).json({ message: 'Deleted user!' });
    client.close();
    return;
  }
}

export default handler;
