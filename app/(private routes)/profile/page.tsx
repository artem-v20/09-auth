import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';

const Profile = async () => {
  const user = await getMe();

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href={'/profile/edit'} className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt={user.username}
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
