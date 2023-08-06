// import axios from 'axios';
import { ImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery.styled';
import { ThreeDots } from 'react-loader-spinner';
import { LoadMoreButton } from 'components/Button/Button';

const { getImages } = require('services/api');

// const images = getImages()
// console.log(images);

// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export class ImagesGallery extends Component {
  state = {
    images: [],
    total: 0,
    per_page: 12,
    page: 1,
    isLoading: false,
    status: 'idle',
    // showModal: false,
    // largeImage: '',
    // error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      const { hits, totalHits } = await getImages({
        searchQuery: this.props.searchQuery,
      });
      this.setState({ images: hits, total: totalHits, status: 'resolved' });
    }
  }
  //   onOpenModal = largeImage => {
  //     this.setState({
  //       showModal: true,
  //       largeImage: largeImage,
  //     });
  //   };

  //   onCloseModal = () => {
  //     this.setState({
  //       showModal: false,
  //       largeImage: '',
  //     });
  //   };
  render() {
    return (
      <ImageGallery>
        {this.state.status === 'pending' && <ThreeDots />}
        {/* {isLoading && <ThreeDots />} */}

        {/* {this.state.images.map(({ id, webformatURL, tags }) => {
          return <ImageItem key={id} webformatURL={webformatURL} tags={tags} />;
        })} */}

        {this.state.status === 'resolved' &&
          this.state.images.map(({ id, webformatURL, tags }) => {
            return (
              <ImageItem key={id} webformatURL={webformatURL} tags={tags} />
            );
          })}
        {this.state.status === 'rejected' && <div>Error</div>}
        <LoadMoreButton />
      </ImageGallery>
    );
  }
}
