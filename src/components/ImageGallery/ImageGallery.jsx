import { ImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery.styled';
import { LoadMoreButton } from 'components/Button/Button';
import Notiflix from 'notiflix';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

const { getImages } = require('services/api');

export class ImagesGallery extends Component {
  state = {
    images: [],
    total: 0,
    per_page: 12,
    page: 1,
    isBtnShow: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ images: [], page: 1, status: 'idle' });
      if (searchQuery.trim() === '') {
        Notiflix.Notify.warning('Write something!');
      } else {
        this.fetchImages(searchQuery, 1);
      }
    }

    if (
      prevState.page !== this.state.page &&
      this.state.status === 'idle' &&
      prevProps.searchQuery === searchQuery
    ) {
      if (this.props.searchQuery !== '') {
        this.fetchImages(this.props.searchQuery, page);
      }
    }
  }

  fetchImages = async (searchQuery, page) => {
    await this.setState({ status: 'pending' });
    try {
      const { hits, totalHits } = await getImages({
        searchQuery,
        page,
      });

      if (hits.length === 0) {
        Notiflix.Notify.failure('Write a valid value!');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error: error.message });
      this.setState({ status: 'rejected' });
    }
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        status: 'resolved',
      }),
      () => {
        this.fetchImages(this.props.searchQuery, this.state.page);
      }
    );
  };

  render() {
    const { total, images, page, status } = this.state;
    const totalPage = Math.ceil(total / 12);
    if (status === 'pending') {
      return <Loader />;
    }
    return (
      <>
        <ImageGallery>
          {status === 'resolved' &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageItem
                  key={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          {status === 'rejected' &&
            Notiflix.Notify.failure('Something went wrong!')}
        </ImageGallery>
        {images.length > 0 && totalPage > page && (
          <LoadMoreButton loadMore={this.handleLoadMore} />
        )}
      </>
    );
  }
}

ImagesGallery.propTypes = {
  searchQuery: PropTypes.string,
};
