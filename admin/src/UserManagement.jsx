import React, {useMemo, useState} from 'react';
import {
  CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Download, Edit3,
  Filter, Plus, Search, ShieldCheck, Trash2, UserRound, Users, X
} from 'lucide-react';

const seedUsers = [
  {id:1,name:'Selam Alemu',email:'selam.alemu@negarit.gov.et',username:'salemu',status:'Active',role:'Admin',joined:'12 Mar 2024',lastActive:'Just now',region:'Addis Ababa'},
  {id:2,name:'Meron Tesfaye',email:'meron.tesfaye@moha.gov.et',username:'mtesfaye',status:'Active',role:'Approver',joined:'27 Jun 2024',lastActive:'1 minute ago',region:'Federal'},
  {id:3,name:'Dawit Bekele',email:'dawit.bekele@redcross.et',username:'dbekele',status:'Active',role:'Agency',joined:'08 Jan 2025',lastActive:'18 minutes ago',region:'Oromia'},
  {id:4,name:'Rahel Girma',email:'rahel.girma@gambela.gov.et',username:'rgirma',status:'Pending',role:'Approver',joined:'05 Oct 2025',lastActive:'Never',region:'Gambela'},
  {id:5,name:'Abebe Kebede',email:'abebe.kebede@community.et',username:'akebede',status:'Active',role:'Counter',joined:'19 Feb 2025',lastActive:'3 hours ago',region:'SNNPR'},
  {id:6,name:'Hana Mohammed',email:'hana.mohammed@ngo.org',username:'hmohammed',status:'Suspended',role:'Agency',joined:'30 Aug 2024',lastActive:'1 week ago',region:'Somali'},
  {id:7,name:'Yonas Tadesse',email:'yonas.tadesse@community.et',username:'ytadesse',status:'Active',role:'Counter',joined:'23 Apr 2026',lastActive:'4 hours ago',region:'Amhara'},
  {id:8,name:'Liya Fekadu',email:'liya.fekadu@negarit.gov.et',username:'lfekadu',status:'Inactive',role:'Admin',joined:'14 Nov 2023',lastActive:'2 months ago',region:'Addis Ababa'},
  {id:9,name:'Samuel Getachew',email:'samuel.getachew@un.org',username:'sgetachew',status:'Active',role:'Agency',joined:'06 Jul 2025',lastActive:'3 hours ago',region:'Afar'},
  {id:10,name:'Bethlehem Assefa',email:'bethlehem.assefa@community.et',username:'bassefa',status:'Pending',role:'Counter',joined:'31 Dec 2025',lastActive:'Never',region:'Tigray'}
];

const emptyUser={name:'',email:'',username:'',role:'Counter',status:'Pending',region:'Addis Ababa'};
const roles=['Admin','Approver','Agency','Counter'];
const statuses=['Active','Pending','Suspended','Inactive'];

export default function UserManagement(){
  const [users,setUsers]=useState(seedUsers);
  const [query,setQuery]=useState('');
  const [role,setRole]=useState('All roles');
  const [status,setStatus]=useState('All statuses');
  const [selected,setSelected]=useState([]);
  const [editing,setEditing]=useState(null);
  const [tab,setTab]=useState('Users');
  const visible=useMemo(()=>users.filter(user=>{
    const matchesSearch=`${user.name} ${user.email} ${user.username}`.toLowerCase().includes(query.toLowerCase());
    return matchesSearch&&(role==='All roles'||user.role===role)&&(status==='All statuses'||user.status===status);
  }),[users,query,role,status]);

  const save=(event)=>{
    event.preventDefault();
    const record={...editing,id:editing.id||Date.now(),joined:editing.joined||'31 Jul 2026',lastActive:editing.lastActive||'Never'};
    setUsers(current=>editing.id?current.map(user=>user.id===editing.id?record:user):[record,...current]);
    setEditing(null);
  };
  const remove=id=>{if(window.confirm('Remove this user and revoke their portal access?'))setUsers(current=>current.filter(user=>user.id!==id));};
  const exportCsv=()=>{
    const rows=[['Name','Email','Username','Status','Role','Region','Joined','Last active'],...visible.map(u=>[u.name,u.email,u.username,u.status,u.role,u.region,u.joined,u.lastActive])];
    const blob=new Blob([rows.map(row=>row.join(',')).join('\n')],{type:'text/csv'});
    const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='negarit-users.csv';link.click();URL.revokeObjectURL(link.href);
  };
  const toggleAll=()=>setSelected(selected.length===visible.length?[]:visible.map(u=>u.id));
  return <div className="users-page">
    <div className="users-title">
      <div><span className="overline">Access governance</span><h2>User management</h2><p>Control access, assign roles, and monitor activity across the Negarit ecosystem.</p></div>
      <div className="user-summary"><div><Users/><span><strong>{users.length}</strong>Total users</span></div><div><ShieldCheck/><span><strong>{users.filter(u=>u.status==='Active').length}</strong>Active access</span></div></div>
    </div>
    <div className="management-tabs">{['Users','Roles & permissions','Access log'].map(item=><button className={tab===item?'active':''} onClick={()=>setTab(item)} key={item}>{item}</button>)}</div>
    {tab!=='Users'?<PlaceholderTab tab={tab}/>:<>
      <section className="user-toolbar">
        <div className="user-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, email or username"/></div>
        <label className="filter-select"><UserRound/><select value={role} onChange={e=>setRole(e.target.value)}><option>All roles</option>{roles.map(x=><option key={x}>{x}</option>)}</select><ChevronDown/></label>
        <label className="filter-select"><Filter/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option>{statuses.map(x=><option key={x}>{x}</option>)}</select><ChevronDown/></label>
        <button className="toolbar-button"><CalendarDays/> Joined date <ChevronDown/></button>
        <div className="toolbar-spacer"/>
        <button className="toolbar-button" onClick={exportCsv}><Download/> Export</button>
        <button className="add-user" onClick={()=>setEditing({...emptyUser})}><Plus/> Add user</button>
      </section>
      {selected.length>0&&<div className="bulk-bar"><strong>{selected.length} selected</strong><span>Bulk actions</span><button onClick={()=>{setUsers(current=>current.filter(user=>!selected.includes(user.id)));setSelected([]);}}>Revoke access</button></div>}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead><tr><th><input type="checkbox" checked={visible.length>0&&selected.length===visible.length} onChange={toggleAll}/></th><th>Full name</th><th>Email</th><th>Username</th><th>Status</th><th>Role</th><th>Region</th><th>Joined</th><th>Last active</th><th>Actions</th></tr></thead>
          <tbody>{visible.map((user,index)=><tr key={user.id}>
            <td><input type="checkbox" checked={selected.includes(user.id)} onChange={()=>setSelected(current=>current.includes(user.id)?current.filter(x=>x!==user.id):[...current,user.id])}/></td>
            <td><div className={`table-avatar avatar-${index%5}`}>{user.name.split(' ').map(x=>x[0]).join('')}</div><strong>{user.name}</strong></td>
            <td>{user.email}</td><td>@{user.username}</td>
            <td><span className={`user-status ${user.status.toLowerCase()}`}>{user.status}</span></td>
            <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
            <td>{user.region}</td><td>{user.joined}</td><td>{user.lastActive}</td>
            <td><button title="Edit user" onClick={()=>setEditing({...user})}><Edit3/></button><button className="delete" title="Delete user" onClick={()=>remove(user.id)}><Trash2/></button></td>
          </tr>)}</tbody>
        </table>
        {!visible.length&&<div className="no-users"><Search/><h3>No users found</h3><p>Try adjusting your search or filters.</p></div>}
      </div>
      <div className="table-footer"><div>Rows per page <button>10 <ChevronDown/></button><strong>{visible.length}</strong> of {users.length} users</div><div className="pagination"><button><ChevronLeft/></button><button className="active">1</button><button>2</button><button>3</button><span>…</span><button><ChevronRight/></button></div></div>
    </>}
    {editing&&<div className="modal-backdrop"><form className="modal user-form" onSubmit={save}>
      <button type="button" className="modal-close" onClick={()=>setEditing(null)}><X/></button>
      <div className="login-icon"><UserRound/></div><span className="overline">{editing.id?'Account details':'New platform access'}</span><h2>{editing.id?'Edit user':'Add user'}</h2><p>Assign an identity, role, and starting access state.</p>
      <div className="form-grid"><label>Full name<input required value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})}/></label><label>Username<input required value={editing.username} onChange={e=>setEditing({...editing,username:e.target.value})}/></label></div>
      <label>Email address<input type="email" required value={editing.email} onChange={e=>setEditing({...editing,email:e.target.value})}/></label>
      <div className="form-grid"><label>Role<select value={editing.role} onChange={e=>setEditing({...editing,role:e.target.value})}>{roles.map(x=><option key={x}>{x}</option>)}</select></label><label>Status<select value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value})}>{statuses.map(x=><option key={x}>{x}</option>)}</select></label></div>
      <label>Region<input required value={editing.region} onChange={e=>setEditing({...editing,region:e.target.value})}/></label>
      <div className="form-actions"><button type="button" className="secondary" onClick={()=>setEditing(null)}>Cancel</button><button className="primary">{editing.id?'Save changes':'Create user'}</button></div>
    </form></div>}
  </div>;
}

function PlaceholderTab({tab}){
  return <section className="card settings-placeholder"><ShieldCheck/><span className="overline">Governance module</span><h2>{tab}</h2><p>{tab==='Roles & permissions'?'Define which portal modules and actions are available to Admins, Approvers, Agencies, and Trusted Counters.':'Review authentication events, permission changes, session activity, and administrative actions.'}</p><button className="primary">Open configuration</button></section>;
}
