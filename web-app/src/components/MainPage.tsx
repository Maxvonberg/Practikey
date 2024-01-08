// src/components/MainPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Header, Main, Footer, Navbar } from './StyledComponents';
import RoundedProfileCard from './contentbox';
import axios from 'axios';

const handleOnlineCedric = () => {
  axios.get('http://localhost:3001/api/whoIsAtHome').then((response) => {
    return response.data.cedricAtHome;
  });
};

const handleOnlineLouis = () => {
  axios.get('http://localhost:3001/api/whoIsAtHome').then((response) => {
    return response.data.louisAtHome;
  });
};

const handleOnlineMax = () => {
  axios.get('http://localhost:3001/api/whoIsAtHome').then((response) => {
    return response.data.maxAtHome;
  });
};

const MainPage: React.FC = () => {
  const [atHomeC, setAtHomeC] = useState([]);
  const [atHomeL, setAtHomeL] = useState([]);
  const [atHomeM, setAtHomeM] = useState([]);

  useEffect(() => {
    // Fetch all items
    axios
      .get('http://localhost:3001/api/whoIsAtHome')
      .then((response) => {
        // Set state with result
        setAtHomeC(response.data.cedricAtHome);
        setAtHomeL(response.data.louisAtHome);
        setAtHomeM(response.data.maxAtHome);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);



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
        <RoundedProfileCard
          title={'Esslingen IOT WG'}
          profiles={[
            { name: 'Louis', online: atHomeL[0] },
            { name: 'Cedric', online: atHomeC[0] },
            { name: 'Max', online: atHomeM[0] },
          ]}
        />
      </Main>
      <Footer>
        <p>© 2024 PractiKey</p>
      </Footer>
    </Container>
  );
};

export default MainPage;
