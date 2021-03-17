import { dbConnect } from './dbProvider';
import { ObjectId } from 'mongodb';

export async function getCustomers() {
  const client = await dbConnect();

  const usersCollection = client.db().collection('users');

  const customers = await usersCollection.find({ role: 'customer' }).toArray();

  client.close();
  return customers;
}

export async function getCustomerById(customerId) {
  const client = await dbConnect();

  const usersCollection = client.db().collection('users');

  const customer = await usersCollection.findOne({
    _id: ObjectId(customerId),
    role: 'customer',
  });

  client.close();

  return customer;
}
