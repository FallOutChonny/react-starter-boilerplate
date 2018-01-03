import React from 'react';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import Row from 'reactstrap/lib/Row';

const cards = [
  {
    id: 1,
    icon: 'rocket',
    title: 'Production Ready',
    text:
      'Split vendor libraries, and contains route and component based code splitting, ship only the js, reducer and saga that are on the page',
  },
  {
    id: 2,
    icon: 'line-chart',
    title: 'Isomorphic, SEO friendly',
    text:
      'Shared app code between client and server (UI, routing, data fetching); fast initial page load time; pre-rendering of the critical CSS.',
  },
  {
    id: 3,
    icon: 'code',
    title: 'ES6+ support',
    text:
      'You can use all of es6 features, such as template string, object destructuring, arrow function, decorator, class and more.',
  },
  {
    id: 4,
    icon: 'magic',
    title: 'Next-generation CSS',
    text:
      "Mainly use styled-components, it can ship only the styles that are on the page for the best performance. but you can still write scss, less, css, it's up to you.",
  },
];

export default function FeatureCards() {
  return (
    <Row>
      {cards.map(x => (
        <Col md={3} key={`feature-card-${x.id}`}>
          <Card>
            <CardBody>
              <CardTitle>
                <i className={`fa fa-${x.icon}`} /> {x.title}
              </CardTitle>
              <CardText>{x.text}</CardText>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
