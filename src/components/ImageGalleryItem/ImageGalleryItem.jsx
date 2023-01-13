import { GalleryItem, ItemImage } from "components/ImageGalleryItem/ImageGalleryItem.styled";

export const ImageGalleryItem = ({src}) => (
  <GalleryItem>
    <ItemImage src={src} alt="" />
  </GalleryItem> 
);
