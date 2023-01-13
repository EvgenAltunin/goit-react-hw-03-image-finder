import React, { Component } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from "components/Loader/Loader";
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { Container } from 'components/App.styled';

// const API_KEY = '31555510-20bee98b1f3b8ae280fb0cd2b';
// const BASE_URL = 'https://pixabay.com/api/?';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    images: [],
    loading: false,
  };

  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src="" alt="" />
          </Modal>
        )}

        <Searchbar onFormSubmit={this.handleSearchFormSubmit}></Searchbar>
        <button type="button" onClick={this.togleModal}>
          Open modal
        </button>
        {this.state.images.length > 0 && <ImageGallery></ImageGallery>}
        <Loader />
        <Button />
      </Container>
    );
  }
}
