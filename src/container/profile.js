import React, {Component} from 'react';
import * as actions from '../store/actions';
class Profile extends Component {
  render(){
    return (
      <div className="w3">
        <div className="profile" >
          <h2>{this.props.name}</h2>
          <div className="stats c">
            <div className="w2">age:
              <b>{this.props.age}</b>
            </div>
            <div className="w2">sex:
              <b>{this.props.sex}</b>
            </div>
          </div>
          <div className="c">Updated:
            <b>{this.props.updatedDate}</b>
          </div>
          <div className="update c">
            <div className="w2">
              <button onClick={()=>actions.deleteProfile(this.props.currentid)}>delete</button>
            </div>
            <div className="w2">
              <button onClick={()=>actions.updateProfile(this.props.currentid)}>Change</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
