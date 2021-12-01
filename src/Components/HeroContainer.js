import React from 'react';
import PropTypes from 'prop-types';


function HeroContainer(props) {
  const { title, subtitle } = props;

  return (
      <div className="bg-gray-100 p-20 mb-10 border-b-4 border-dotted border-primary">
        <div className="container lg:pl-20">
          <h1  className="text-6xl font-ttnorms text-primary mb-3">{title}</h1>
          <h2  className="text-3xl font-ttnormslight">{subtitle}</h2>
        </div>
      </div>
  );
}

HeroContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};


export default HeroContainer;
