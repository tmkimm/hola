import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css';

export const Carousel = ({ options, children }) => {
  return <Slider {...options}>{children}</Slider>;
};
