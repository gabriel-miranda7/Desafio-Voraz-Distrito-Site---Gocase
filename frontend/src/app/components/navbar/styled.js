import styled from "styled-components";
import Image from 'next/image';

export const NavHead = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1% 0 1%;
  color: white;
  font-weight: 600;
  background-color: #A83050;
  height: 3vh;

`;

export const Nav = styled.nav`
  display: flex;
  align-items: center ;
  justify-content: space-around;
  background-color: #F4F4F4;
  height: 7vh;

`;

export const SearchBar = styled.input`
    background-color: #D9D9D9;
    padding: 5px;
    width: 20%;
    border-radius: 10px;
`

export const LogoImage = styled(Image)`
  width: 60px; /* Ajuste o tamanho conforme necessário */
  height: auto;
  cursor: pointer;
  margin-right: 10px;
`;

export const NavItems = styled.ul`
  display: inline-block;
`;

export const NavItem = styled.li`
  margin-right: 10px;
  font-weight: 400;
  display: inline-block;
`;

export const NavLink = styled.a`
  color: black;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: color 0.3s ease;
  &:hover {
    color: #A83050;
  }
`;
