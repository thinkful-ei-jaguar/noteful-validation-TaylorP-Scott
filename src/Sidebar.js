import React from 'react';
import {Link} from 'react-router-dom';
import ApiContext from './context/ApiContext';

export default class Sidebar extends React.Component {

  changeId(value){
    this.props.changefolderid(value)
  }
  static contextType = ApiContext;

  render(){
    const folders = this.context.folders.map((folder)=>
      <Link 
      className="folder box" 
      id={folder.id}
      key={folder.id} 
      to={`/folder/${folder.id}`}>
        <h2>{folder.name}</h2>
      </Link>
    );
    return (
      <div>
        {folders}
        <Link 
        className="new folder " 
        to={`/addfolder`}
        >
            <button type='button'>Add Folder</button>
        </Link>
      </div>
    );
  }
}