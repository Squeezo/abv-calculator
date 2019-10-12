import React from 'react';

interface AbvProps {
  og: number
  fg: number 
}

const GetAbv = (props: AbvProps) => {
  return Math.floor(((props.og - props.fg) * 131.25) * 100) / 100;
}

export default GetAbv;