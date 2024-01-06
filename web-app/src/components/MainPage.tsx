// src/components/MainPage.tsx
import React from 'react';
import { Container, Header, Main, Footer, Navbar } from './StyledComponents';
import RoundedProfileCard from './contentbox';

const handleOnline = () => {
  return true
}


const MainPage: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>PractiKey</h1>
      </Header>
      <Navbar>
        <ul>
          <li>Home</li>
          <li>Settings</li>
          <li>Contact</li>
        </ul>
      </Navbar>
      <Main>
        <RoundedProfileCard title={'Esslingen IOT WG'} profiles={[{ name: 'Louis', online: handleOnline() },{ name: 'Cedric', online: handleOnline() },{ name: 'Max', online: handleOnline() }]} />
      </Main>
      <Footer>
        <p>© 2024 PractiKey</p>
      </Footer>
    </Container>
  );
};

export default MainPage;