import React from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from '../SearchBar';
import { Button } from 'react-bootstrap';
import StarImage from '../../../images/star.png';
const Header = (props) => {
  const { handleOpenCreateModal } = props;
  return <header className='home-header'>
    <Container>
      <Row className="d-flex align-items-center mb-3">
        <Col sm={2}>
          <span className="logo-text">Your Blog</span>
        </Col>
        <Col sm={8} >
          <SearchBar
          // value={searchKey}
          // clearSearch={handleClearSearch}
          // formSubmit={handleSearchBar}
          // handleSearchKey={(e) => setSearchKey(e.target.value)}
          />
        </Col>
        <Col sm={2}>
          <div style={{ textAlign: 'right', margin: '20px 0' }}>
            <Button onClick={() => handleOpenCreateModal()} className="btn-grad">Create</Button>
          </div>
        </Col>
      </Row>
      <Row >
        <Container className="box-header mb-4">
          <Col sm={8} className="left-box ps-5">
            <h2>This is Your Blog</h2>
            <p>Awesome place to make oneself</p>
            <p>Productive have entertained through daily updates</p>
          </Col>
          <Col sm={4}>
            {/* <img className="img-header" src={StarImage} alt="" /> */}
          </Col>
        </Container>
      </Row>
    </Container>
  </header>
};

export default Header;
