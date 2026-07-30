import React, {useEffect, useMemo, useState} from 'react';
import {
  Activity, AlertTriangle, BarChart3, Bell, Boxes, CheckCircle2, ChevronRight,
  ClipboardList, Clock3, Command, HeartHandshake, LayoutDashboard, LockKeyhole,
  LogOut, Map, Menu, Radio, Search, Send, Settings, ShieldCheck, Truck,
  UserCheck, Users, X, Zap
} from 'lucide-react';

export const iconMap = {
  overview: LayoutDashboard, map: Map, community: Users, donations: HeartHandshake,
  approval: ShieldCheck, reports: ClipboardList, analytics: BarChart3, dispatch: Truck,
  resources: Boxes, settings: Settings, status: Activity, access: Command
};

const portalMeta = {
  main: {label:'Public intelligence', eyebrow:'National public portal', user:'Community visitor', role:'Public access'},
  approval: {label:'Government approval', eyebrow:'Authorized broadcast desk', user:'Meron Tesfaye', role:'Federal approver'},
  agency: {label:'Relief operations', eyebrow:'Response coordination', user:'Dawit Bekele', role:'Field operations lead'},
  admin: {label:'Platform control', eyebrow:'System governance', user:'Selam Alemu', role:'Super administrator'}
};

export function useAuth(portal, required = true) {
  const key = `negarit:${portal}:session`;
  const [authenticated, setAuthenticated] = useState(() => !required || localStorage.getItem(key) === 'active');
  const login = () => { localStorage.setItem(key, 'active'); setAuthenticated(true); };
  const logout = () => { localStorage.removeItem(key); setAuthenticated(false); };
  return {authenticated, login, logout};
}

export function Login({portal, onLogin}) {
  const meta = portalMeta[portal];
  const [busy, setBusy] = useState(false);
  const submit = (event) => {
    event.preventDefault(); setBusy(true);
    setTimeout(onLogin, 450);
  };
  return <div className="login-page">
    <section className="login-story">
      <Brand/>
      <div className="story-copy">
        <span className="signal"><span/> Secure national infrastructure</span>
        <h1>Decisions that protect <em>millions.</em></h1>
        <p>One coordinated intelligence layer for Ethiopia’s early warning, emergency response, and public safety network.</p>
        <div className="story-stats">
          <div><strong>99.98%</strong><span>Platform uptime</span></div>
          <div><strong>11</strong><span>Regions connected</span></div>
          <div><strong>&lt; 2m</strong><span>Alert dispatch</span></div>
        </div>
      </div>
      <p className="classification">Protected • Authorized personnel only</p>
    </section>
    <section className="login-panel">
      <form className="login-card" onSubmit={submit}>
        <div className="login-icon"><LockKeyhole size={23}/></div>
        <span className="overline">{meta.eyebrow}</span>
        <h2>Welcome back</h2>
        <p>Sign in to the {meta.label.toLowerCase()} portal.</p>
        <label>Government email<input type="email" defaultValue={`${portal}@negarit.gov.et`} required/></label>
        <label>Password<input type="password" defaultValue="negarit-demo" required/></label>
        <div className="form-row"><label className="remember"><input type="checkbox" defaultChecked/> Keep me signed in</label><button type="button" className="link-btn">Forgot password?</button></div>
        <button className="primary wide" disabled={busy}>{busy ? 'Verifying…' : <>Sign in securely <ChevronRight size={17}/></>}</button>
        <p className="demo-note">Demo access: use the pre-filled credentials</p>
      </form>
    </section>
  </div>;
}

function Brand({compact=false}) {
  return <div className={`brand ${compact?'compact':''}`}>
    <div className="brand-mark"><Radio size={21}/></div>
    <div><strong>NEGARIT</strong><span>Disaster Intelligence</span></div>
  </div>;
}

export function Portal({portal, nav, children, onLogout, publicMode=false, onMemberLogin}) {
  const [active, setActive] = useState(nav[0].id);
  const [mobile, setMobile] = useState(false);
  const meta = portalMeta[portal];
  const current = nav.find(item => item.id === active) || nav[0];
  useEffect(() => { document.title = `${current.label} • Negarit`; }, [current]);
  return <div className="portal">
    <aside className={`sidebar ${mobile?'open':''}`}>
      <div>
        <div className="side-head"><Brand compact/><button className="icon-button mobile-only" onClick={()=>setMobile(false)}><X/></button></div>
        <div className="portal-label">{meta.label}</div>
        <nav>{nav.map(item => {
          const Icon = iconMap[item.id] || LayoutDashboard;
          return <button key={item.id} className={active===item.id?'active':''} onClick={()=>{setActive(item.id);setMobile(false)}}><Icon size={18}/><span>{item.label}</span>{item.badge&&<b>{item.badge}</b>}</button>;
        })}</nav>
      </div>
      <div className="side-bottom">
        <div className="mini-status"><span className="live-dot"/><div><strong>All systems operational</strong><small>Updated just now</small></div></div>
        <div className="profile">
          <div className="avatar">{meta.user.split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
          <div><strong>{meta.user}</strong><small>{meta.role}</small></div>
          {publicMode ? <button title="Member sign in" onClick={onMemberLogin}><UserCheck size={17}/></button> : <button title="Sign out" onClick={onLogout}><LogOut size={17}/></button>}
        </div>
      </div>
    </aside>
    <main>
      <header className="topbar">
        <button className="icon-button mobile-only" onClick={()=>setMobile(true)}><Menu/></button>
        <div><span className="breadcrumb">{meta.eyebrow} /</span><h1>{current.label}</h1></div>
        <div className="top-actions">
          <div className="search"><Search size={17}/><input placeholder="Search intelligence…"/></div>
          <button className="icon-button alert-button"><Bell size={19}/><i>3</i></button>
          <div className="date-chip"><span>LIVE</span> 31 JUL 2026</div>
        </div>
      </header>
      <div className="content">{children(active, setActive)}</div>
      <footer>NEGARIT • National Disaster Intelligence & Early Warning System <span>v2.4.0</span></footer>
    </main>
  </div>;
}

export function PageIntro({eyebrow,title,description,action}) {
  return <div className="page-intro"><div><span className="overline">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div>{action}</div>;
}

export function Stats({items}) {
  return <div className="stats-grid">{items.map((item,i)=><article className="stat-card" key={item.label}>
    <div className={`stat-icon tone-${i%4}`}>{item.icon || <Activity size={20}/>}</div>
    <div><span>{item.label}</span><strong>{item.value}</strong><small className={item.down?'negative':''}>{item.delta}</small></div>
  </article>)}</div>;
}

export function Overview({kind='main'}) {
  const data = {
    main: [
      {label:'Active advisories',value:'6',delta:'2 high priority',icon:<AlertTriangle/>},
      {label:'People reached',value:'2.4M',delta:'+18% this month',icon:<Radio/>},
      {label:'Community reports',value:'1,284',delta:'+94 this week',icon:<Users/>},
      {label:'Relief distributed',value:'ETB 8.6M',delta:'87% delivered',icon:<HeartHandshake/>}
    ],
    approval: [
      {label:'Awaiting decision',value:'4',delta:'1 critical alert',icon:<Clock3/>},
      {label:'Broadcasts today',value:'12',delta:'3.8M recipients',icon:<Send/>},
      {label:'Median decision time',value:'4m 12s',delta:'↓ 38 seconds',icon:<Zap/>},
      {label:'Verified signals',value:'98.4%',delta:'+1.2% this week',icon:<ShieldCheck/>}
    ],
    agency: [
      {label:'Active missions',value:'18',delta:'+3 since morning',icon:<Truck/>},
      {label:'Responders deployed',value:'246',delta:'31 teams active',icon:<Users/>},
      {label:'Supplies in transit',value:'74.2t',delta:'92% on schedule',icon:<Boxes/>},
      {label:'People assisted',value:'12,840',delta:'+2,104 today',icon:<HeartHandshake/>}
    ],
    admin: [
      {label:'Active users',value:'3,842',delta:'+12.8% this month',icon:<Users/>},
      {label:'API throughput',value:'18.4K',delta:'requests / minute',icon:<Activity/>},
      {label:'Services healthy',value:'12 / 12',delta:'99.98% uptime',icon:<CheckCircle2/>},
      {label:'Open access reviews',value:'7',delta:'2 require attention',icon:<UserCheck/>}
    ]
  }[kind];
  return <>
    <PageIntro eyebrow="Live operational picture" title={kind==='main'?'Ethiopia, at a glance':`Good morning, ${portalMeta[kind].user.split(' ')[0]}.`} description="A unified view of current risks, response capacity, and verified intelligence across the country." action={<button className="secondary"><Clock3 size={16}/> Last 24 hours</button>}/>
    <Stats items={data}/>
    <div className="dashboard-grid">
      <section className="card span-2">
        <div className="card-head"><div><span className="overline">National risk index</span><h3>Incident activity</h3></div><span className="trend">+14.2% this week</span></div>
        <div className="chart"><div className="y-labels"><span>120</span><span>80</span><span>40</span><span>0</span></div><div className="bars">{[38,55,42,70,62,86,74,94,71,88,79,96].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><span>{['A','S','O','N','D','J','F','M','A','M','J','J'][i]}</span></div>)}</div></div>
      </section>
      <section className="card">
        <div className="card-head"><div><span className="overline">Priority feed</span><h3>Active situations</h3></div><button className="link-btn">View all</button></div>
        <div className="feed">
          <Feed severity="critical" title="Flash flood warning" place="Gambela • 18 min ago"/>
          <Feed severity="high" title="Landslide risk elevated" place="Gofa Zone • 42 min ago"/>
          <Feed severity="watch" title="Seismic activity detected" place="Afar • 1 hr ago"/>
          <Feed severity="stable" title="Drought response active" place="Somali Region • 2 hr ago"/>
        </div>
      </section>
    </div>
    <section className="card map-panel">
      <div className="map-copy"><span className="overline">Geospatial intelligence</span><h3>National risk picture</h3><p>Live signals from satellite feeds, field counters, and agency reports.</p><div className="map-legend"><span><i className="critical"/>Critical</span><span><i className="high"/>High</span><span><i className="watch"/>Watch</span></div></div>
      <div className="abstract-map"><span className="zone z1"/><span className="zone z2"/><span className="zone z3"/><span className="zone z4"/><div className="map-grid"/></div>
    </section>
  </>;
}

function Feed({severity,title,place}) { return <div className="feed-item"><span className={`severity ${severity}`}/><div><strong>{title}</strong><small>{place}</small></div><ChevronRight size={16}/></div>; }

export function GenericPage({type}) {
  const page = {
    map:['Operational risk map','Live hazard layers and verified geospatial intelligence.'],
    community:['Community network','Your trusted counter profile, impact, credentials, and rewards.'],
    donations:['Donations & resources','Transparent relief funding and physical supply movements.'],
    reports:['Verified field reports','Traceable reports, evidence, confidence scores, and review history.'],
    analytics:['Response intelligence','Predictive models and measurable operational outcomes.'],
    dispatch:['Field dispatch','Coordinate teams and assign response units to exact locations.'],
    resources:['Resources & donations','Inventory, relief funds, and allocation across active missions.'],
    settings:['Settings & user management','Roles, granular permissions, and secure access governance.'],
    status:['System status','Health of every ingestion, gateway, and reward endpoint.'],
    access:['Full system access','Inspect cross-platform maps, reports, dispatch, and analytics.']
  }[type] || ['Operational module','Live Negarit intelligence workspace.'];
  return <>
    <PageIntro eyebrow="Operational module" title={page[0]} description={page[1]} action={<button className="primary">Create new <ChevronRight size={16}/></button>}/>
    <div className="module-grid">
      <section className="card module-primary">
        <div className="card-head"><div><span className="overline">Live workspace</span><h3>{page[0]}</h3></div><span className="status-pill"><i/>Live data</span></div>
        {type==='map' || type==='access' ? <div className="large-map"><div className="map-grid"/><span className="pin p1">7</span><span className="pin p2">3</span><span className="pin p3">12</span></div> :
        <div className="data-table">
          {['Gambela flood response','Gofa landslide corridor','Afar seismic watch','Somali drought operation','Oromia rainfall advisory'].map((x,i)=><div className="data-row" key={x}><div className="row-icon">{i+1}</div><div><strong>{x}</strong><small>Updated {i*11+3} minutes ago • Confidence {98-i*3}%</small></div><span className={`tag ${i===0?'red':''}`}>{i===0?'Priority':'Active'}</span><ChevronRight size={17}/></div>)}
        </div>}
      </section>
      <aside className="card side-metrics"><span className="overline">Today</span><h3>Operational pulse</h3><div className="metric"><span>Verified events</span><strong>28</strong><i style={{width:'78%'}}/></div><div className="metric"><span>Response readiness</span><strong>92%</strong><i style={{width:'92%'}}/></div><div className="metric"><span>Coverage</span><strong>81%</strong><i style={{width:'81%'}}/></div><hr/><h4>Recent activity</h4><p><i className="live-dot"/> New field evidence verified</p><p><i className="live-dot amber"/> Resource allocation updated</p><p><i className="live-dot blue"/> Satellite layer synchronized</p></aside>
    </div>
  </>;
}

export function MemberLogin({onClose}) {
  return <div className="modal-backdrop"><form className="modal" onSubmit={e=>{e.preventDefault();onClose();}}><button type="button" className="modal-close" onClick={onClose}><X/></button><div className="login-icon"><UserCheck/></div><span className="overline">Community member</span><h2>Welcome to the network</h2><p>Access your volunteer badge, impact history, and data-bundle rewards.</p><label>Phone number<input defaultValue="+251 911 000 000"/></label><button className="primary wide">Send verification code</button></form></div>;
}
