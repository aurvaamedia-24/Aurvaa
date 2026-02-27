// ── CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
function animRing(){ rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); }
animRing();
document.querySelectorAll('a,button,.service-card,.pricing-card,.portfolio-item,.testi-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.width='20px'; cursor.style.height='20px'; ring.style.width='52px'; ring.style.height='52px'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.width='12px'; cursor.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
});

// ── NAVBAR SCROLL
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>60);
  document.getElementById('scrollTop').classList.toggle('visible',window.scrollY>400);
});

// ── MOBILE MENU
document.getElementById('hamburger').addEventListener('click',()=>{
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile(){ document.getElementById('mobileMenu').classList.remove('open'); }

// ── TYPED TEXT [EDIT_HERO] — edit phrases below
const phrases=["1:1 Consultation","Personal Branding","Social Media Growth","Performance Marketing","E-commerce Solutions","SEO & GEO","Automation & AI"];
let pi=0,ci=0,del=false;
const typedEl=document.getElementById('typed');
function typeEffect(){
  const word=phrases[pi];
  if(!del){ typedEl.textContent=word.slice(0,++ci); if(ci===word.length){ del=true; setTimeout(typeEffect,1800); return; } }
  else{ typedEl.textContent=word.slice(0,--ci); if(ci===0){ del=false; pi=(pi+1)%phrases.length; } }
  setTimeout(typeEffect,del?60:90);
}
typeEffect();

// ── PARTICLES
(function(){
  const c=document.getElementById('particles');
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  function resize(){ W=c.width=c.offsetWidth; H=c.height=c.offsetHeight; }
  resize(); window.addEventListener('resize',resize);
  for(let i=0;i<55;i++) pts.push({
    x:Math.random()*1200,y:Math.random()*800,
    vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,
    r:Math.random()*2+1,
    a:Math.random()
  });
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(201,168,76,${p.a*0.4})`; ctx.fill();
    });
    pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<120){
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(13,32,68,${(1-d/120)*0.06})`; ctx.stroke();
      }
    }));
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── SCROLL REVEAL
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));

// ── ANIMATED COUNTERS
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target, target=+el.dataset.target, dur=1800;
      let start=null;
      function step(ts){
        if(!start) start=ts;
        const p=Math.min((ts-start)/dur,1);
        el.textContent=Math.floor(p*target);
        if(p<1) requestAnimationFrame(step); else el.textContent=target;
      }
      requestAnimationFrame(step);
      counterObs.unobserve(el);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.counter').forEach(el=>counterObs.observe(el));

// ── PORTFOLIO FILTER
function filterPortfolio(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-item').forEach(item=>{
    item.style.opacity='0'; item.style.transform='scale(0.9)';
    setTimeout(()=>{
      item.style.display=(cat==='all'||item.dataset.cat===cat)?'block':'none';
      setTimeout(()=>{ item.style.opacity='1'; item.style.transform='scale(1)'; },50);
    },200);
    item.style.transition='opacity 0.3s, transform 0.3s';
  });
}

// ── CONTACT FORM
function handleSubmit(e){
  e.preventDefault();
  const btn=e.target.querySelector('.form-submit');
  btn.textContent='Sending...';
  setTimeout(()=>{
    btn.textContent='✅ Message Sent!';
    btn.style.background='linear-gradient(90deg,#2ecc71,#27ae60)';
    e.target.reset();
    setTimeout(()=>{ btn.textContent='Send Message ✦'; btn.style.background=''; },3000);
  },1500);
}

// custom cursor script



function scrollToContact(btn) {

  document.querySelectorAll('.plan-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');

  const contact = document.getElementById('contact');
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth' });
  }
}

const track = document.getElementById('plansTrack');
const cards = track.querySelectorAll('.pricing-card');

function highlightCenterCard() {
  const center = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    if (Math.abs(center - cardCenter) < rect.width / 2) {
      card.classList.add('center-active');
    } else {
      card.classList.remove('center-active');
    }
  });
}

setInterval(highlightCenterCard, 120);
