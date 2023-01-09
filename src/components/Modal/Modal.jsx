import React, { Component } from 'react';

import { Backdrop, ModalContent,  } from "components/Modal/Modal.styled";

export class Modal extends Component {



  render() {
    return (
      <Backdrop>
        <ModalContent>
          {this.props.children}
        </ModalContent>
      </Backdrop>
    )
  }
}
