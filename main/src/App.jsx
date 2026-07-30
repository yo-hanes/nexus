import React,{useState} from 'react';
import {GenericPage, MemberLogin, Overview, Portal} from '../../shared/Portal';

const nav=[
  {id:'overview',label:'Overview'},
  {id:'map',label:'Risk map'},
  {id:'community',label:'Community'},
  {id:'donations',label:'Donations & resources'}
];
export default function App(){
  const [memberLogin,setMemberLogin]=useState(false);
  return <><Portal portal="main" nav={nav} publicMode onMemberLogin={()=>setMemberLogin(true)}>
    {(active)=>(active==='overview'?<Overview kind="main"/>:<GenericPage type={active}/>)}
  </Portal>{memberLogin&&<MemberLogin onClose={()=>setMemberLogin(false)}/>}</>;
}
