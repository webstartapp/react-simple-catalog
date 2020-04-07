import * as ACTION_TYPES from './action_type'

export const CREATEPROFILE =(id,item)=>{
  return {
    type: ACTION_TYPES.CREATEPROFILE,
    id:id,
    item:item
  }
}
export const UPDATEPROFILENAME =(data)=>{
  return {
    type: ACTION_TYPES.UPDATEPROFILENAME,
    id:data
  }
}
export const UPDATEPROFILEAGE =(data)=>{
  return {
    type: ACTION_TYPES.UPDATEPROFILEAGE,
    id:data
  }
}
export const UPDATEPROFILESEX =(data)=>{
  return {
    type: ACTION_TYPES.UPDATEPROFILESEX,
    id:data
  }
}
export const UPDATEPROFILE =(id)=>{
  return {
    type: ACTION_TYPES.UPDATEPROFILE,
    id:id
  }
}
export const DELETEPROFILE =(id)=>{
  return {
    type: ACTION_TYPES.DELETEPROFILE,
    id:id
  }
}
export const SORTPROFILE =(key)=>{
  return {
    type: ACTION_TYPES.SORTPROFILE,
    key:key
  }
}
export const FILTERPROFILE =(data)=>{
  return {
    type: ACTION_TYPES.FILTERPROFILE,
    data:data
  }
}
export const INIPROFILE =(data)=>{
  return {
    type: ACTION_TYPES.INIPROFILE,
    data:data
  }
}
