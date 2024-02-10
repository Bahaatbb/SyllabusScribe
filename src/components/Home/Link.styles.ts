import styled from '@emotion/styled';
import { Link as NStyledLink } from 'react-router-dom';

const Link = styled(NStyledLink)`
  text-decoration: none;
  color: #939393;
  box-sizing: border-box;
  padding: 0;
  /* transition: all 0.1s ease-in; */

  &:hover {
    /* border-bottom: 1px solid #010514; */
    color: #2951DC;
    /* font-weight: 500; */
  }
`;

export { Link };
