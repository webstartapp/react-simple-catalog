import React, {Component} from 'react';
import Header from "./header"
import Profile from "./profile"
import Form from "./form"
import store from "../store/store"


class App extends Component {
  state={
    store:store.getAll()
  }
  
// Binding data
  constructor(props) {
    super(props);
    this.iniPrf = this.iniPrf.bind(this);
  }

// Inititation of data when loaded
  iniPrf (data){
    store.iniProfile( data )
  }

// Loading data once is the Element ready
  componentWillMount () {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => this.iniPrf(data));
    store.on("change",()=>{
      this.setState({
        store:store.getAll()
      })
    })
  }

// Condiditional Render the form or profile
  render(){
    return (
      <div className="App">
        <Header filter={this.state.store.filter} />
        {this.state.store.profiles
          .filter(fl => fl.name.toLowerCase().includes(this.state.store.filter.toLowerCase()))
          .map((item,id)=>(
            <div key={id}>
              {this.state.store.id==id?
                <Form id={id} currentid={id} item={item}/>
              :
                <Profile currentid={id}  {... item}/>
              }
            </div>
          ))
        }
        <div className="c">
          {(this.state.store.id<0 && this.state.store.filter==='') &&
            <Form key="-1" currentid="-1"  item={this.state.store.defProfile}/>
          }
        </div>
      </div>
    );
  }
}
export default App;
