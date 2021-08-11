import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer'

function Page({ title, component }) {
  useEffect(() => {
    if (title) document.title = title + ' | Media Laboratory';
    else document.title = 'Media Laboratory';
  }, [title]);

  return (
    <>
    {React.createElement(component)}
    <Footer />
    </>
  )
}

Page.propTypes = {
  title:  PropTypes.string,
  component: PropTypes.func.isRequired,
};

Page.defaultTypes = {
  title: null,
};


export default Page;
