import React from 'react';
import './Notes.css';
import {Link} from 'react-router-dom';
import ApiContext from './context/ApiContext';
import PropTypes from 'prop-types';
// import AddNote from './AddNote';



export default class Notes extends React.Component {

  static contextType = ApiContext;
    render(){
        const notes = this.context.notes
        //params is not a number, so we need to convert
        .filter(note => note.folder_id === Number(this.props.match.params.folderid))
        .map((note)=> 
        {return <div key={note.id} className='note-list' >
          <Link className="note-box" id={note.id} to={`/note/${note.id}`}>
            <h2>{note.note_name}</h2>
          </Link>
          <button id='note-list-delete' type="button" onClick={()=>this.context.deletehandlenote(note.id)}>Delete</button>
        </div>}
      );
      return (
        <div className="noteholder">
            {notes}
            <Link 
              className="new note" 
              to={`/addNote`}
            >
            <button type='button' id='add-note'>Add Note</button>
            </Link>
        </div>
      );
    }
  }

  Notes.propTypes = {
    notes: PropTypes.array, 
    deletehandlenote: PropTypes.func
  }