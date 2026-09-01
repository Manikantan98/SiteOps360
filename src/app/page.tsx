'use client';

import { useState } from 'react';
import { Activity, Building2, CalendarCheck, ClipboardList, HardHat, LayoutDashboard, MapPin, Settings, Users } from 'lucide-react';

const navItems = [
  ['Dashboard', LayoutDashboard], ['Projects & Sites', Building2], ['Workforce', Users],
  ['Attendance', CalendarCheck], ['Tasks', ClipboardList], ['Reports', Activity], ['Settings', Settings]
] as const;

const sites = [
  { name: 'Hyderabad Metro Package B', manager: 'Ravi Kumar', workers: 84, progress: '68%', status: 'On Track' },
  { name: 'ORR Expansion – Zone 4', manager: 'Suresh Reddy', workers: 57, progress: '42%', status: 'On Track' },
  { name: 'Industrial Park – Block A', manager: 'Priya Nair', workers: 39, progress: '81%', status: 'Attention' }
];

export default function Home() {
  const [active, setActive] = useState('Dashboard');
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="logo"><HardHat size={20}/></span>SiteOps360</div>
        <nav className="nav">
          {navItems.map(([label, Icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => setActive(label)}><Icon size={17} style={{verticalAlign:'middle', marginRight:10}}/>{label}</button>)}
        </nav>
      </aside>
      <main className="main">
        <header className="topbar"><div><strong>{active}</strong></div><div style={{display:'flex',alignItems:'center',gap:12}}><span className="muted">Company Admin</span><span className="avatar">MD</span></div></header>
        <div className="page">
          <div className="eyebrow">Operations / {active}</div>
          <h1>{active === 'Dashboard' ? 'Site Operations Dashboard' : active}</h1>
          <p className="subtitle">Monitor construction activity, workforce and daily execution from one place.</p>
          {active === 'Dashboard' ? <Dashboard /> : <div className="card"><div className="card-title">{active} module</div><p className="subtitle">This MVP module is scaffolded and ready for its next workflow implementation.</p><button className="primary">Add New</button></div>}
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  return <>
    <div className="grid">
      <Stat label="Active Projects" value="12" />
      <Stat label="Active Sites" value="18" />
      <Stat label="Workforce Today" value="427" />
      <Stat label="Attendance" value="93.4%" />
    </div>
    <div className="section">
      <div className="card">
        <div className="card-title"><span>Site Overview</span><button className="primary">+ New Site</button></div>
        <table className="table"><thead><tr><th>Site</th><th>Manager</th><th>Workers</th><th>Progress</th><th>Status</th></tr></thead><tbody>{sites.map(s => <tr key={s.name}><td><MapPin size={14} style={{verticalAlign:'middle',marginRight:6}}/>{s.name}</td><td>{s.manager}</td><td>{s.workers}</td><td>{s.progress}</td><td><span className={'badge ' + (s.status === 'Attention' ? 'warn' : '')}>{s.status}</span></td></tr>)}</tbody></table>
      </div>
      <div className="card"><div className="card-title">Recent Activity</div><div className="activity">
        <ActivityRow text="84 workers marked present" time="Today · 08:42" />
        <ActivityRow text="Concrete work package updated" time="Today · 08:15" />
        <ActivityRow text="New site supervisor assigned" time="Yesterday · 17:30" />
        <ActivityRow text="Project progress reviewed" time="Yesterday · 16:05" />
      </div></div>
    </div>
  </>;
}
function Stat({label,value}:{label:string,value:string}) { return <div className="card"><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="muted" style={{marginTop:6}}>Current operational snapshot</div></div>; }
function ActivityRow({text,time}:{text:string,time:string}) { return <div className="activity-row"><span className="dot"/><div><div>{text}</div><div className="muted">{time}</div></div></div>; }
