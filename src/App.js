import React from 'react';
import Home from './Home';
import Sidebar from './Sidebar';
import Notes from './Notes';
import './App.css';
import dummy from './dummy-store';
import {Route, Switch} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      folders :[],
      notes:[],
      folderid:'',
    }
  }

  componentDidMount(){
  console.log(dummy);
  this.setState({
    folders:dummy.folders,
    notes:dummy.notes,
    folderid:dummy.folders[0].id,
  })
  
}
changefolderid=(value)=>{
  console.log(this.state.folderid);
  console.log(value);
  this.setState({
    folderid:value
  });
  console.log(this.state.folderid);
  //event.preventDefault();
}

  render(){
    return (
      <>
        <main>
          <Route path='/' component={Home} /> 
        </main>
        <div className="holder">
        <Sidebar folders={this.state.folders} changefolderid={this.changefolderid}/>
        <Switch>
          <Route 
          path='/folder/:folderid'
          render={props => <Notes {...props} notes={this.state.notes} folderid={this.state.folderid} />}
          />
        </Switch>
        </div>
      </>
    );
  }
}
/* <div className="holder">
            <Route path='/' component={Sidebar} />
        
            <Route path='/' component={Notes} />
        </div>
    */