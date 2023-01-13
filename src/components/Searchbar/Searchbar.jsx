import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import {
  Search,
  Form,
  FormSubmit,
  Input,
} from 'components/Searchbar/Searchbar.styled';

import React, { Component } from 'react';


export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputValueChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      alert("Search field must be filled!")
      this.formReset();
      return
    }
    this.props.onFormSubmit(this.state.searchQuery);
    this.formReset();
  };

  formReset() {
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <Search>
        <Form onSubmit={this.handleSubmit}>
          <FormSubmit type="submit">
            <SearchIcon width="25" height="25" />
          </FormSubmit>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputValueChange}
          />
        </Form>
      </Search>
    );
  }
};
