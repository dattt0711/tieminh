import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';
import CommentsComponent from './components/Comments';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tag from '../../components/common/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { fetchInfoBlogApi, fetchEditBlog, fetchRelatedListBlogsApi, fetchDeleteBlogApi } from '../../api/blogsAPI';
import { fetchListCommentsApi, fetchCreateComment } from '../../api/commentsAPI';
import CommentModal from './components/CommentModal';
import EditModal from './components/EditModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, Chip, Modal, Snackbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const initialCommentValue = {
  "username": "",
  "comment": "",
  "rating": "",
}
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
const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentParams, setCommentParams] = useState(initialCommentValue);
  const [editParams, setEditParams] = useState(initialValue);
  const [relatedList, setRelatedList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const history = useHistory();

  function goToHome() {
    history.push("/");
  }
  useEffect(async () => {
    const result = await fetchInfoBlogApi(id);
    if (result) {
      setBlog(result.data.data);
      const tempTags = result.data.data.tags.map(tag => {
        const findTag = options.find(op => op.value === tag);
        if (findTag) return findTag;
        return {
          value: tag,
          label: "Not found"
        }
      })
      setEditParams({
        ...result.data.data,
        tags: tempTags,
      });
      const dataRelatedList = await fetchRelatedListBlogsApi({
        category: result.data.data.category,
      })
      setRelatedList(dataRelatedList.data.data.items);
    }
  }, []);
  useEffect(async () => {
    if (blog) {
      const result = await fetchListCommentsApi({ blogObjId: blog?._id });
      if (result) {
        setComments(result.data.data)
      }
    }
  }, [blog])
  const handleOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  }
  const handleCloseCommentDialog = () => {
    setCommentParams(initialCommentValue);
    setOpenCommentDialog(false);
  }
  const handleSubmitComment = async () => {
    await fetchCreateComment({
      ...commentParams,
      blogId: id,
    });
    const result = await fetchListCommentsApi({ blogObjId: blog?._id });
    if (result) {
      setComments(result.data.data)
    }
    setComments(result.data.data);
    setCommentParams(initialCommentValue);
    setOpenCommentDialog(false);
  }
  const handleOnChange = (event) => {
    setCommentParams({
      ...commentParams,
      [event.target.name]: event.target.value,
    })
  }
  const handleRating = (rating) => {
    setCommentParams({
      ...commentParams,
      rating,
    })
  }
  const handleCloseSnackbar = () => {
    setSnackbarState({ ...snackbarState, openFail: false, openSuccess: false });
  };
  // Edit blog
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  }
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  }
  const handleSubmitEdit = async () => {
    let formatTags = [];
    if (Array.isArray(editParams.tags)) {
      if (editParams.tags.length > 0) {
        formatTags = editParams.tags.map(tag => tag?.value);
      }
    }
    const tempParams = {
      ...editParams,
      tags: formatTags,
      blogId: id,
    }
    let result = await fetchEditBlog(tempParams);
    setBlog(result.data.data)
    setShowEditModal(false);
    setEditParams(initialValue)
  }

  const handleDeleteBlog = async () => {
    const tempParams = {
      blogId: id,
    }
    let result = await fetchDeleteBlogApi(tempParams);
    setShowDeleteModal(false);
    console.log(result);
    if (result.data.success) {
      goToHome()
    } else {
      setSnackbarState({...snackbarState, openFail: true})
    }
  }

  // handle edit
  const handleOnChangeEdit = (event, type = null) => {
    if (type) {
      setEditParams({
        ...editParams,
        tags: event,
      })
    } else {
      setEditParams({
        ...editParams,
        [event.target.name]: event.target.value,
      })
    }
  }
  const dataSample = [{}, {}, {}];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [snackbarState, setSnackbarState] = useState({
    openFail: false,
    openSuccess: false,
    vertical: 'top',
    horizontal: 'right',
  });

  // const dataTagList = [{}, {}, {}];
  return (
    <div className='container'>
       <Snackbar
        anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
        open={snackbarState.openFail}
        onClose={handleCloseSnackbar}
        autoHideDuration={3500}
        key={snackbarState.vertical + snackbarState.horizontal}
      >
        {
          snackbarState.openFail && 
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            Delete blog failed!
          </Alert>
        }
      </Snackbar>
      <Link className='blog-goBack' to='/'>
        <Chip label="Go back" color="primary" variant="outlined" icon={<ArrowBackIcon />}/>
      </Link>
      <Container>
        <Row>
          <Col sm={1} ></Col>
          <Col sm={8} >
            {blog ? (
              <div className='blog-wrap'>
                <header>
                  <p className='blog-date'>Published {blog.createdAt}</p>
                  <h1>{blog.blogName}</h1>
                  <div className='blog-subCategory'>
                    <Chip color='primary' label={blog.category} />
                  </div>
                </header>
                <img src={blog.image} alt='cover' />
                <p className='blog-desc border-bottom'>{blog.description}</p>
                <div className='d-flex justify-content-end my-3'>
                  <Chip color='primary' onClick={handleOpenEditModal} label="Edit blog" icon={<EditIcon fontSize='small' />} className="mr-3" style={{ marginRight: '10px' }} />
                  <Chip color='error' onClick={() => setShowDeleteModal(true)} label="Delete blog" icon={<DeleteIcon fontSize='small' />} className="sm" />
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <div className="d-flex justify-content-end tag-list mb-2">
                    {blog.tags.map((tag, index) => {
                      if (index > 2) {
                        if (index > 3) return;
                        return <span className="me-2 d-flex align-items-end">...</span>
                      } else {
                        return <Tag
                          label={tag}
                        />
                      }
                    })
                    }
                  </div>
                </div>
                <div className="blog-comment mt-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <h2 className="comment-title">
                      Blog comment
                    </h2>
                    <Button
                      onClick={handleOpenCommentDialog}
                      variant="primary">
                      <FontAwesomeIcon
                        style={{ color: "#fff" }}
                        icon={faComment} />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <CommentsComponent
                      comments={comments}

                    />
                  </div>
                </div>
              </div>
            ) : (
              <EmptyList />
            )}
          </Col>
          <Col sm={3} className="mt-4">
            <h3>Related blog</h3>
            {relatedList.map(data => (
              <Card style={{ maxWidth: '18rem' }} className="mb-5">
                <Card.Img variant="top" src="http://localhost:3000/assets/images/designer-1.jpg" />
                <Card.Body>
                  <Card.Title>
                    <div className="d-flex justify-content-between">
                      <span>{data.blogName}</span>
                      {/* <RatingStar maxRating={5} value={data.rating} isShowValue={true} /> */}
                    </div>
                  </Card.Title>
                  <Card.Text className="border-bottom pb-2">
                    {data.description}
                  </Card.Text>
                  <div className="d-flex justify-content-end tag-list">
                    {data?.tags?.length > 0 && blog.tags.map((tag, index) => {
                      if (index > 2) {
                        if (index > 3) return;
                        return <span className="me-2 d-flex align-items-end">...</span>
                      } else {
                        return <Tag
                          label="tag1"
                        />
                      }
                    })
                    }
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
        <CommentModal
          show={openCommentDialog}
          handleClose={handleCloseCommentDialog}
          handleSubmit={handleSubmitComment}
          handleOnChange={handleOnChange}
          commentParams={commentParams}
          handleRating={handleRating}
        />
        <EditModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleSubmit={handleSubmitEdit}
          title={'Edit a blog'}
          handleOnChange={handleOnChangeEdit}
          editParams={editParams}
          options={options}
        />
        <Modal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Do you want to delete this blog?
            </Typography>
            <div className='d-flex justify-content-end mt-2'>
            <Button variant="contained" color='success' size='small' style={{marginRight: "5px"}} onClick={() => handleDeleteBlog()}>Yes</Button>
              <Button variant="contained" color='error' size='small' onClick={() => setShowDeleteModal(false)}>No</Button>
            </div>
          </Box>
        </Modal>
      </Container >


    </div>
  );
};

export default Blog;
