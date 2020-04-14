import React, {Component} from 'react';
import Input from './input';
import Select from './select';
import store from "../store/store"
import * as actions from "../store/actions"

// Form component
class Form extends Component {
// Binding data
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleSex = this.handleSex.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  state={
    validName:true,
    validAge:true,
    validSex:true,
    validMessage:'',
    name:"",
    age:20,
    sex:"O"
  }

// Input form handler
  handleAge(e){
    var a=parseInt(e.target.value);
    this.validateAge(a);
    this.setState({age:a});
  }

// Select form handler
  handleSex(e){
    var a=e.target.value;
    this.setState({sex:a});
  }

// Input form handler
  handleName(e){
    var a=e.target.value;
    this.validateName(a);
    this.setState({name:a});
  }

// Validation the name input
  validateName (data,message=''){
    var valid=true;
    var reg = /^[a-z]+$/i;
    if(!(reg.test(data))){
      valid=false;
      message="NAME should contain only [a-z] letters";
    }
    if(data.length>10){
      valid=false;
      message="NAME should be shorter than 11 Leters";
    }
    if(data.length<2){
      valid=false;
      message="NAME should have at least 2 Leters";
    }
    this.setState({
      validMessage:message,
      validName:valid
    });
    return valid
  }

// Validation the age input
  validateAge (data,message=''){
    var valid=true;
    if(data<2){
      valid=false;
      message="AGE should be above 1";
    }
    if(data>129){
      valid=false;
      message="AGE should be bellow 130";
    }
    this.setState({
      validMessage:message,
      validAge:valid
    })
    return valid
  }

// save the inputed fields to the store
  handleSubmit(e) {
    e.preventDefault();
    if(this.validateName(e.target.elements.name.value,'')){
      if(this.validateAge(e.target.elements.age.value,'')){
        var item={
          name:e.target.elements.name.value,
          age:e.target.elements.age.value,
          sex:e.target.elements.sex.value
        };
        actions.createProfile(item,e.target.elements.hiddenid.value);
        let dflt = store.getDefault();
        this.setState({
          name:dflt.name,
          age:dflt.age,
          sex:dflt.sex
        })
      }
    }
  }

  componentWillMount(){
    this.setState({
      name:this.props.item.name,
      age:this.props.item.age,
      sex:this.props.item.sex,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="w3" >
          <div className="profile" >
            <h2>
              <Input inputValid={this.state.validName} inputName="name" inputId="name" inputType="text" inputValue={this.state.name} inputPlaceholder="name" inputChange={this.handleName} />
            </h2>
            <div className="stats c">
              <div className="w2">age:
                <Input inputValid={this.state.validAge} inputName="age" inputId="age" inputType="number" inputValue={this.state.age} inputPlaceholder="age" inputLimit="120" inputChange={this.handleAge} />
              </div>
              <div className="w2">sex:
                <Select inputValid={this.state.validSex} selectName="sex" selectId="sex" selectChange={this.handleSex} selectValue={this.state.sex} selectOptions={[["F","female"],["M","male"],["O","Other"]]}/>
              </div>
            </div>
            <div className="c">
              <b>{this.state.validMessage}</b>
            </div>
            <div className="update c">
              <Input inputName="hiddenid" inputId="hiddenid" inputType="hidden" inputValue={this.props.currentid} inputPlaceholder="hiddenid" inputLimit="99999"/>
              <div className="w2">
                <button type="submit">{this.props.currentid<0 ?"Create":"Update"}</button>
              </div>
              <div className="w2">
                {this.props.currentid>=0 &&
                  <button onClick={()=>actions.updateProfile(-1)} type="button">Cancel</button>
                }
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
export default Form
