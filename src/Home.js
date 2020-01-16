import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    render(){
      return (
        <header className='header' >
          <Link to={'/'} className='header-link' >
            <h1>Noteful</h1>
          </Link>
        </header>  
      );
    }
  }