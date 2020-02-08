import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from './context/ApiContext';
import './Home.css';

export default class Home extends React.Component {
  static contextType = ApiContext;
    render(){
      const notes = this.context.notes
      .map((note) =>
      <div key={note.id} className='note-list' >
        <Link className="note-box" id={note.id} to={`/note/${note.id}`}>
          <h2 >{note.note_name}</h2>
        </Link>
        <button id='note-list-delete' type="button" onClick={()=>this.context.deletehandlenote(note.id)}>Delete</button>
      </div>
    );
      return (
        <div>
          <div className='noteholder'>
           {notes}
          </div>
       </div>
      );
    }
  }