import React from 'react';

const Error = ({ errors }) => {
  return (
    <div className="error">
      Something went wrong
      <br />
      {JSON.stringify(errors)}
    </div>
  );
};

export default Error;
