import React, {useState} from 'react';
import {AlertTriangle, CheckCircle2, ChevronRight, Clock3, Radio, Send, ShieldCheck, XCircle} from 'lucide-react';
import {PageIntro, Stats} from './Portal';

const initialAlerts = [
  {id:'NGR-2026-0841',level:'CRITICAL',title:'Imminent flash flooding along Baro River',region:'Gambela Region',people:'184,200',confidence:96,source:'Satellite + 14 field reports',message:'DANGER: Severe flooding expected along Baro River within 2 hours. Move immediately to designated high ground. Follow local authority directions.'},
  {id:'NGR-2026-0839',level:'HIGH',title:'Landslide threshold exceeded',region:'Gofa Zone, SNNPR',people:'38,400',confidence:91,source:'Rain gauge + ground sensors',message:'WARNING: Landslide risk is high in Gofa Zone. Avoid steep slopes and follow evacuation guidance from local officials.'},
  {id:'NGR-2026-0836',level:'HIGH',title:'Rapid drought deterioration',region:'Somali Region',people:'412,000',confidence:88,source:'NDVI + regional bureau',message:'ADVISORY: Drought conditions are worsening. Conserve water and check local distribution schedules.'}
];

export default function ApprovalQueue() {
  const [alerts,setAlerts] = useState(initialAlerts);
  const [selected,setSelected] = useState(initialAlerts[0]);
  const [sending,setSending] = useState(false);
  const [toast,setToast] = useState('');
  const decide = async (approved) => {
    if (!selected) return;
    if (approved) {
      setSending(true);
      try {
        const response = await fetch('/api/broadcast/sms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...selected,channels:['SMS','USSD'],approvedBy:'Meron Tesfaye'})});
        if (!response.ok) throw new Error('Broadcast gateway rejected the request');
        const result = await response.json();
        setToast(`Broadcast ${result.broadcastId} queued for ${selected.people} people`);
      } catch (error) { setToast(error.message); setSending(false); return; }
      setSending(false);
    } else setToast(`${selected.id} returned for further verification`);
    const remaining=alerts.filter(a=>a.id!==selected.id); setAlerts(remaining); setSelected(remaining[0]||null);
  };
  return <>
    <PageIntro eyebrow="Government sign-off" title="Emergency broadcast approval" description="Every public alert requires explicit authorization. Review the evidence, affected population, and final message before release." action={<span className="secure-badge"><ShieldCheck size={16}/> Dual-control audit active</span>}/>
    <Stats items={[
      {label:'Pending approval',value:String(alerts.length),delta:'Oldest: 6 minutes',icon:<Clock3/>},
      {label:'Critical queue',value:String(alerts.filter(a=>a.level==='CRITICAL').length),delta:'Immediate action',icon:<AlertTriangle/>},
      {label:'Approved today',value:'12',delta:'3.8M recipients',icon:<CheckCircle2/>},
      {label:'Gateway status',value:'Online',delta:'SMS + USSD ready',icon:<Radio/>}
    ]}/>
    {toast&&<div className="toast"><CheckCircle2/><span>{toast}</span><button onClick={()=>setToast('')}>×</button></div>}
    <div className="approval-layout">
      <section className="card queue">
        <div className="card-head"><div><span className="overline">Decision queue</span><h3>Pending alerts</h3></div><b className="count">{alerts.length}</b></div>
        {alerts.length ? alerts.map(alert=><button key={alert.id} onClick={()=>setSelected(alert)} className={selected?.id===alert.id?'selected':''}><span className={`alert-level ${alert.level.toLowerCase()}`}>{alert.level}</span><strong>{alert.title}</strong><small>{alert.region} • {alert.confidence}% confidence</small><ChevronRight/></button>) : <div className="empty"><CheckCircle2/><h3>Queue cleared</h3><p>No alerts are waiting for approval.</p></div>}
      </section>
      <section className="card decision">
        {selected ? <>
          <div className="decision-head"><div><span className={`alert-level ${selected.level.toLowerCase()}`}>{selected.level}</span><span className="case-id">{selected.id}</span></div><span><Clock3 size={15}/> Submitted 6m ago</span></div>
          <h2>{selected.title}</h2><p className="location">{selected.region}</p>
          <div className="evidence-grid"><div><span>Population at risk</span><strong>{selected.people}</strong></div><div><span>AI confidence</span><strong>{selected.confidence}%</strong></div><div><span>Evidence source</span><strong>{selected.source}</strong></div></div>
          <div className="message-preview"><div><span className="overline">Public message preview</span><span>SMS • USSD</span></div><p>{selected.message}</p><small>{selected.message.length}/320 characters • Amharic translation attached</small></div>
          <div className="risk-note"><AlertTriangle/><p><strong>Authorization is irreversible.</strong> Approval sends this message to carrier gateways and creates a permanent audit entry.</p></div>
          <div className="decision-actions"><button className="reject" onClick={()=>decide(false)}><XCircle/> Return for review</button><button className="approve" disabled={sending} onClick={()=>decide(true)}><Send/>{sending?'Authorizing…':'Approve & broadcast'}</button></div>
        </> : <div className="empty large"><CheckCircle2/><h2>All decisions complete</h2><p>The government approval queue is clear.</p></div>}
      </section>
    </div>
  </>;
}
