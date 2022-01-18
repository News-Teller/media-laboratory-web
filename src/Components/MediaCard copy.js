import React from "react";
import PropTypes from "prop-types";

import paperclip from ".././img/paperclip-light.svg";


export default function MediaCard({
  id,
  term,
  definition,
  link,
  synonyms,
  tags,
  isSelected,
  onSelection,
  isDisabled,
}) {
  return (
    <div className="bg-gray-100 p-6 rounded-sm">
      <div>
        <h5>{term}</h5>
      </div>

      <div>
        <div>{definition}</div>
      </div>
      <div className="border-t border-gray-300 pt-3 mt-6">
        <div className="">
          <a className="text-xs text-primary leading-tight flex" href={link}>
          <img className="w-2 mr-2" src={paperclip} alt={paperclip} /> 
          source
          </a>
        </div>
        <div className="flex ">
          <p className="text-xs text-gray-500">tags:</p>
          {tags.map((tag) => (
            <p className="text-xs px-2 ">{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

MediaCard.propTypes = {
  id: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelection: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

MediaCard.defaultProps = {
  isSelected: false,
  isDisabled: false,
};
