import React from 'react';
import './Notes.css';
import {Link} from 'react-router-dom';


export default class Notes extends React.Component {
    render(){
        const notes = this.props.notes
        .filter(note=>note.folderId===this.props.match.params.folderid)
        .map((note)=>
        <Link className="folder box" id={note.id} to={`/note/${note.id}`}>
          <h2>{note.name}</h2>
        </Link>

      );
      console.log(this.props.folderid);
      return (
        <div className="noteholder">
            {notes}
        </div>
      );
    }
  }