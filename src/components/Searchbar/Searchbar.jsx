import { Component } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Searchbar,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
    this.props.onChange(e.target.value);
    console.log(this.state.searchQuery);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <IconContext.Provider value={{ size: '2em' }}>
              <div>
                <AiOutlineSearch />
              </div>
            </IconContext.Provider>

            {/* <SearchFormButtonLabel>Search</SearchFormButtonLabel> */}
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
