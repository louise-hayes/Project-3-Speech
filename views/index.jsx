import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';

export default function Index(props) {
  return (<Layout bluemixAnalytics={props.bluemixAnalytics} ></Layout>);
}

Index.defaultProps = {
  bluemixAnalytics: false,
};

Index.propTypes = {
  bluemixAnalytics: PropTypes.bool,
};
