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
    icon: 'fa fa-rocket',
    title: 'Production Ready',
    text:
      'Split vendor libraries to support long-term caching; route and component level code splitting; async load for reducer and saga that are on the page.',
  },
  {
    id: 2,
    icon: 'fa fa-line-chart',
    title: 'Isomorphic, SEO friendly',
    text:
      'Shared app code between client and server (UI, routing, data fetching); pre-render on server-side to fast initial page load time and improve SEO',
  },
  {
    id: 3,
    icon: 'fa fa-code',
    title: 'ES6+ support',
    text:
      'You can use all of es6+ features, such as template string, object destructuring, arrow function, decorator, class, static method and more.',
  },
  {
    id: 4,
    icon: 'fa fa-paint-brush',
    title: 'Next-generation CSS',
    text:
      "Mainly use styled-components, it can ship only the styles that are on the page for the best performance. but you can still write scss, less, css, it's up to you.",
  },
  {
    id: 5,
    icon: 'fa fa-magic',
    title: 'Formatter and Linter',
    text:
      'Prettier and ESLint integrated to keep Consistently, High quality code, preitter will performing code formatting when you commit.',
  },
  {
    id: 6,
    icon: 'fa fa-fire',
    title: 'Hot-reload',
    text:
      'Hot-reload both on client-side and server-side, hot-reload all the things!',
  },
  {
    id: 7,
    icon: 'fa fa-history',
    title: 'State management',
    text:
      'Using Redux to manage app state, and using Redux-Saga to handle async action flow; integrate Redux-DevTools for better debug experience.',
  },
  {
    id: 8,
    icon: 'fa fa-rocket',
    title: 'Webpack v3 and babel v7',
    text:
      'webpack v3 for tree-shaking; babel v7 for polyfill load on-demand; happypack, dll, cache integrated, fast webpack initial and rebuild time.',
  },
];

const cardStyles = {
  mb25: { marginBottom: '25px' },
  cardHeight: { minHeight: '220px' },
};

export default function FeatureCards() {
  return (
    <Row>
      {cards.map(x => (
        <Col md={3} key={`feature-card-${x.id}`} style={cardStyles.mb25}>
          <Card style={cardStyles.cardHeight}>
            <CardBody>
              <CardTitle>
                <i className={x.icon} /> {x.title}
              </CardTitle>
              <CardText>{x.text}</CardText>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
