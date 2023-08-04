import { LoadMoreButton } from "components/Button/Button";
import { SearchBar } from "components/Searchbar/Searchbar";
import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Wrapper } from "./App.styled";

export class App extends Component {

  render() {
    return (
      <Wrapper>
        <SearchBar />
        {/* <ThreeDots /> */}
        <LoadMoreButton />
      </Wrapper>
    );
  }
 }