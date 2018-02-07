import React from 'react';
import styled from 'styled-components';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import H1 from './H1';
import H2 from './H2';
import H6 from './H6';
import ImageBox from './ImageBox';
import Card from './Card';

const AboutWrapper = styled.div`
  margin-top: 30px;
`;

const datas = [
  {
    id: 1,
    avatar: 'http://nabeel.co.in/files/bootsnipp/team/1.jpg',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Chonny Chu',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 2,
    avatar: 'http://nabeel.co.in/files/bootsnipp/team/2.jpg',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Jacky Wu',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 3,
    avatar: 'http://nabeel.co.in/files/bootsnipp/team/3.jpg',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Chonny Chu',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 4,
    avatar: 'http://nabeel.co.in/files/bootsnipp/team/4.jpg',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Michael Jackson',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
];

export default function About() {
  return (
    <AboutWrapper>
      <Container>
        <Row>
          <Col md={12}>
            <H6>Our Team</H6>
          </Col>
          {datas.map(profile => (
            <Card key={profile.id}>
              <ImageBox
                avatar={profile.avatar}
                facebook={profile.facebook}
                twitter={profile.twitter}
                linkedin={profile.linkedin}
              />
              <H1>{profile.name}</H1>
              <H2>{profile.position}</H2>
              <p>{profile.introudction}</p>
            </Card>
          ))}
        </Row>
      </Container>
    </AboutWrapper>
  );
}
