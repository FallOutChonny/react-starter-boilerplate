/**
 * Just a very simple page that show how to use styled-components.
 */

import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { hot } from 'react-hot-loader';
import H1 from './H1';
import H2 from './H2';
import H5 from './H5';
import CardBody from './CardBody';
import ImageBox from './ImageBox';
import Card from './Card';

const AboutWrapper = styled.div`
  margin-top: 30px;
`;

const datas = [
  {
    id: 1,
    avatar: 'http://placehold.it/255x300',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Benoite Ernisse',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 2,
    avatar: 'http://placehold.it/255x300',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Tallulah Mccrosky',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 3,
    avatar: 'http://placehold.it/255x300',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Shirl Scudder',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 4,
    avatar: 'http://placehold.it/255x300',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    name: 'Maible Crower',
    position: 'Co-founder/ Operations',
    introudction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
];

function About() {
  return (
    <AboutWrapper>
      <Container>
        <Row>
          <Col md={12}>
            <H5>Our Team</H5>
          </Col>
          {datas.map(profile => (
            <Card key={profile.id}>
              <ImageBox
                avatar={profile.avatar}
                facebook={profile.facebook}
                twitter={profile.twitter}
                linkedin={profile.linkedin}
              />
              <CardBody>
                <H1>{profile.name}</H1>
                <H2>{profile.position}</H2>
                <p>{profile.introudction}</p>
              </CardBody>
            </Card>
          ))}
        </Row>
      </Container>
    </AboutWrapper>
  );
}

export default hot(module)(About);
