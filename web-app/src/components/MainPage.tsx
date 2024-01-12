// src/components/MainPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Header, Main, Footer, Navbar } from './StyledComponents';
import RoundedProfileCard from './contentbox';
import axios from 'axios';


const MainPage: React.FC = () => {
  const [atHomeC, setAtHomeC] = useState(true);
  const [atHomeL, setAtHomeL] = useState(false);
  const [atHomeM, setAtHomeM] = useState(false);

  const fetchData = async () => {
    await axios
      .get('http://localhost:3001/api/whoIsAtHome')
      .then((response) => {
        // Set state with result
        setAtHomeC(response.data.cedricAtHome);
        setAtHomeL(response.data.louisAtHome);
        setAtHomeM(response.data.maxAtHome);
      })
      .catch((error) => console.error('Error fetching items:', error));
  };

  useEffect(() => {
    // Fetch all items
    fetchData();


      // Set up polling to fetch data periodically (every 10 seconds in this example)
    const intervalId = setInterval(fetchData, 1000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
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
            { name: 'Louis', online: atHomeL },
            { name: 'Cedric', online: atHomeC },
            { name: 'Max', online: atHomeM },
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
