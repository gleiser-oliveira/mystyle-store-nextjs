import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';
import Cart from '../cart/Cart';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Search from '../search/Search';

import { Logo, StyledHeader } from './styles';

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = (e) => {
    NProgress.done();
    console.error('router error', e);
};

const Header = props => (
    <StyledHeader>
        <div className='bar'>
            <Logo>
                <Link href='/'>
                    <a href=''>My Style</a>
                </Link>
            </Logo>
            <Nav userData={props.userData} />
        </div>
        <div className='sub-bar'>
            <Search />
        </div>
        {props.userData && props.userData.me && <Cart userCart={props.userData.me.cart} />}
    </StyledHeader>
);

Header.propTypes = {
    userData: PropTypes.shape({
        me: PropTypes.object,
    }),
};

export default Header;
