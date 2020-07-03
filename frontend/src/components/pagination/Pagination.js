import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { PaginationStyle } from './styles';
import { perPage } from '../../config';

const Pagination = props => {
    return (
        <Query query={props.query} variables={props.variables}>
            {(payload) => {
                if (payload.loading)
                    // props.loading.event(props.loading.name, true);
                    return null;
                else {
                    props.loading.event(props.loading.name, false);
                    if (payload.error)
                        return <p>Error: {payload.error.message}</p>;
                    const numObjects = payload.data[props.connectionName].aggregate.count;
                    let pages = Math.ceil(numObjects / perPage);
                    if (pages === 0)
                        pages = 1;
                    const { page } = props;
                    return (
                        <PaginationStyle>
                            <Head>
                                <title>My Style | Page {page} of {pages}</title>
                            </Head>
                            <Link href={{
                                pathname: props.pathname,
                                query: { page: page - 1 },
                            }}>
                                <a className='prev' aria-disabled={page <= 1}>
                                    Prev
                                </a>
                            </Link>
                            <p>Page {page} of {pages}</p>
                            <p data-test='pagination'>{numObjects} {props.nameObjects} Total</p>
                            <Link href={{
                                pathname: props.pathname,
                                query: { page: page + 1 },
                            }}>
                                <a className='next' aria-disabled={page >= pages}>
                                    Next
                                </a>
                            </Link>
                        </PaginationStyle>
                    );
                }
            }}
        </Query>
    );
};

Pagination.propTypes = {
    query: PropTypes.object.isRequired,
    variables: PropTypes.object,
    connectionName: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
    loading: PropTypes.object.isRequired,
    nameObjects: PropTypes.string,
};

export default Pagination;
