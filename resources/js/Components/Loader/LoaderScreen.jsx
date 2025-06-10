import React from 'react';
import LoaderImg from '../../../assets/loader.svg';

export default function LoaderScreen() {
  return (
    <div className='loader__wrapper'>
      <img src={LoaderImg} alt="Loader Screen..." />
    </div>
  );
}