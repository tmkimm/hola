import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setSignUpUser } from 'store/loginStep';
import SetInterest from 'component/set_interest/setInterest';
import { toast } from 'react-toastify';
import { HolaLogEvent } from 'common/GA';

const SetInterestContainer = () => {
  const dispatch = useDispatch();
  const loginStep = useSelector((state) => state.loginStep);
  const { position, workExperience } = loginStep;

  const handleFields = ({ key, value }) => {
    dispatch(setSignUpUser({ key, value }));
  };

  const handleLoginStep = () => {
    if (position === '') {
      toast.info('포지션을 선택해 주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (workExperience === '') {
      toast.info('경력을 선택해 주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    HolaLogEvent('sign_up_start_position_and_career', {
      category: [position.label, workExperience.label].join(' '),
    });

    dispatch(nextStep());
  };

  return (
    <SetInterest
      handleFields={handleFields}
      loginStep={loginStep}
      handleLoginStep={handleLoginStep}
    ></SetInterest>
  );
};

export default SetInterestContainer;
