import React from 'react';

export default function CreateButton({ routeName, textButton='Create' }) {
  return (
    <a className={`btn btn--primary`} href={route(routeName)}> 
      {textButton}
    </a>
  );
}