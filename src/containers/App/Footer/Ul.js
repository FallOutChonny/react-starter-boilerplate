import styled from 'styled-components';

export default styled.ul`
  margin-top: 10px;
  padding-left: 0;
  margin-left: -5px;
  list-style: none;
  text-align: center;

  > li {
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
  }

  li a {
    color: #343a40;
  }

  li a:hover {
    color: ${props => props.theme.primary};
  }
}
`;
