import React from 'react';
const starStyle = {};
const Star = ({ star }) => {
  return <div className={'four-point-star '} id={star} style={starStyle}></div>;
};

export default Star;
