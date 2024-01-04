import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

const LinkIcon = styled.div`
  margin-left: 5px;

  & * {
    display: block;
  }
`;

const LinkLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  font-family: 'Poppins';
`;

interface ConditionalLinkProps extends LinkProps {
  isActive?: boolean;
}

const dynamicStyle = ({ isActive, ...props }: ConditionalLinkProps) => {
  if (isActive) {
    return css`
      background-color: #fdfdff; 
      color: #2951dc;
      box-shadow: 0 0 4px #bababa;
    `;
  } else {
    return css`
      &:hover {
        background-color: #2951dc; 
        color: #fdfdff;
        box-shadow: 0 0 4px #b2b2b2;
      }

      &:last-of-type {
        margin-bottom: 0px;
      }
    `;
  }
};
const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  width: 100%;
  margin: 8px 0px;
  position: relative;
  padding: 8px;
  box-sizing: border-box;
  color: #606060;
  background: transparent;
  border-radius: 7px;
  text-decoration: none;
    margin: 15px 0px;
    height: 50px;
  ${dynamicStyle}
`;

export { LinkIcon, LinkLabel, Link };
