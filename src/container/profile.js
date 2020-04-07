import React, {Component} from 'react';
import * as ACTIONS from '../store/action';
import {connect } from "react-redux"


class Profile extends Component {
  render(){return (
    <div className="w3">
    <div className="profile" >
        <h2>{this.props.name}</h2>
        <div className="stats c">
        <div className="w2">age: <b>{this.props.age}</b></div>
        <div className="w2">sex: <b>{this.props.sex}</b></div>
        </div>
        <div className="c">Updated:<b>{this.props.updatedDate}</b></div>
        <div className="update c">
        <div className="w2"><button onClick={()=>this.props.deleteProfile(this.props.currentid)}>delete</button></div>
        <div className="w2"><button onClick={()=>this.props.updateProfile(this.props.currentid)}>Change</button></div>
        </div>
    </div>
</div>
  );
}
}

function mapStateToProps(state){
return {
  profiles: state.profiles,
  id: state.id,
  loading: state.loading
}
}
function mapDispatchToProps(dispatch){
 return {
     createProfile:(id,item)=>dispatch(ACTIONS.CREATEPROFILE(id,item)),
     updateProfile:(id)=>dispatch(ACTIONS.UPDATEPROFILE(id)),
     deleteProfile:(id)=>dispatch(ACTIONS.DELETEPROFILE(id))
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
