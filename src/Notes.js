import React from 'react';
import './Notes.css';

export default class Notes extends React.Component {
    render(){
        const notes = this.props.notes
        .filter(note=>note.folderId===this.props.match.params.folderid)
        
        .map((note)=>
        <div className="notebox" id={note.id}>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
        </div>
      );
      console.log(this.props.folderid);
      return (
        <div className="noteholder">
            {notes}
        </div>
      );
    }
  }