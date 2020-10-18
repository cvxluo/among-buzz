import React from 'react';

const ProgressBar = (props) => {
  const { completed } = props;

  const bgcolor = '#00ff00';

  const containerStyles = {
    height: 20,
    width: '100vw',
    borderRadius: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    transition: 'width 1s ease-in-out',
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>{/* <span style={labelStyles}>{`${completed}%`}</span> */}</div>
    </div>
  );
};


export default ProgressBar;