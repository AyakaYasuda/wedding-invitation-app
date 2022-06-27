import { SessionKeys } from 'constants/sessionKeys';
import SessionServices from 'services/session.services';

export const getAuth = () => {
  const token = SessionServices.getItem(SessionKeys.TOKEN);

  console.log('token', token);

  if (!token) {
    throw new Error('No token found!');
  }

  return token;
};
