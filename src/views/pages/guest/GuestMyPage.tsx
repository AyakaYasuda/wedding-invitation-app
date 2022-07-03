import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

import GuestPageLayout from 'views/components/molecules/Layout/GuestPageLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import YourReply from 'views/components/organisms/YourReply';
import { getUserById } from 'redux/adminUserSlice';
import { getGuestAuth } from 'services/auth.service';
import useRedirectIfNotLogin from 'hooks/useRedirectIfNotLogin';

const GuestMyPage = () => {
  const dispatch = useAppDispatch();
  const [isEventInfoShown, setIsEventInfoShown] = useState<boolean>(true);
  const [isYourReplyShown, setIsYourReplyShown] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.guestUser);
  const { SK: userId } = user;
  const { isLogin } = useAppSelector((state) => state.guestAuth);

  useRedirectIfNotLogin(isLogin, '/guests/login');

  useEffect(() => {
    const token = getGuestAuth();

    if (userId && token) {
      dispatch(getUserById({ userId, token }));
    }
  }, [userId, dispatch]);

  const switchContentsHandler = () => {
    setIsEventInfoShown((prev) => !prev);
    setIsYourReplyShown((prev) => !prev);
  };

  const desktopContent = (
    <div className="hidden lg:grid grid-cols-2 justify-items-center py-10 px-20 gap-5">
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Event Info</h2>
        <CardWeddingInfo />
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Your Reply</h2>
        <YourReply user={user} />
      </div>
    </div>
  );

  const mobileContent = (
    <div className="w-full grid grid-cols-1 justify-items-center py-10 px-10 sm:px-20 lg:hidden">
      <div className="grid grid-cols-2 justify-items-center gap-10 mb-10">
        <h2
          className="HoverUnderLine cursor-pointer"
          onClick={switchContentsHandler}
        >
          Event Info
        </h2>
        <h2
          className="HoverUnderLine cursor-pointer"
          onClick={switchContentsHandler}
        >
          Your Reply
        </h2>
      </div>
      {isEventInfoShown && <CardWeddingInfo />}
      {isYourReplyShown && <YourReply user={user} />}
    </div>
  );

  return (
    <div>
      <GuestPageLayout>
        {desktopContent}
        {mobileContent}
      </GuestPageLayout>
    </div>
  );
};

export default GuestMyPage;
