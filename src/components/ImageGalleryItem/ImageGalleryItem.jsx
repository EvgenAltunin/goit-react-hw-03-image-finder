import { GalleryItem, ItemImage } from "components/ImageGalleryItem/ImageGalleryItem.styled";
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({ id, webformatURL, tags }) => (
  <GalleryItem key={id}>
    <ItemImage src={webformatURL} alt={tags} />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string
};