import React from 'react';
import './Notes.css';


export default class Note extends React.Component {
        render(){
        //console.log(this.props.match)
        console.log(this.props.notes);
        console.log(this.props.match.params.noteid);
        const notes = this.props.notes
        .filter(note=>note.id===this.props.match.params.noteid)
        .map((note)=>
        <div >
            <h2>{note.name}</h2>
            <h3>date modified:{note.modified}</h3>
        <p>{note.content}</p>

        </div>
      );
        console.log(notes);
      //console.log(this.props.folderid);
     
      return (
        <div className="onenote">
            <h1>{notes}</h1>
        </div>
      );
    }
  }
  /*<div className="folder box" id={note.id}>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
        </div>>*/