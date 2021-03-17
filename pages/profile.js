import { getSession } from 'next-auth/client';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <p>Profile</p>;
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

export default ProfilePage;
