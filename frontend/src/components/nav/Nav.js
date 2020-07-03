import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { StyledNav } from './styles';
import Signout from '../authentication/Signout';
import NeedsPermission from '../authentication/NeedsPermission';
import { TOGGLE_CART_MUTATION } from '../../lib/ClientGQL/LocalGQL';
import CartCount from '../cart/CartCount';

const Nav = props => (
    <StyledNav>
        {props.userData && props.userData.me && (
            <>
                <div className='usr'> Logged as: {props.userData.me.name}</div>
            </>
        )}
        <Link href='/products'>
            <a>Shop</a>
        </Link>
        {props.userData && props.userData.me && (
            <>
                <NeedsPermission neededPermission={['ADMIN']} user={props.userData.me} showMessage={false}>
                    <Link href='/permissions'>
                        <a>Admin</a>
                    </Link>
                </NeedsPermission>
                <NeedsPermission neededPermission={['PRODUCT_CREATE']} user={props.userData.me} showMessage={false}>
                    <Link href='/sell'>
                        <a>Sell</a>
                    </Link>
                </NeedsPermission>
                <Link href='/orders'>
                    <a>Orders</a>
                </Link>
                <Signout />
            </>
        )}
        {props.userData && props.userData.me && (
            <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => (
                    <button onClick={toggleCart}>
                        {'\u{1F6D2}'}
                        <CartCount count={props.userData.me.cart.reduce((a, b) => a + b.quantity, 0)} />
                    </button>
                )}
            </Mutation>
        )}
        {!props.userData.me && (
            <Link href='/signup'>
                <a>Signup</a>
            </Link>
        )}
    </StyledNav>
);

Nav.propTypes = {
    userData: PropTypes.shape({
        me: PropTypes.shape({
            name: PropTypes.name,
            cart: PropTypes.array,
        }),
    }),
};

export default Nav;
