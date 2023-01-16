import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { searchParams, notificationParams } from 'settings/settings';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { ModalInner } from 'components/Modal/ModalInner';
import { Container } from 'components/App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    receivedImages: [],
    isLoading: false,
    loadMoreBtnVisible: false,
    page: 1,
    url: '',
    alt: '',
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.page !== page) {
      this.fetchData(searchQuery);
    } else if (prevState.searchQuery !== searchQuery) {
      this.setState({
        receivedImages: [],
        page: 1,
      });
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModal = (url, alt) => {
    this.toggleModal();
    this.setState({ url: url, alt: alt });
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
        toast.error('No images found. Try again.', { notificationParams });
        return;
      }

      if (data.total > 0 && page === 1) {
        toast.success(`We found ${data.total} images!`, { notificationParams });
        this.setState({ loadMoreBtnVisible: true });
      } else if (data.total > 0 && page > 1 && data.hits.length < PER_PAGE) {
        toast.warning("You've reached the end of search results!", {
          notificationParams,
        });
        this.setState({ loadMoreBtnVisible: false });
      }

      this.setState(prevState => ({
        receivedImages: [...prevState.receivedImages, ...data.hits],
      }));
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
      toast.error('Oops, something went wrong. Try again.', {
        notificationParams,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      showModal,
      isLoading,
      receivedImages,
      loadMoreBtnVisible,
      alt,
      url,
    } = this.state;

    return (
      <Container>
        <Searchbar onFormSubmit={this.handleSearchFormSubmit}></Searchbar>
        <ImageGallery items={receivedImages} onHandleModal={this.handleModal} />
        {isLoading && <Loader />}
        {loadMoreBtnVisible && <Button onLoadMoreBtnClick={this.onLoadMore} />}
        <ToastContainer
          theme="colored"
          autoClose={notificationParams.autoClose}
        />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalInner url={url} alt={alt} />
          </Modal>
        )}
      </Container>
    );
  }
}
