'use client';

import { useState } from 'react';
import { Activity, Building2, CalendarCheck, ClipboardList, HardHat, LayoutDashboard, MapPin, Settings, Users, Plus, Search, CheckCircle2, Clock3, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';

const navItems = [
  ['Dashboard', LayoutDashboard], ['Projects & Sites', Building2], ['Workforce', Users],
  ['Attendance', CalendarCheck], ['Tasks', ClipboardList], ['Reports', Activity], ['Settings', Settings]
] as const;

type Site = { name: string; project: string; manager: string; workers: number; progress: number; status: string };
type Worker = { name: string; code: string; trade: string; site: string; status: string };
type Task = { title: string; site: string; assignee: string; due: string; status: string };

const initialSites: Site[] = [
  { name: 'Hyderabad Metro Package B', project: 'Hyderabad Metro', manager: 'Ravi Kumar', workers: 84, progress: 68, status: 'On Track' },
  { name: 'ORR Expansion – Zone 4', project: 'ORR Expansion', manager: 'Suresh Reddy', workers: 57, progress: 42, status: 'On Track' },
  { name: 'Industrial Park – Block A', project: 'Industrial Park', manager: 'Priya Nair', workers: 39, progress: 81, status: 'Attention' }
];
const initialWorkers: Worker[] = [
  { name: 'Ramesh Kumar', code: 'WRK-1001', trade: 'Mason', site: 'Hyderabad Metro Package B', status: 'Active' },
  { name: 'Anil Reddy', code: 'WRK-1002', trade: 'Operator', site: 'ORR Expansion – Zone 4', status: 'Active' },
  { name: 'Sita Devi', code: 'WRK-1003', trade: 'Electrician', site: 'Industrial Park – Block A', status: 'Active' },
  { name: 'Mahesh Rao', code: 'WRK-1004', trade: 'Carpenter', site: 'Hyderabad Metro Package B', status: 'Inactive' }
];
const initialTasks: Task[] = [
  { title: 'Foundation reinforcement – Grid A', site: 'Hyderabad Metro Package B', assignee: 'Ravi Kumar', due: 'Today', status: 'In Progress' },
  { title: 'Drainage excavation – Zone 4', site: 'ORR Expansion – Zone 4', assignee: 'Suresh Reddy', due: 'Tomorrow', status: 'Pending' },
  { title: 'Electrical conduit installation', site: 'Industrial Park – Block A', assignee: 'Priya Nair', due: '05 Sep', status: 'Completed' }
];

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [active, setActive] = useState('Dashboard');
  const [sites, setSites] = useState(initialSites);
  const [workers, setWorkers] = useState(initialWorkers);
  const [tasks, setTasks] = useState(initialTasks);
  const [notice, setNotice] = useState('');

  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;

  function addSite() {
    const next = sites.length + 1;
    setSites([...sites, { name: `New Construction Site ${next}`, project: 'New Project', manager: 'Unassigned', workers: 0, progress: 0, status: 'Planning' }]);
    setNotice('New site created.');
  }
  function addWorker() {
    const next = workers.length + 1001;
    setWorkers([...workers, { name: `New Worker ${next}`, code: `WRK-${next}`, trade: 'General Worker', site: sites[0]?.name ?? 'Unassigned', status: 'Active' }]);
    setNotice('New worker added.');
  }
  function addTask() {
    setTasks([...tasks, { title: 'New site task', site: sites[0]?.name ?? 'Unassigned', assignee: 'Unassigned', due: 'Today', status: 'Pending' }]);
    setNotice('New task created.');
  }

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><span className="logo"><HardHat size={20}/></span>SiteOps360</div>
      <nav className="nav">{navItems.map(([label, Icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setNotice(''); }}><Icon size={17}/>{label}</button>)}</nav>
      <div className="sidebar-foot"><div className="muted">MVP</div><div>Construction Operations</div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div><strong>{active}</strong></div><div className="user"><span className="muted">Company Admin</span><span className="avatar">MD</span></div></header>
      <div className="page">
        <div className="eyebrow">Operations / {active}</div>
        <h1>{active === 'Dashboard' ? 'Site Operations Dashboard' : active}</h1>
        <p className="subtitle">Manage construction activity, workforce and daily execution from one place.</p>
        {notice && <div className="notice"><CheckCircle2 size={16}/> {notice}</div>}
        {active === 'Dashboard' && <Dashboard sites={sites} workers={workers} tasks={tasks} />}
        {active === 'Projects & Sites' && <Sites sites={sites} onAdd={addSite} />}
        {active === 'Workforce' && <Workforce workers={workers} onAdd={addWorker} />}
        {active === 'Attendance' && <Attendance workers={workers} />}
        {active === 'Tasks' && <Tasks tasks={tasks} onAdd={addTask} />}
        {active === 'Reports' && <Reports sites={sites} workers={workers} tasks={tasks} />}
        {active === 'Settings' && <SettingsPanel />}
      </div>
    </main>
  </div>;
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setError('');
    onLogin();
  }

  return <main className="login-page">
    <section className="login-visual" aria-hidden="true">
      <div className="visual-overlay" />
      <div className="skyline">
        <div className="building b1"><i/><i/><i/><i/><i/></div>
        <div className="building b2"><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="building b3"><i/><i/><i/><i/><i/><i/></div>
        <div className="building b4"><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="building b5"><i/><i/><i/><i/><i/></div>
        <div className="building b6"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="crane"><span/><b/></div>
      </div>
      <div className="visual-copy">
        <div className="brand light"><span className="logo"><HardHat size={21}/></span>SiteOps360</div>
        <h1>Build smarter.<br/>Operate better.</h1>
        <p>One platform for projects, sites, workforce and daily construction operations.</p>
        <div className="visual-points"><span>✓ Workforce visibility</span><span>✓ Site execution</span><span>✓ Real-time operations</span></div>
      </div>
    </section>

    <section className="login-panel">
      <div className="login-box">
        <div className="mobile-brand"><span className="logo"><HardHat size={20}/></span>SiteOps360</div>
        <div className="login-heading"><span className="login-icon"><LockKeyhole size={20}/></span><div><h2>Welcome back</h2><p>Sign in to your SiteOps360 account</p></div></div>
        <form onSubmit={submit} className="login-form">
          <label>Email address<div className="input-wrap"><Mail size={17}/><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" autoComplete="email"/></div></label>
          <label>Password<div className="input-wrap"><LockKeyhole size={17}/><input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password"/><button type="button" className="icon-btn" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
          <div className="login-options"><label className="remember"><input type="checkbox"/> Remember me</label><button type="button" className="forgot">Forgot password?</button></div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-submit" type="submit">Sign in <span>→</span></button>
        </form>
        <div className="login-divider"><span>Secure construction operations</span></div>
        <p className="login-footer">© 2026 SiteOps360 · Enterprise Site Management</p>
      </div>
    </section>
  </main>;
}

function Dashboard({ sites, workers, tasks }: { sites: Site[]; workers: Worker[]; tasks: Task[] }) {
  const activeWorkers = workers.filter(w => w.status === 'Active').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  return <>
    <div className="grid"><Stat label="Active Projects" value="12"/><Stat label="Active Sites" value={String(sites.length + 15)}/><Stat label="Workforce Today" value={String(activeWorkers + 423)}/><Stat label="Attendance" value="93.4%"/></div>
    <div className="section"><div className="card"><div className="card-title"><span>Site Overview</span><span className="muted">{completed} tasks completed</span></div><SiteTable sites={sites}/></div><div className="card"><div className="card-title">Recent Activity</div><div className="activity"><ActivityRow text="84 workers marked present" time="Today · 08:42"/><ActivityRow text="Concrete work package updated" time="Today · 08:15"/><ActivityRow text="New site supervisor assigned" time="Yesterday · 17:30"/><ActivityRow text="Project progress reviewed" time="Yesterday · 16:05"/></div></div></div>
  </>;
}
function Sites({ sites, onAdd }: { sites: Site[]; onAdd: () => void }) { return <div className="card"><div className="card-title"><span>Projects & Sites</span><button className="primary" onClick={onAdd}><Plus size={15}/> New Site</button></div><div className="toolbar"><div className="search"><Search size={15}/><input placeholder="Search sites..."/></div><select><option>All statuses</option><option>On Track</option><option>Attention</option></select></div><SiteTable sites={sites} detailed/></div>; }
function SiteTable({ sites, detailed = false }: { sites: Site[]; detailed?: boolean }) { return <div className="table-wrap"><table className="table"><thead><tr><th>Site</th>{detailed && <th>Project</th>}<th>Manager</th><th>Workers</th><th>Progress</th><th>Status</th></tr></thead><tbody>{sites.map(s => <tr key={s.name}><td><MapPin size={14}/>{s.name}</td>{detailed && <td>{s.project}</td>}<td>{s.manager}</td><td>{s.workers}</td><td><div className="progress"><span style={{width:`${s.progress}%`}}/></div>{s.progress}%</td><td><span className={'badge ' + (s.status === 'Attention' ? 'warn' : s.status === 'Planning' ? 'neutral' : '')}>{s.status}</span></td></tr>)}</tbody></table></div>; }
function Workforce({ workers, onAdd }: { workers: Worker[]; onAdd: () => void }) { return <div className="card"><div className="card-title"><span>Workforce</span><button className="primary" onClick={onAdd}><Plus size={15}/> Add Worker</button></div><div className="toolbar"><div className="search"><Search size={15}/><input placeholder="Search workers..."/></div><select><option>All trades</option><option>Mason</option><option>Operator</option><option>Electrician</option></select></div><div className="table-wrap"><table className="table"><thead><tr><th>Name</th><th>Employee Code</th><th>Trade</th><th>Site</th><th>Status</th></tr></thead><tbody>{workers.map(w => <tr key={w.code}><td><strong>{w.name}</strong></td><td>{w.code}</td><td>{w.trade}</td><td>{w.site}</td><td><span className={'badge '+(w.status==='Inactive'?'neutral':'')}>{w.status}</span></td></tr>)}</tbody></table></div></div>; }
function Attendance({ workers }: { workers: Worker[] }) { return <div className="card"><div className="card-title"><span>Daily Attendance</span><button className="primary">Save Attendance</button></div><div className="attendance-head"><div><strong>02 Sep 2026</strong><div className="muted">Mark attendance for active workforce</div></div><span className="badge">Present 93.4%</span></div><div className="table-wrap"><table className="table"><thead><tr><th>Worker</th><th>Site</th><th>Check-in</th><th>Status</th><th>Action</th></tr></thead><tbody>{workers.filter(w=>w.status==='Active').map((w,i)=><tr key={w.code}><td>{w.name}</td><td>{w.site}</td><td>{i%3===0?'08:12':'08:2'+i}</td><td><span className="badge">Present</span></td><td><button className="link-btn">Edit</button></td></tr>)}</tbody></table></div></div>; }
function Tasks({ tasks, onAdd }: { tasks: Task[]; onAdd: () => void }) { return <div className="card"><div className="card-title"><span>Tasks & Work Packages</span><button className="primary" onClick={onAdd}><Plus size={15}/> New Task</button></div><div className="task-grid">{tasks.map((t,i)=><div className="task-card" key={i}><div className="task-top"><span className={'badge '+(t.status==='Pending'?'neutral':'')}>{t.status}</span><Clock3 size={16}/></div><h3>{t.title}</h3><div className="muted">{t.site}</div><div className="task-meta"><span>Owner: {t.assignee}</span><span>Due: {t.due}</span></div></div>)}</div></div>; }
function Reports({ sites, workers, tasks }: { sites: Site[]; workers: Worker[]; tasks: Task[] }) { const avg = Math.round(sites.reduce((a,s)=>a+s.progress,0)/sites.length); return <div className="grid reports"><Stat label="Average Site Progress" value={`${avg}%`}/><Stat label="Active Workforce" value={String(workers.filter(w=>w.status==='Active').length)}/><Stat label="Open Tasks" value={String(tasks.filter(t=>t.status!=='Completed').length)}/><Stat label="Sites Requiring Attention" value={String(sites.filter(s=>s.status==='Attention').length)}/><div className="card report-wide"><div className="card-title">Operational Summary</div><p>SiteOps360 MVP reporting consolidates site progress, workforce availability, attendance and task execution. Detailed export and analytics can be added after the core workflows are validated.</p></div></div>; }
function SettingsPanel() { return <div className="settings-grid"><div className="card"><div className="card-title">Company Profile</div><label>Company Name<input value="SiteOps360 Demo Company" readOnly/></label><label>Default Region<select><option>India</option></select></label><button className="primary">Save Changes</button></div><div className="card"><div className="card-title">Access & Roles</div><div className="role"><strong>Company Admin</strong><span>Full company access</span></div><div className="role"><strong>Project Manager</strong><span>Projects and site operations</span></div><div className="role"><strong>Site Engineer</strong><span>Daily execution and progress</span></div><div className="role"><strong>Supervisor</strong><span>Workforce and attendance</span></div><div className="role"><strong>Worker</strong><span>Assigned tasks and updates</span></div></div></div>; }
function Stat({label,value}:{label:string,value:string}) { return <div className="card"><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="muted" style={{marginTop:6}}>Current operational snapshot</div></div>; }
function ActivityRow({text,time}:{text:string,time:string}) { return <div className="activity-row"><span className="dot"/><div><div>{text}</div><div className="muted">{time}</div></div></div>; }
