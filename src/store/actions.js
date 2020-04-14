import * as ACTION_TYPES from './action_type'
import dispatcher from "./dispatcher"

export function createProfile(item,id){
  dispatcher.dispatch({
    type: ACTION_TYPES.CREATEPROFILE,
    id:id,
    item:item
  })
}

export function updateProfile(id){
  dispatcher.dispatch({
    type: ACTION_TYPES.UPDATEPROFILE,
    id:id
  })
}

export function deleteProfile(id){
  dispatcher.dispatch({
    type: ACTION_TYPES.DELETEPROFILE,
    id:id
  })
}

export function sortProfile(key){
  dispatcher.dispatch({
    type: ACTION_TYPES.SORTPROFILE,
    key:key
  })
}

export function filterProfile(data){
  dispatcher.dispatch({
    type: ACTION_TYPES.FILTERPROFILE,
    data:data
  })
}

export function iniProfile(data){
  dispatcher.dispatch({
    type: ACTION_TYPES.INIPROFILE,
    data:data
  })
}
