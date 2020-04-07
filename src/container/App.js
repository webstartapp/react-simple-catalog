import React, {Component} from 'react';
import {connect } from "react-redux"
import * as ACTIONS from '../store/action';
import Header from "./header"
import Profile from "./profile"
import Form from "./form"

class App extends Component {
// Binding data
    constructor(props) {
      super(props);
      this.iniPrf = this.iniPrf.bind(this);
    }
// Inititation of data when loaded
  iniPrf (data){
    this.props.iniProfile( data )
  }
// Loading data once is the Element ready
  componentWillMount () {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => this.iniPrf(data));
  }
// Condiditional Render the form or profile
  render(){return (
    <div className="App">
      <Header />
      {this.props.profiles.filter(fl => fl.name.toLowerCase().includes(this.props.filter.toLowerCase())).map((item,id)=>(
        <div key={id}>
        {this.props.id===id?
          <Form id={id} currentid={id} {... item}/>
          :
          <Profile currentid={id} {... item}/>
        }
        </div>
      ))}
      <div className="c">
         {this.props.id<0 && <Form key="-1" currentid="-1" />}
      </div>
    </div>
  );
}
}

// Redux connect manipulation
function mapStateToProps(state){
return {
  profiles: state.profiles,
  id: state.id,
  filter: state.filter
}
}
function mapDispatchToProps(dispatch){
 return {
     iniProfile:(data)=>dispatch(ACTIONS.INIPROFILE(data))
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
