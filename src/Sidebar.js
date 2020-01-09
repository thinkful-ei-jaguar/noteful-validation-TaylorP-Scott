import React from 'react';
import {Link} from 'react-router-dom';
import FoldersContext from './context/FoldersContext';

export default class Sidebar extends React.Component {

  changeId(value){
    this.props.changefolderid(value)
  }
  static contextType = FoldersContext;

  render(){
    const folders = this.context.folders.map((folder)=>
      <Link className="folder box" id={folder.id} to={`/folder/${folder.id}`}>
        <h2>{folder.name}</h2>
      </Link>
    );
    return (
      <div>
        {folders}
      </div>
    );
  }
}