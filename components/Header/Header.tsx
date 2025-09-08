'use client';

import Link from 'next/link';
import css from './Header.module.css';
import React from 'react';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerLink} href="/">
              Home
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
