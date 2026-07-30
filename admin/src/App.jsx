import React from 'react';
import {GenericPage, Login, Overview, Portal, useAuth} from '../../shared/Portal';
const nav=[
  {id:'overview',label:'System overview'},
  {id:'settings',label:'Settings & users',badge:7},
  {id:'community',label:'Community management'},
  {id:'status',label:'System status'},
  {id:'access',label:'Full system access'}
];
export default function App(){
  const auth=useAuth('admin');
  if(!auth.authenticated)return <Login portal="admin" onLogin={auth.login}/>;
  return <Portal portal="admin" nav={nav} onLogout={auth.logout}>{active=>active==='overview'?<Overview kind="admin"/>:<GenericPage type={active}/>}</Portal>;
}
