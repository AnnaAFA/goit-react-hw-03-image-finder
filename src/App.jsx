import { SearchBar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { Wrapper } from './App.styled';
import { ImagesGallery } from './components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <Wrapper>
        <SearchBar onChange={this.handleSearch} />
        <ImagesGallery searchQuery={this.state.searchQuery} />
      </Wrapper>
    );
  }
}
