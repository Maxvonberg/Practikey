import React from 'react';
import styled from 'styled-components';

const image = require('../assets/profile.png');

interface Profile {
  name: string;
  online: boolean;
}

interface RoundedProfileCardProps {
  title: string;
  profiles: Profile[];
}

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  width: 100%;
  max-width: 400px; /* Set a max-width for responsiveness */
  margin: 0 auto; /* Center the container */
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the content horizontally */
  margin-bottom: 8px;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 16px;
`;

const ProfileInfo = styled.div`
  flex-grow: 1;
    text-align: left;
  
`;

const OnlineIndicator = styled.div<{ online: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => (props.online ? 'green' : 'red')};
`;

const ChatIcon = styled.span`
  margin-left: 8px;
`;


const RoundedProfileCard: React.FC<RoundedProfileCardProps> = ({ title, profiles }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {profiles.map((profile, index) => (
        <ProfileContainer key={index}>
          <ProfilePicture src={image} />
          <ProfileInfo>
            <div>{profile.name}
            </div>
          </ProfileInfo>
          <ChatIcon>🗨️</ChatIcon>
            <OnlineIndicator online={profile.online} />
        </ProfileContainer>
      ))}
    </Container>
  );
};

export default RoundedProfileCard;