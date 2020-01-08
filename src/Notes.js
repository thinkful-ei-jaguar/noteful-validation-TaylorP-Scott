import React from 'react';
import './Notes.css';

export default class Notes extends React.Component {
    render(){
        const notes = this.props.notes.map((note)=>
        <div class="notebox" id={note.id}>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
        </div>
      );
      //console.log(notes);
      return (
        <div class="noteholder">
            {notes}
        </div>
      );
    }
  }