import React, {Component} from 'react';

import * as ACTIONS from '../store/action';
import Input from './input';
import {connect } from "react-redux"
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }
// Input Form handler handler
  handleFilter(e){
    var a=e.target.value;
    this.props.filterProfile(a);
  }
// Header renderer
  render(){return (
    <div>
      <header className="App-header">
        <div className="logo">SimpleApp</div>
        <div className="filters r">
          <button className="r" onClick={()=>{this.props.sortProfile("age")}}>Sort By AGE</button>
          <button className="r" onClick={()=>{this.props.sortProfile("name")}}>Sort By NAME</button>
          <button className="r" onClick={()=>{this.props.sortProfile("sex")}}>Sort By SEX</button>
          <Input inputValid={true} inputName="filter" inputId="filter" inputType="text" inputValue={this.props.selectedAge} inputPlaceholder="filter" inputLimit="120" inputChange={this.handleFilter} />
        </div>
      </header>
    </div>
  );
}
}

// mapping the redux store
function mapStateToProps(state){
return {
  filter: state.filter
}
}
function mapDispatchToProps(dispatch){
 return {
     filterProfile:(data)=>dispatch(ACTIONS.FILTERPROFILE(data)),
     sortProfile:(type)=>dispatch(ACTIONS.SORTPROFILE(type))
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
