import React from 'react';
import {GenericPage, Login, Overview, Portal, useAuth} from '../../shared/Portal';
const nav=[
  {id:'overview',label:'Operations overview'},
  {id:'dispatch',label:'Dispatch',badge:8},
  {id:'map',label:'Field map'},
  {id:'reports',label:'Verified reports'},
  {id:'resources',label:'Resources & donations'},
  {id:'analytics',label:'Analytics'}
];
export default function App(){
  const auth=useAuth('agency');
  if(!auth.authenticated)return <Login portal="agency" onLogin={auth.login}/>;
  return <Portal portal="agency" nav={nav} onLogout={auth.logout}>{active=>active==='overview'?<Overview kind="agency"/>:<GenericPage type={active}/>}</Portal>;
}
