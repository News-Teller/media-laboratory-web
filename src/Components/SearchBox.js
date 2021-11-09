import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';

export default function SearchBox({
  placeholder,
  searchTerm,
  handleChange,
  searchContext
}) {
  const customSearchAdornment = (
    <InputAdornment position="start">
      <IconButton aria-label="search-selector" type="submit">
        {searchContext ? <SearchIcon /> : <PersonIcon />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl fullWidth variant="outlined">
      <OutlinedInput
        id="search-term"
        name="searchTerm"
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
        startAdornment={customSearchAdornment}
        value={searchTerm}
        onChange={handleChange}
      />
    </FormControl>
  );
};

SearchBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchContext: PropTypes.bool.isRequired,
};

