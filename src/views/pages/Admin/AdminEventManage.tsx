import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { eventGet, guestsGet } from 'features/event/eventThunkSlice';
import { IUser } from 'features/user/userThunkSlice';

import Modal from 'views/components/atomic/molecules/Modal';
import Button from '../../components/atomic/atoms/Button';
import Navbar from '../../components/atomic/molecules/Navbar';

const AdminEventManage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [eventData, setEventData] = useState<any>(null);
  const [guestsData, setGuestsData] = useState<IUser[]>([]);
  const [eventId, setEventId] = useState<string>('');

  const status = useAppSelector((state) => state.event.status);

  console.log('status', status);

  const { event } = useAppSelector((state) => state.event);
  const { guests } = useAppSelector((state) => state.event.guests);

  useEffect(() => {
    console.log('run');
    dispatch(eventGet());
  }, []);

  useEffect(() => {
    setEventData(event);
    setEventId(event?.SK);
  }, [event]);

  useEffect(() => {
    console.log('run');
    dispatch(guestsGet());
  }, [eventId]);

  useEffect(() => {
    setGuestsData(guests);
  }, [guests]);

  console.log('eventData', eventData);
  console.log('guestsData', guestsData);

  const [showInfoStyle, setShowInfoStyle] = useState('w-full');
  const [showGuestsStyle, setShowGuestsStyle] = useState('hidden');
  const [showModal, setShowModal] = useState<boolean>(false);

  const showInfoHandler = () => {
    setShowInfoStyle('block w-full');
    setShowGuestsStyle('hidden');
  };

  const showGuestsHandler = () => {
    setShowGuestsStyle('block w-full');
    setShowInfoStyle('hidden');
  };

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar />
      {showModal && <Modal closeHandler={showModalHandler} />}
      <section className="w-full h-screen FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default relative">
        {isLoading && <div>Loading....</div>}
        {eventData && (
          <>
            <ul className="pt-16 flex flex-row justify-center gap-14 mb-6 md:hidden">
              <li onClick={showInfoHandler} className="HoverUnderLine">
                <h2 className="basis-1/2 text-4xl">Event info</h2>
              </li>
              <li onClick={showGuestsHandler} className="HoverUnderLine">
                <h2 className="basis-1/2 text-4xl">Guests list</h2>
              </li>
            </ul>
            <div className="w-4/5 h-3/4 flex flex-row gap-14 text-white">
              <div className={`${showInfoStyle} md:block md:basis-1/2`}>
                <h2 className="hidden md:block mb-2">Event info</h2>
                <div className="flex flex-col  mb-8 md:mb-4">
                  <div className="flex flex-row justify-between items-center mb-3">
                    <span className="basis-1/4">Event URL</span>
                    <p className="InputLighter basis-3/4 px-2">
                      {eventData.SK}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-center mb-3">
                    <span className="basis-1/4">Bride</span>
                    <p className="InputLighter basis-3/4 px-2">
                      {eventData.bride}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="basis-1/4">Groom</span>
                    <p className="InputLighter basis-3/4 px-2">
                      {eventData.groom}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mb-8 md:mb-4">
                  <h4 className="mb-1">Date and Time of Wedding Ceremony</h4>
                  <p className="InputLighter mb-2 px-2">
                    {eventData.dateWedding}
                  </p>
                  <h4 className="mb-1">Date and Time of Wedding Reception</h4>
                  <p className="InputLighter mb-2 px-2">
                    {eventData.dateWeddingReception}
                  </p>
                  <h4 className="mb-1">Message</h4>
                  <p className="InputLighter mb-2 h-28 px-2">
                    {eventData.message}
                  </p>
                </div>
                <ul className="w-4/5 mx-auto md:flex md:gap-4">
                  <li className="hidden md:block md:basis-1/2">
                    <Button styleButton="border-2 border-White-default">
                      Set uneditable
                    </Button>
                  </li>
                  <li className="md:basis-1/2">
                    <Button styleButton="border-2 border-White-default">
                      <Link to="/admin/edit">Edit event info</Link>
                    </Button>
                  </li>
                </ul>
              </div>
              <div className={`${showGuestsStyle} md:block md:basis-1/2`}>
                <h2 className="hidden md:block mb-2">Guests list</h2>
                <ul className="overflow-y-scroll h-4/5">
                  {guestsData &&
                    guestsData.map((guest) => {
                      return (
                        <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                          <span className="basis-3/5">{`${guest.firstName} ${guest.lastName}`}</span>
                          {guest.isAttending ? (
                            <Button styleButton="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                              PRESENT
                            </Button>
                          ) : (
                            <Button styleButton="basis-1/5 text-Green-default border-2 border-Green-default drop-shadow-md mr-2">
                              ABSENT
                            </Button>
                          )}
                          <button
                            onClick={showModalHandler}
                            className="text-Pink-dark basis-1/5"
                          >
                            Show Detail
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </>
        )}

        <small className="absolute bottom-5 text-center">
          &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
        </small>
      </section>
    </>
  );
};

export default AdminEventManage;
