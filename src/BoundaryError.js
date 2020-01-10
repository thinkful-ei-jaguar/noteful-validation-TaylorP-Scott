import React, { Component } from 'react'
import ApiContext from './context/ApiContext'

export default class BoundaryError extends Component {
  
  static contextType = ApiContext


  componentDidCatch(error) {
        this.context( {
          error: error
        }
      )
  }

  render() {
      if(this.context.error) {
        return(
          <h2>Something went wrong!</h2>
        );
      } 
      return this.props.children;
    }
}



