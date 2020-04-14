import React, {Component} from 'react';
import * as actions from '../store/actions';
import Input from './input';
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  state={
    filter:''
  }

// Input Form handler handler
  handleFilter(e){
    var a=e.target.value;
    actions.filterProfile(a);
    this.setState({filter:a});
  }

// Header renderer
  render(){
    return (
      <div>
        <header className="App-header">
          <div className="logo">SimpleApp</div>
          <div className="filters r">
            <button className="r" onClick={()=>{actions.sortProfile("age")}}>Sort By AGE</button>
            <button className="r" onClick={()=>{actions.sortProfile("name")}}>Sort By NAME</button>
            <button className="r" onClick={()=>{actions.sortProfile("sex")}}>Sort By SEX</button>
            <Input inputValid={true} inputName="filter" inputId="filter" inputType="text" inputValue={this.state.filter} inputPlaceholder="filter" inputLimit="120" inputChange={this.handleFilter} />
          </div>
        </header>
      </div>
    );
  }
}
export default Header;
