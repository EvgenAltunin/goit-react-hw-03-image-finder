import React from 'react';
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";

export const App = () => {
  return (
    <div>
      <Searchbar />
      <ImageGallery />
      <Loader />
      <Modal />
      <Button />
    </div>
  );
};
