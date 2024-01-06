import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
`;

export const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 12px;
  text-align: center;
`;

export const Navbar = styled.nav`
  background-color: #444;
  padding: 8px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;

    li {
      margin-right: 16px;
      color: white;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const Main = styled.main`
  padding: 16px;
`;

export const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 12px;
  text-align: center;
`;