import React, { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ImgFlower1 from 'views/images/invitation-flower1.png';
import ImgFlower2 from 'views/images/invitation-flower2.png';

import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import CardWeddingInfo from 'views/components/Guest/CardWeddingInfo';
import FormAttendance from 'views/components/Guest/FormAttendance';

type GuestInvitationLayoutProps = {
  // children: React.ReactNode;
};

const GuestInvitationLayout: React.FC<GuestInvitationLayoutProps> = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [allergy, setAllergy] = useState('');

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    // interact with the backend using fetch
    // await fetch(
    //   'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/signup',
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       firstName,
    //       lastName,
    //       email,
    //       password,
    //       isAdmin: true,
    //       messsage: '',
    //       allergy: '',
    //     }),
    //   }
    // );

    await axios.post(
      'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/signup',
      JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        message,
        allergy,
        isAdmin: true,
      })
    );

    navigate('/guests/login');

    console.log('submitted!');
  };

  return (
    <GuestBaseLayout>
      <div className="flex justify-center md:items-center">
        <img
          src={ImgFlower1}
          alt="flower"
          className="w-medium fixed top-0 right-0"
        />
        <div className="w-5/6 lg:w-4/5 my-8 md:h-4/5 bg-white FlexCenter rounded-2xl">
          <div className=" w-11/12 md:h-5/6 my-6 flex flex-col md:items-center lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <CardWeddingInfo spacing="" />
            </div>
            <div className="lg:w-1/2">
              <FormAttendance
                sectionTitle="RSVP"
                sectionTitleColor="text-Yellow-dark"
                classInput="InputDark"
                textButton="Reply"
                styleButton="bg-Green-default text-white"
                spacing="md:w-extraLarge"
                firstName={firstName}
                lastName={lastName}
                message={message}
                allergy={allergy}
                email={email}
                password={password}
                submitHandler={submitHandler}
                onChangeFirstName={(e) => setFirstName(e.target.value)}
                onChangeLastName={(e) => setLastName(e.target.value)}
                onChangeEmail={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                onChangeMessage={(e) => setMessage(e.target.value)}
                onChangeAllergy={(e) => setAllergy(e.target.value)}
              />
            </div>
          </div>
        </div>

        <img
          src={ImgFlower2}
          alt="flower"
          className="w-1/4 fixed bottom-0 left-0"
        />
      </div>
    </GuestBaseLayout>
  );
};

export default GuestInvitationLayout;
