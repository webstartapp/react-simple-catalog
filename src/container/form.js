import React, {Component} from 'react';
import * as ACTIONS from '../store/action';
import Input from './input';
import Select from './select';
import {connect } from "react-redux"

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
  }
// Input form handler
  handleAge(e){
   var a=parseInt(e.target.value);
   this.validateAge(a);
   this.props.updateProfileAge(a);
  }
// Select form handler
  handleSex(e){
    var a=e.target.value;
    this.props.updateProfileSex(a);
  }
// Input form handler
  handleName(e){
    var a=e.target.value;
    this.validateName(a);
    this.props.updateProfileName(a);
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
    this.setState({validMessage:message});
    if(valid!==this.state.validName){
      this.setState({validName:valid})
    }
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
    if(valid!==this.state.validAge){
      this.setState({validAge:valid})
    }
    this.setState({validMessage:message});
    return valid
  }
// save the inputed fields to the redux store
  handleSubmit(e) {
    e.preventDefault();
    if(this.validateName(e.target.elements.name.value,'')){
      if(this.validateAge(e.target.elements.age.value,'')){
        var item={
          name:e.target.elements.name.value,
          age:e.target.elements.age.value,
          sex:e.target.elements.sex.value,
        };
        this.props.createProfile(e.target.elements.hiddenid.value,item);
      }
    }
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="w3" >
          <div className="profile" >
            <h2><Input inputValid={this.state.validName} inputName="name" inputId="name" inputType="text" inputValue={this.props.selectedName} inputPlaceholder="name" inputChange={this.handleName} /></h2>
            <div className="stats c">
              <div className="w2">age: <b><Input inputValid={this.state.validAge} inputName="age" inputId="age" inputType="number" inputValue={this.props.selectedAge} inputPlaceholder="age" inputLimit="120" inputChange={this.handleAge} /></b></div>
              <div className="w2">sex: <b><Select inputValid={this.state.validSex} selectName="sex" selectId="sex" selectChange={this.handleSex} selectValue={this.props.selectedSex} selectOptions={[["F","female"],["M","male"],["O","Other"]]}/></b></div>
            </div>
            <div className="c"><b>{this.state.validMessage}</b></div>
            <div className="update c">
            <Input inputName="hiddenid" inputId="hiddenid" inputType="hidden" inputValue={this.props.currentid} inputPlaceholder="hiddenid" inputLimit="99999"/>
              <div className="w2"> <button type="submit">{this.props.currentid<0 ?"Create":"Update"}</button></div>
              <div className="w2">{this.props.currentid>=0 && <button onClick={()=>this.props.updateProfile(-1)}>Cancel</button>}</div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
// mapping the redux store
function mapStateToProps(state){
return {
  profiles: state.profiles,
  selectedName: state.selectedName,
  selectedAge: state.selectedAge,
  selectedSex: state.selectedSex,
  id: state.id,
  loading: state.loading
}
}
function mapDispatchToProps(dispatch){
 return {
     createProfile:(id,item)=>dispatch(ACTIONS.CREATEPROFILE(id,item)),
     updateProfile:(id)=>dispatch(ACTIONS.UPDATEPROFILE(id)),
     updateProfileAge:(data)=>dispatch(ACTIONS.UPDATEPROFILEAGE(data)),
     updateProfileName:(data)=>dispatch(ACTIONS.UPDATEPROFILENAME(data)),
     updateProfileSex:(data)=>dispatch(ACTIONS.UPDATEPROFILESEX(data)),
     deleteProfile:(id)=>dispatch(ACTIONS.DELETEPROFILE(id))
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form)
