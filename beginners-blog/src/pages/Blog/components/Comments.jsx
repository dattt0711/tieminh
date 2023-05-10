import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import RatingStar from '../../../components/common/RatingStar';

const CommentsComponent = (props) => {
    const { comments } = props;
    return (
        <Container>
            {comments.map((data) => (
                <Row className="comment-item d-flex align-items-center mb-4">
                    <Col sm={2}>
                        <div className="avatar d-flex align-items-center justify-content-center">
                            <img src="http://localhost:3000/assets/images/designer-1.jpg" alt="" />
                        </div>
                    </Col>
                    <Col sm={10}>
                        <div className="d-flex justify-content-between">
                            <h4>User</h4>
                            <RatingStar maxRating={5} value={data?.rating} isShowValue={true} />
                        </div>
                        <p>{data?.comment}</p>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}
export default CommentsComponent;