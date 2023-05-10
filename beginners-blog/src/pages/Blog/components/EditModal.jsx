import React from 'react'
import ModalComponent from '../../../components/common/Modal';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
const EditModal = (props) => {
    const { handleClose, handleSubmit, title, show,
        editParams, handleOnChange, options
    } = props;

    return (
        <ModalComponent
            show={show}
            title={title}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        >
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Blog name</Form.Label>
                    <Form.Control
                        value={editParams.blogName}
                        onChange={(event) => handleOnChange(event)}
                        type="text"
                        placeholder="Enter blog name"
                        name="blogName"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        name="description"
                        value={editParams.description}
                        onChange={(event) => handleOnChange(event)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="category"
                        aria-label="Default select example"
                        value={editParams.category}
                        onChange={(event) => handleOnChange(event)}
                    >
                        <option value="">Open this category menu</option>
                        <option value="Sport">Sport</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Art">Art</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Image url</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter URL"
                        name="image"
                        value={editParams.image}
                        onChange={(event) => handleOnChange(event)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tags</Form.Label>
                    <Select
                        name="tags"
                        options={options}
                        isMulti
                        placeholder="Select tags"
                        value={editParams.tags}
                        onChange={(event) => handleOnChange(event, "tags")}
                    />
                </Form.Group>
            </Form>
        </ModalComponent>
    )
}

export default EditModal;