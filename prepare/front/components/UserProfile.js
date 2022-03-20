import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">Twit<br />{me.post.length}</div>,
        <div key="followings">Following<br />{me.Follwings.length}</div>,
        <div key="followings">Follower<br />{me.Followers.length}</div>,
      ]}
    >
      <Card.Meta 
      avatar={<Avatar>{me.nickname[0]}</Avatar>} 
      title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>Logout</Button>
    </Card>
  );
};

export default UserProfile;
