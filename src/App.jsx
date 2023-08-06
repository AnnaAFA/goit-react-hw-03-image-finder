import { LoadMoreButton } from 'components/Button/Button';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
// import { ThreeDots } from 'react-loader-spinner';
import { Wrapper } from './App.styled';
import { ImagesGallery } from './components/ImageGallery/ImageGallery';
import debounce from 'lodash.debounce';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = debounce(searchQuery => {
    console.log(this.state.searchQuery);
    this.setState({ searchQuery });
  }, 1000);

  render() {
    return (
      <Wrapper>
        <SearchBar onChange={this.handleSearch} />

        <ImagesGallery searchQuery={this.state.searchQuery} />
        {/* <ThreeDots /> */}
        {/* <LoadMoreButton /> */}
      </Wrapper>
    );
  }
}
