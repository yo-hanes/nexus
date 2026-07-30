import React from 'react';
import {GenericPage, Login, Overview, Portal, useAuth} from '../../shared/Portal';
import ApprovalQueue from '../../shared/ApprovalQueue';

const nav=[
  {id:'approval',label:'Approval queue',badge:3},
  {id:'overview',label:'Executive overview'},
  {id:'map',label:'Operational map'},
  {id:'reports',label:'Reports'},
  {id:'analytics',label:'Analytics'}
];
export default function App(){
  const auth=useAuth('approval');
  if(!auth.authenticated)return <Login portal="approval" onLogin={auth.login}/>;
  return <Portal portal="approval" nav={nav} onLogout={auth.logout}>{active=>{
    if(active==='approval')return <ApprovalQueue/>;
    if(active==='overview')return <Overview kind="approval"/>;
    return <GenericPage type={active}/>;
  }}</Portal>;
}
