import {
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageItem = ({ id, webformatURL, tags }) => {
  return (
    <ImageGalleryItem key={id}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} />
    </ImageGalleryItem>
  );
};
