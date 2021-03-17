import { getSession } from 'next-auth/client';

import CustomerForm from '../components/customer/customer-form';

function NewCustomerPage() {
  return <CustomerForm formType="create" />;
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

  return {
    props: { session },
  };
}

export default NewCustomerPage;
