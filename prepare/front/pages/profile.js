import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/Applayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [
    { nickname: 'kimpm' },
    { nickname: 'babo' },
    { nickname: 'node' },
  ];
  const followingList = [
    { nickname: 'kimpm' },
    { nickname: 'babo' },
    { nickname: 'node' },
  ];

  return (
    <>
      <Head>
        <title>My Profile | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following list" data={followingList} />
        <FollowList header="Follower list" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
