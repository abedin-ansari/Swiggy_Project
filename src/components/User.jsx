import React, { useState } from 'react';

const User = ({ name, location }) => {

    const [count] = useState(0);

  return (
    <div className='user-class'>
        <h1>Count :{count}</h1>
        <h2>{name}</h2>
        <h3>{location}</h3>
        <h4>mob no. : 7392838298</h4>
    </div>
  )
}

export default User;