import React, { Component } from 'react';

import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";

import { Container } from 'components/App.styled'

export class App extends Component {
  state = {
    showModal: false,
  }

  togleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }));
  };
  
  render() {
    const { showModal } = this.state;


    return (
      <Container>
        <button
          type='button' onClick={this.togleModal}>Open modal</button>
        {showModal &&
          <Modal>
            <img src="" alt="" />
            <button type='button' onClick={this.togleModal}>X</button>
          </Modal>}         
        <Searchbar />
        <ImageGallery />
        <Button />
      </Container>
  );
  }
};
