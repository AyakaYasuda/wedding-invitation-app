import { SessionKeys } from 'constants/sessionKeys';
import { useAppDispatch } from 'hooks/hooks';
import useForm from 'hooks/useForm';
import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from 'redux/userThunkSlice';
import SessionServices from 'services/session.services';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { Form } from '../atoms/Form';

const initialFormState = {
  email: '',
  password: '',
};

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { values, inputChangeHandler } = useForm(initialFormState);
  const { email, password } = values;

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(
      login({
        email: email as string,
        password: password as string,
      })
    );

    console.log(result);

    // login success
    if (login.fulfilled.match(result)) {
      alert('login successfully!');
      SessionServices.setItem(SessionKeys.TOKEN, result.payload.token);
      SessionServices.setItem(SessionKeys.USER_ID, result.payload.userId);
      navigate('/admin/create');
    }

    // login failed
    if (login.rejected.match(result)) {
      alert('login failed...');
    }
  };
  return (
    <Card>
      <Form
        className="flex flex-col text-left mb-8 w-full md:w-4/5 mx-auto pt-12"
        onSubmit={submitHandler}
      >
        <label className="text-Pink-default">Email</label>
        <input
          type="email"
          name="email"
          value={email as string}
          onChange={inputChangeHandler}
          className="InputBorder mb-16"
        />
        <label className="text-Pink-default">Password</label>
        <input
          type="password"
          name="password"
          value={password as string}
          onChange={inputChangeHandler}
          className="InputBorder mb-20"
        />
        <div className="w-3/4 mx-auto pt-4 text-Pink-default text-center">
          <Button styleButton="bg-Pink-default text-White-default mb-4">
            Log In
          </Button>
          <Link to={'/admin/register'}>You don't have an account yet?</Link>
        </div>
      </Form>
    </Card>
  );
};

export default AdminLoginForm;
