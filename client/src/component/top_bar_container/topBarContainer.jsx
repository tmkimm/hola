import React from 'react';
import { useDispatch } from 'react-redux';
import { previousStep } from 'store/loginStep';
import TopBar from '../top_bar/topBar';

const TopBarContainer = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(previousStep());
  };

  return <TopBar handleClick={handleClick}></TopBar>;
};

export default TopBarContainer;
