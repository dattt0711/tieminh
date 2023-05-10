import React, { useState, useEffect } from 'react';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import { blogList } from '../../config/data';
import Button from 'react-bootstrap/Button';
import CreateModal from '../../components/Home/CreateModal';
import RatingStar from '../../components/common/RatingStar';
import PaginationComponent from '../../components/common/Pagination';
import { fetchCreateBlog, fetchDeleteBlogApi, fetchListBlogsApi, fetchEditBlog } from '../../api/blogsAPI.jsx';
const initialValue = {
  blogName: '',
  description: '',
  category: '',
  tags: '',
  image: '',
}
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const initPaginator = {
  pageCount: 10,
  currentPage: 1
}
const Home = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [paginator, setPaginator] = useState(initPaginator);
  const [searchKey, setSearchKey] = useState('');
  const [show, setShow] = useState(false);
  const [createParams, setCreateParams] = useState(initialValue);

  useEffect(async () => {
    const result = await fetchListBlogsApi();
    if (result.data.success) {
      setBlogs(result.data.data.items);
      setPaginator(result.data.data.paginator);
    }
  }, [])


  // Handle Dialog
  const handleCloseCreateModal = () => {
    setCreateParams(initialValue)
    setShow(false);
  }
  const handleOpenCreateModal = () => {
    setShow(true);
  }
  const handleSubmit = async () => {
    let formatTags = [];
    if (Array.isArray(createParams.tags)) {
      if (createParams.tags.length > 0) {
        formatTags = createParams.tags.map(tag => tag?.value);
      }
    }
    const tempParams = {
      ...createParams,
      tags: formatTags
    }
    await fetchCreateBlog(tempParams);
    setShow(false);
    setCreateParams(initialValue)
  }

  // handle create 
  const handleOnChange = (event, type = null) => {
    if (type) {
      setCreateParams({
        ...createParams,
        tags: event,
      })
    } else {
      setCreateParams({
        ...createParams,
        [event.target.name]: event.target.value,
      })
    }
  }

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogList;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(blogList);
    setSearchKey('');
  };

  return (
    <div>
      {/* Page Header */}
      <Header handleOpenCreateModal={handleOpenCreateModal} />
      
      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
      <div className="d-flex justify-content-center mt-2">
        <PaginationComponent paginator={paginator} />
      </div>

      <CreateModal
        show={show}
        handleClose={handleCloseCreateModal}
        handleSubmit={handleSubmit}
        title={'Create a new blog'}
        handleOnChange={handleOnChange}
        createParams={createParams}
        options={options}
      />
    </div>
  );
};

export default Home;
