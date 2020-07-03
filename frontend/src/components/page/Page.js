import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Meta from '../meta/Meta';
import User from '../authentication/User';
import { StyledPage, Inner } from './style';
import { theme } from '../theme/theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'radnika_next';
        src: url('../static/radnikanext-medium-webfont.woff2')format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.8rem;
        line-height: 2;
        font-family: 'Work Sans', sans-serif;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`;

class Page extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyle />
                    <StyledPage>
                        <Meta/>
                        <User>
                            {userPayload => !userPayload.loading && (
                                <>
                                    <Header userData={userPayload.data}/>
                                    <Inner>
                                        {userPayload.data ? React.cloneElement(this.props.children, { userData: userPayload.data.me }) : this.props.children }
                                    </Inner>
                                    <Footer/>
                                </>
                            )}
                        </User>
                    </StyledPage>
                </>
            </ThemeProvider>
        );
    }
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default Page;
