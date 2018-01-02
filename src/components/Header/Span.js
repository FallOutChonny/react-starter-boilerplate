import styled from 'styled-components';

export default styled.span`
  color: #fff;
  font-size: 1.125rem;

  &:hover {
    color: ${props => props.theme.brandPrimary};
  }
`;
