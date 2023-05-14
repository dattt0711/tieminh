import React, { useState } from 'react';
import BlogItem from './BlogItem';
import './styles.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import SearchBar from '../SearchBar';
const BlogList = ({ blogs, handleOpenCreateModal, handleFilterCaterogy, categories, selectedCategory, searchKey, clearSearch, formSubmit, handleSearchKey }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 1.5 + ITEM_PADDING_TOP,
      },
    },
  };
  return (
    <div>
      <div className='col-12 px-0 d-flex align-items-center' style={{ textAlign: 'right', margin: '20px 0' }}>
        <div className='col-8'>
          <SearchBar
          value={searchKey}
          clearSearch={clearSearch}
          formSubmit={formSubmit}
          handleSearchKey={(e) => handleSearchKey(e.target.value)}
          />
        </div>
        <Button variant="outlined" style={{ margin: '10px' }} size='medium' onClick={handleOpenCreateModal}
          startIcon={<AddCircleIcon fontSize="small" />}>
          Add Blog
        </Button>
        <FormControl variant='standard' style={{width: '150px', paddingBottom: '8px'}}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedCategory}
            label="Category"
            onChange={async (event) => await handleFilterCaterogy(event.target.value)}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map(x => {
              return <MenuItem value={x}> {x} </MenuItem>
            })}
          </Select>
        </FormControl>

      </div>
      <div className='col-10 px-0 mx-auto blogList-wrap'>
        {blogs.map((blog) => (
          <BlogItem blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
