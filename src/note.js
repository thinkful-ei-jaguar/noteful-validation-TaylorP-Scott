import React from 'react';
import ApiContext from './context/ApiContext';
import PropTypes from 'prop-types'
import './note.css'


export default class Note extends React.Component {
        static contextType = ApiContext;
        render(){
        const notes = this.context.notes
        .filter(note => note.id === this.props.match.params.noteid)
        .map((note) =>
        <div key={note.id}>
            <h2 className='noteTitle'>{note.name}</h2>
            <h3 className='noteDate'>Date Created: {note.modified}</h3>
            <p className='noteContent'>{note.content}</p>
            <button className='noteDeleteButton'type="button" onClick={()=>this.context.deletehandlenote(note.id).then(()=>{this.props.history.push('/')})}>delete</button>
        </div>
      );
      return (
        <div className="onenote">
            <h1>{notes}</h1>
        </div>
      );
    }
  }

  Note.propTypes = {
    notes: PropTypes.array,
    deletehandlenote: PropTypes.func,
    history: PropTypes.object
  };