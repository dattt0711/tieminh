import React from 'react';
import './styles.css';

const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => (
  <div className='searchBar-wrap'>
    <form onSubmit={formSubmit}>
      <input
        type='text'
        placeholder='Search by blog name or category ...'
        value={value}
        onChange={handleSearchKey}
      />
      {value && <span onClick={clearSearch}>X</span>}
    </form>
  </div>
);

export default SearchBar;
