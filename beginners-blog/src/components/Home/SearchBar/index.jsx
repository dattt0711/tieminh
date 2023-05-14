import React, { useEffect } from 'react';
import './styles.css';
import { Chip } from '@mui/material';

const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => {
  
  return (
  <div className='searchBar-wrap'>
    <form>
      <input
        key={value}
        type='text'
        placeholder='Search by blog name...'
        value={value}
        onChange={handleSearchKey}
      />
      <Chip color='primary' type='button' onClick={() => formSubmit()} label="Search"></Chip>
    </form>
  </div>
  )
  };

export default SearchBar;
