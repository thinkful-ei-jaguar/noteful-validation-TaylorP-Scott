import React from 'react';
import './Notes.css';
import ApiContext from './context/ApiContext';


export default class Note extends React.Component {
        static contextType = ApiContext;
        render(){
        const notes = this.context.notes
        .filter(note=>note.id===this.props.match.params.noteid)
        .map((note)=>
        <div >
            <h2>{note.name}</h2>
            <h3>date modified:{note.modified}</h3>
            <p>{note.content}</p>
            <button  type="button" onClick={()=>this.context.deletehandlenote(note.id).then(()=>{this.props.history.push('/')})}>delete</button>
        </div>
      );
      return (
        <div className="onenote">
            <h1>{notes}</h1>
        </div>
      );
    }
  }