import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Checkbox, Form, Input, Button } from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/Applayout';
import useInput from '../hooks/useInput';

const ErrorMassage = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.cheked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Sing up | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user=id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-id">Nickname</label>
          <br />
          <Input
            name="user=nick"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-id">Password</label>
          <br />
          <Input
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">PasswordCheck</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMassage>The password doesn't match.</ErrorMassage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" Checkbox={term} onChange={onChangeTerm}>
            I agree to listen well.
          </Checkbox>
          {termError && <ErrorMassage>You have to agree.</ErrorMassage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">
            Singup
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
