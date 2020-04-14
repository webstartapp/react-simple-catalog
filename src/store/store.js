import {EventEmitter} from "events"
import dispatcher from "./dispatcher"
import * as ACTION_TYPES from './action_type'
class Store extends EventEmitter {
  constructor(){
    super()
    this.store={
      profiles:[],
      defProfile:{
        name:"",
        age:20,
        sex:"O"
      },
      filter:'',
      id:-1
    }
  }

  iniProfile(data){
    this.store.profiles=data;
    this.emit("change");
  }

  createProfile(item,id){
    var dt=new Date();
    item.updatedDate=dt.toISOString()
    var d=this.store.profiles.filter(fl => fl.name.toLowerCase().includes(this.store.filter.toLowerCase()));
    if(id<0 || id>=this.store.profiles.length){
      this.store.profiles.push(item);
    }
    else {
      for(var i in this.store.profiles){
        if(d[id].name===this.store.profiles[i].name
          && d[id].age===this.store.profiles[i].age
          && d[id].sex===this.store.profiles[i].sex
          && d[id].updated===this.store.profiles[i].updated){
            this.store.profiles[i]=item;
        }
      }
    }
    this.store.id=-1;
    this.emit("change");
  }

  updateProfile(id){
    var d=this.store.profiles.filter(fl => fl.name.toLowerCase().includes(this.store.filter.toLowerCase()));
    if(id in d) {
      this.store.id=id;
      this.emit("change");
    } else {
      this.store.id=-1;
      this.emit("change");
    }
  }

  deleteProfile(id){
    var d=this.store.profiles.filter(fl => fl.name.toLowerCase().includes(this.store.filter.toLowerCase()));
    for(var i in this.store.profiles){
      if(d[id].name===this.store.profiles[i].name
        && d[id].age===this.store.profiles[i].age
        && d[id].sex===this.store.profiles[i].sex
        && d[id].updated===this.store.profiles[i].updated){
          this.store.profiles.splice(i,1);
          this.emit("change");
      }
    }
  }

  sortProfile(key){
    this.store.profiles.sort(function(a,b){
      var a0=a[key];
      var b0=b[key];
      if(key==="name"){
        a0=a[key].toLowerCase();
        b0=b[key].toLowerCase();
      }
      if(a0>b0){
        return 1;
      } else {
        return -1;
      }
    });
    this.store.id=-1;
    this.emit("change");
  }

  filterProfile(key){
    this.store.id=-1;
    this.store.filter=key;
    this.emit("change");
  }

  getAll(){
    return this.store;
  }

  getDefault(){
    return this.store.defProfile;
  }

  handleAction(action){
    switch(action.type){
      case ACTION_TYPES.CREATEPROFILE :
        this.createProfile(action.item,action.id);
      break;
      case ACTION_TYPES.UPDATEPROFILE :
        this.updateProfile(action.id);
      break;
      case ACTION_TYPES.DELETEPROFILE :
        this.deleteProfile(action.id);
      break;
      case ACTION_TYPES.FILTERPROFILE :
        this.filterProfile(action.data);
      break;
      case ACTION_TYPES.SORTPROFILE :
        this.sortProfile(action.key);
      break;
      default:{}
    }
  }
}

var store=new Store()
dispatcher.register(store.handleAction.bind(store));
export default store
