/* SHADOWEVIL // OFFSEC — PUBLIC CONFIGURATION
   Update links once you have published your public profiles/repositories.
   Unset URLs are not displayed. Never include secrets or private IDs here. */
const PUBLIC_PROFILE = {
  alias: 'ShadowEvil',
  links: {
    GitHub: '',      // https://github.com/your-username
    LinkedIn: '',    // https://www.linkedin.com/in/your-profile/
    TryHackMe: '',   // https://tryhackme.com/p/your-profile
    HackTheBox: ''   // https://app.hackthebox.com/profile/your-id
  }
};

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.getElementById('site-header');
const progress = document.getElementById('reading-progress');
const art = document.getElementById('hero-art');
let queued = false;
function refreshScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    const y = scrollY;
    header.classList.toggle('scrolled', y > 36);
    progress.style.width = `${100 * y / Math.max(1, document.documentElement.scrollHeight - innerHeight)}%`;
    if (!reducedMotion && y < innerHeight) art.style.transform = `translate3d(0,${Math.min(y * 0.1,70)}px,0)`;
    queued = false;
  });
}
window.addEventListener('scroll',refreshScroll,{passive:true});refreshScroll();

const menuButton = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function toggleMenu(open) {
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
}
menuButton.addEventListener('click',()=>toggleMenu(mobileNav.hidden));
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>toggleMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});

if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs)=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}
  }),{threshold:.07,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
} else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

const awakenToggle=document.getElementById('awaken-toggle');
awakenToggle.addEventListener('click',()=>{
  const awake=document.body.classList.toggle('awakened');
  awakenToggle.setAttribute('aria-pressed',String(awake));
  document.getElementById('awaken-text').textContent=awake?'RETURN TO STILLNESS':'AWAKEN THE SHADOW';
});

const fieldContent={
  ad:{label:'[LAB RECORD 001]',overline:'DIRECTORY ATTACK PATHS',title:'One weak permission can change everything.',copy:'I study how seemingly isolated directory misconfigurations can become connected attack paths, from enumeration and credential access to privilege escalation and domain compromise in labs.',chips:['Kerberoasting','ACL abuse','BloodHound','Pivoting'],count:'01 / 04'},
  web:{label:'[LAB RECORD 002]',overline:'HTTP & AUTHENTICATION',title:'Trust the request. Verify the response.',copy:'I investigate how applications process inputs, sessions and access decisions. My lab practice includes manipulating HTTP requests, testing authentication behavior and assessing server-side restrictions.',chips:['Burp Suite','HTTP','Sessions','Access control'],count:'02 / 04'},
  binary:{label:'[LAB RECORD 003]',overline:'LOW-LEVEL SYSTEMS',title:'The smallest details hide the biggest flaws.',copy:'I study C memory behavior, stack frames, return addresses and control flow through debugger-driven practice. The goal is to understand how bugs arise, rather than memorize a payload.',chips:['C','GDB','Stack frames','Memory'],count:'03 / 04'},
  ops:{label:'[LAB RECORD 004]',overline:'THE OPERATOR WORKFLOW',title:'Method first. Tools second.',copy:'My training process moves from reconnaissance to exploitation and post-exploitation, then returns to review, better notes, and stronger methodology. I keep client work distinct from practice-lab achievements.',chips:['Reconnaissance','Validation','Post-exploitation','Documentation'],count:'04 / 04'}
};
const tabs=[...document.querySelectorAll('.field-tab')];
function selectField(name){
 const entry=fieldContent[name];if(!entry)return;
 tabs.forEach(tab=>{let active=tab.dataset.field===name;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
 const selected=tabs.find(tab=>tab.dataset.field===name);
 document.getElementById('panel-field').setAttribute('aria-labelledby',selected.id);
 for(const [id,key] of [['field-label','label'],['field-overline','overline'],['field-title','title'],['field-copy','copy'],['field-count','count']])document.getElementById(id).textContent=entry[key];
 const chips=document.getElementById('field-chips');chips.replaceChildren();entry.chips.forEach(tag=>{const span=document.createElement('span');span.textContent=tag;chips.appendChild(span)});
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectField(tab.dataset.field));
 tab.addEventListener('keydown',e=>{
  const direction=e.key==='ArrowRight'||e.key==='ArrowDown'?1:e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:0;
  if(direction){e.preventDefault();const next=tabs[(index+direction+tabs.length)%tabs.length];selectField(next.dataset.field);next.focus()}
 });
});

const filterButtons=[...document.querySelectorAll('[data-filter]')];
const projectRows=[...document.querySelectorAll('.project-row')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  const selection=button.dataset.filter;
  filterButtons.forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});
  projectRows.forEach(row=>{row.hidden=selection!=='all'&&row.dataset.category!==selection});
}));

async function copyAlias(){
 const label=document.getElementById('copy-label');
 try {await navigator.clipboard.writeText(PUBLIC_PROFILE.alias);label.textContent='COPIED TO CLIPBOARD'}
 catch {
  const el=document.createElement('textarea');el.value=PUBLIC_PROFILE.alias;document.body.appendChild(el);el.select();
  const worked=document.execCommand('copy');el.remove();label.textContent=worked?'COPIED TO CLIPBOARD':'SHADOWEVIL';
 }
 window.setTimeout(()=>label.textContent='COPY @SHADOWEVIL',1800);
}
document.getElementById('copy-alias').addEventListener('click',copyAlias);
const links=document.getElementById('external-links');
Object.entries(PUBLIC_PROFILE.links).forEach(([name,href])=>{
 if(!/^https:\/\/[^\s]+$/i.test(href))return;
 const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name.toUpperCase()+' ↗';links.appendChild(a);
});
document.getElementById('year').textContent=new Date().getFullYear();

// Atmospheric violet/red particles, intentionally lightweight and reduced-motion aware.
const canvas=document.getElementById('embers');
if(!reducedMotion && canvas.getContext){
 const ctx=canvas.getContext('2d');let w=0,h=0,dpr=1,particles=[],last=0;
 function resize(){w=innerWidth;h=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
 const n=Math.min(54,Math.max(15,Math.floor(w/29)));
 particles=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,r:.3+Math.random()*1.2,vy:-.07-Math.random()*.26,vx:(Math.random()-.5)*.18,alpha:.12+Math.random()*.37,phase:Math.random()*6.3,red:Math.random()<.24}));}
 resize();addEventListener('resize',resize,{passive:true});
 function draw(time){requestAnimationFrame(draw);if(document.hidden||time-last<32)return;let dt=Math.min(2,(time-last)/32||1);last=time;ctx.clearRect(0,0,w,h);
 for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.y<-7){p.y=h+7;p.x=Math.random()*w}if(p.x<-7)p.x=w+7;if(p.x>w+7)p.x=-7;
 const a=p.alpha*(.68+.32*Math.sin(time*.0012+p.phase));ctx.fillStyle=p.red?`rgba(204,77,101,${a})`:`rgba(175,105,216,${a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}}
 requestAnimationFrame(draw);
}
