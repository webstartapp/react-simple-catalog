import * as ACTION_TYPES from './action_type'
// the reducer storage
const initialState = {
  profiles:[],
  filter:'',
  id:-1,
  selectedName:"",
  selectedAge:20,
  selectedSex:"O",
loading:true,
}

const mainReducer =(state=initialState,action) => {
  var p;
switch (action.type){
// Create profile or update, if existing profile selected
    case ACTION_TYPES.CREATEPROFILE : {

      var d=new Date();
      var profile={
      "name": action.item.name,
      "age": action.item.age,
      "sex": action.item.sex,
      "updatedDate": d.toISOString()
    }
    p=[...state.profiles]

    if(action.id<0 || action.id>=p.length){
      profile.key=p.length;
      p.push(profile);
    }
    else {
      profile.key=action.id;
      p[action.id]=profile;
    }
    return {
      ...state,
      profiles:p,id:-1,
      selectedName:"",
      selectedAge:20,
      selectedSex:"O"
    }
    }
// Input Form manipulation
    case ACTION_TYPES.UPDATEPROFILEAGE : {
      return {
      ...state,
      selectedAge:action.data
    }
    }
// Input Form manipulation
    case ACTION_TYPES.UPDATEPROFILENAME : {
      return {
      ...state,
      selectedName:action.data
    }
    }
// Select Form manipulation
    case ACTION_TYPES.UPDATEPROFILESEX : {
      return {
      ...state,
      selectedSex:action.data
    }
    }
// schich the profile to edit it, or allow to create new one
    case ACTION_TYPES.UPDATEPROFILE : {
      p={
        name:"",
        age:20,
        sex:"O"
      }
      var filtered=state.profiles.filter(fl => fl.name.toLowerCase().includes(state.filter.toLowerCase()))
      if(action.id>=0 && action.id<filtered.length){
        p.name=filtered[action.id].name;
        p.age=filtered[action.id].age;
        p.sex=filtered[action.id].sex;
      }
      return {
      ...state,
      id:action.id,
      selectedName:p.name,
      selectedAge:p.age,
      selectedSex:p.sex
    }
    }
// Sort the profiles based on input
    case ACTION_TYPES.SORTPROFILE :{
    p=[...state.profiles];
    p.sort(function(a,b){
      var a0=a[action.key];
      var b0=b[action.key];
      if(action.key==="name"){
        a0=a[action.key].toLowerCase();
        b0=b[action.key].toLowerCase();
      }
      if(a0>b0){
        return 1;
      } else {
          return -1;
        }
    });
      return {
      ...state,
      profiles:p,
      id:-1
    }
    }
// Filter profile based on input
    case ACTION_TYPES.FILTERPROFILE :{
      return {
      ...state,
      filter:action.data,
      id:-1
    }
    }
// delete profile by its id
    case ACTION_TYPES.DELETEPROFILE :{
    p=[...state.profiles];
    var id=action.id;
    d=p.filter(fl => fl.name.toLowerCase().includes(state.filter.toLowerCase()))
    for(var i in p){
      if(id===action.id && d[action.id].name===p[i].name && d[action.id].age===p[i].age && d[action.id].sex===p[i].sex  && d[action.id].updated===p[i].updated){
        id=i;
      }
    }
    console.log(d,id,action.id);
    p.splice(id,1);
      return {
      ...state,
      profiles:p,
      id:-1
    }
    }
// Initialize the profile once loaded
    case ACTION_TYPES.INIPROFILE :{
      return {
      ...state,
      profiles:action.data,
      id:-1
    }
    }
    default : return state
}


}

export default mainReducer
