import axios from 'axios';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { Container } from 'components/App.styled';

const searchParams = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '31555510-20bee98b1f3b8ae280fb0cd2b',
  IMAGE_TYPE: 'photo',
  ORIENTATION: 'horizontal',
  PER_PAGE: 5,
};

// https://pixabay.com/api/?q=cat&page=1&key=31555510-20bee98b1f3b8ae280fb0cd2b&image_type=photo&orientation=horizontal&per_page=12

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    receivedImages: [],
    isLoading: false,
    isError: false,
    loadMoreBtnVisible: false,
    page: 1,
    selectedImgSrc: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.fetchData(searchQuery);
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSearchFormSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
    });
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  fetchData = async () => {
    const { BASE_URL, API_KEY, IMAGE_TYPE, ORIENTATION, PER_PAGE } =
      searchParams;
    const { searchQuery, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const { data } = await axios.get(
        `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&per_page=${PER_PAGE}`
      );

      if (data.total === 0) {
        toast.error('No images found. Try again.', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        return;
      }

      if (data.total > 0 && page === 1) {
        toast.success(`We found ${data.total} images!`, {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        this.setState({ loadMoreBtnVisible: true });

      } else if (data.total > 0 && page > 1 && data.hits.length < PER_PAGE) {
        toast.warning("You've reached the end of search results!", {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        this.setState({ loadMoreBtnVisible: false });
      }

      this.setState(prevState => ({ receivedImages: [...prevState.receivedImages, ...data.hits]}));
      this.setState({ isLoading: false });

    } catch (error) {
      console.log(error);
      this.setState({ isError: error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { showModal, isLoading, receivedImages, loadMoreBtnVisible } =
      this.state;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src="" alt="" />
          </Modal>
        )}
        <Searchbar onFormSubmit={this.handleSearchFormSubmit}></Searchbar>
        {/* <button type="button" onClick={this.togleModal}>
          Open modal
        </button> */}
        <ImageGallery items={receivedImages} />
        {isLoading && <Loader />}
        {loadMoreBtnVisible && (
          <Button onLoadMoreBtnClick={this.onLoadMore} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    );
  }
}
