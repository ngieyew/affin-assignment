import { getSession } from 'next-auth/client';
import { nanoid } from 'nanoid'

import { getUserByEmail } from '../helpers/api-util';
import ProfileForm from '../components/profile/profile-form';

function ProfilePage(props) {
  const { user } = props;

  return <ProfileForm user={user} />;
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

  const user = await getUserByEmail(session.user.email);

  const extractedInfo = {
    publicId: user.publicId,
    email: user.email,
    name: user.name || '',
  };

  return {
    props: { user: extractedInfo },
  };
}

export default ProfilePage;
