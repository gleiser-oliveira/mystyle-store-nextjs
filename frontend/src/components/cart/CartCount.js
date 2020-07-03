import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Dot, CountAnimation } from './styles';

const CartCount = props => {
    return (
        <CountAnimation>
            <TransitionGroup>
                <CSSTransition
                    unmountOnExit
                    className="count"
                    classNames="count"
                    key={props.count}
                    timeout={{ enter: 400, exit: 160 }}
                >
                    <Dot>{props.count}</Dot>
                </CSSTransition>
            </TransitionGroup>
        </CountAnimation>
    );
};

CartCount.propTypes = {
    count: PropTypes.number,
};

export default CartCount;
