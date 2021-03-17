import { ObjectId } from 'mongodb';
import { getCustomers } from '../helpers/api-util';
import Listing from '../components/customer/listing';

export default function HomePage(props) {
  const { users } = props;

  return <Listing users={users} />;
}

export async function getServerSideProps(context) {
  let customers;

  customers = await getCustomers();

  if (customers.length > 0) {
    const customerDetails = customers.map((user) => ({
      _id: ObjectId(user._id).toString(),
      email: user.email,
      name: user.name,
    }));
    return {
      props: { users: customerDetails },
    };
  }

  return {
    props: { users: [] },
  };
}
