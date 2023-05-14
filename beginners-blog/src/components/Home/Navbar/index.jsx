import React from 'react';
import Container from 'react-bootstrap/Container';

const Navbar = (props) => {
  const { handleOpenCreateModal } = props;

  return (
    <Container>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">My Blog</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-flex" id="navbarSupportedContent">
          
          </div>
        </nav>
      </div>
    </Container>
  )
};

export default Navbar;
