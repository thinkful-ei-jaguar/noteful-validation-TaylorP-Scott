import React from 'react';
import ApiContext from './context/ApiContext';
import PropTypes from 'prop-types'
import './note.css'
import { Link } from 'react-router-dom';

function change(time) { 

let t = time.slice(0,10)
  
var r = t.match(/^\s*([0-9]+)\s*-\s*([0-9]+)\s*-\s*([0-9]+)(.*)$/); 
  
return r[2]+"-"+r[3]+"-"+r[1]+r[4]; }

console.log(change("2019-01-03 03:00:00"));



export default class Note extends React.Component {
  
        static contextType = ApiContext;
        render(){
        const notes = this.context.notes
        .filter(note => note.id === Number(this.props.match.params.noteid)) 
        
        .map((note) =>
        <div key={note.id}>
            <h2 className='noteTitle'>{note.note_name}</h2>
            <h3 className='noteDate'>Modified: {change(note.modified)}</h3>
            <p className='noteContent'>{note.content}</p>
            <button className='noteDeleteButton'type="button" onClick={()=>this.context.deletehandlenote(note.id).then(()=>{this.props.history.push('/')})}>delete</button>
            <Link to={`/edit-note/${note.id}`}>
            <button className='noteEditButton'type="button">edit</button>
            </Link>
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