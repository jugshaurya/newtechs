import React from 'react';
const Link = ({ link }) => {
  return (
    <div className="link">
      😍 {link.description} ({link.url} )
    </div>
  );
};

export default Link;
