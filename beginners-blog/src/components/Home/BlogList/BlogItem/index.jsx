import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    description,
    blogName,
    createdAt,
    authorName,
    authorAvatar,
    image,
    category,
    _id,
  },
}) => {
  return (
    <div className='blogItem-wrap'>
      <img className='blogItem-cover mb-3' src={image} alt='image' />
      <Chip label={category} />
      <h3>{blogName}</h3>
      <p className='blogItem-desc'>{description}</p>
      <footer>
        <div className='blogItem-author'>
          <img src='/assets/images/author.jpg' alt='avatar' />
          <div>
            <h6>John Doe</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <Link className='blogItem-link' to={`/blog/${_id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
