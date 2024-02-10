import React from 'react';
import { LinkProps } from 'react-router-dom';
import { Link } from './Link.styles';

const StyledLink = ({ ...props }: LinkProps) => {
  return <Link {...props} />;
};

export { StyledLink };
