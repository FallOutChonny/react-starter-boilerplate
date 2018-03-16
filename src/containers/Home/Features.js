import React from 'react';
import P from './P';

const cards = [
  {
    id: 1,
    icon: 'fa fa-rocket',
    title: 'Production Ready',
    text:
      'Split vendor libraries to support for Long-Term Caching; route and component level code splitting; async load reducer and saga that are on the page to reduce bundle size.',
  },
  {
    id: 2,
    icon: 'fa fa-line-chart',
    title: 'Isomorphic, SEO friendly',
    text:
      'Shared app code between client and server (UI, routing, data fetching); pre-render on server-side to fast initial page load time and improve SEO purpose.',
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
      "Mainly use styled-components, it can ship only the styles that are on the page for the best performance. However you can still write scss, less, css, it's up to you.",
  },
  {
    id: 5,
    icon: 'fa fa-magic',
    title: 'Consistency Code',
    text:
      'Prettier and ESLint integrated to keep Consistently, High quality code, Prettier will performing when you commit, and ESLint will checking code on-the-fly.',
  },
  {
    id: 6,
    icon: 'fa fa-fire',
    title: 'Hot-reload',
    text:
      'Whenever you saved changes to the files in src folder are reflected instantaneously without refreshing the page.',
  },
  {
    id: 7,
    icon: 'fa fa-history',
    title: 'Predictable State',
    text:
      'Use Redux to manage app state and use Redux-Saga to handle async action flow; This project also integrate Redux-DevTools for better developer experience.',
  },
  {
    id: 8,
    icon: 'fa fa-rocket',
    title: 'Fast Webpack build',
    text:
      'Use Happypack, Webpack-DLL, Cache-Loader to Speed up webpack initial and rebuild time, increase your develop effciency.',
  },
];

export default function Features() {
  return (
    <div>
      <h2>Features</h2>
      <ul>
        {cards.map(x => (
          <li key={`feature-id-${x.id}`}>
            <P>
              <i className={x.icon} /> <strong>{x.title}:</strong> {x.text}
            </P>
          </li>
        ))}
      </ul>
    </div>
  );
}
