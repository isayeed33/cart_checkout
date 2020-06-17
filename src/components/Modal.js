import React, { Component } from 'react';
import styled from 'styled-components';

export default class Modal extends Component {

state = {
    enteredprice: '',
}

handleChange = (event) => {
    this.setState({enteredprice: event.target.value})
}

verify = () => {
          if(this.state.enteredprice == this.props.cartTotal){
              alert("Transaction Successful");
              window.location.reload();
          } else {
              alert("Transaction Unsuccessful! Please try again");
          }
}

    render() {
        const { cartTotal, modalOpen } = this.props;
        return(
        !modalOpen ? null : (
              <ModalContainer id="modal">
                <Box>Items Total Price: Rs. {cartTotal}
                <input placeholder="Verify Price" type="number" onChange={(event) => this.handleChange(event)}></input>
                <Button type="submit" value="Submit" onClick={this.verify}>Submit</Button>
                </Box>
               </ModalContainer>)
        );
    

    }    
}

const Box = styled.div`
  border: 1px solid black
  margin: 10px;
`;

const ModalContainer = styled.div`
  position: fixed;
  color: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: grey;
  }
`;

const Button = styled.button`
  background-color: green;
  color: white;
  font-weight: bolder;
  border-radius: 5%;
  border: none;
  cursor: pointer;
  padding: 5px auto;
  font-size: large;
`;