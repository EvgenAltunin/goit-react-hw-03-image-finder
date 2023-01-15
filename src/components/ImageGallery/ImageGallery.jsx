import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "components/ImageGallery/ImageGallery.styled";
import PropTypes from 'prop-types';


export const ImageGallery = ({ items }) => {
  return (
    <Gallery>
      {items.map(item => {
        return <ImageGalleryItem
          id={item.id}
          webformatURL={item.webformatURL}
          tags={item.tags}
        />;
      })}
        

    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired
};