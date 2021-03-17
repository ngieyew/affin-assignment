import { getCustomerById } from '../../helpers/api-util';
import Details from '../../components/customer/details';
import { getSession } from 'next-auth/client';

function CustomerPage(props) {
  const { selectedCustomer } = props;

  const customer = selectedCustomer;

  if (!customer) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return <Details customer={customer} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const customerId = context.params.customerId;

  const customer = await getCustomerById(customerId);

  const extractedInfo = {
    email: customer.email,
    name: customer.name,
  };

  return { props: { selectedCustomer: extractedInfo } };
}

export default CustomerPage;
