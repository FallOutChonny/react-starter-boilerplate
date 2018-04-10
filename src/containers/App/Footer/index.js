import React from 'react';
import HR from './HR';
import Ul from './Ul';
import P from './P';

const links = [
  {
    id: 1,
    name: 'twitter',
    url: 'http://twitter.com',
  },
  {
    id: 2,
    name: 'google-plus',
    url: 'http://plus.google.com.com',
  },
  {
    id: 3,
    name: 'github',
    url: 'http://github.com/',
  },
  {
    id: 4,
    name: 'facebook',
    url: 'http://facebook.com',
  },
];

export default function Footer() {
  return (
    <footer>
      <HR />
      <Ul>
        {links.map(x => (
          <li key={`footer-link-${x.id}`}>
            <a href={x.url}>
              <span className="fa-stack fa-lg">
                <i className="fas fa-circle fa-stack-2x" />
                <i className={`fab fa-${x.name} fa-stack-1x fa-inverse`} />
              </span>
            </a>
          </li>
        ))}
      </Ul>
      <P>Copyright © Your Website</P>
    </footer>
  );
}
