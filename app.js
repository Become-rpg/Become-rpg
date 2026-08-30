const state={
 sex:localStorage.getItem('become.sex')||'male',
 hair:localStorage.getItem('become.hair')||'bun',
 beard:localStorage.getItem('become.beard')||'full'
};

const hairNames={short:'Court',long:'Longs',bun:'Chignon',ponytail:'Queue de cheval'};
const beardNames={none:'Aucune',stubble:'Naissante',short:'Courte',full:'Complète',long:'Longue'};

const hair={
short:`<path fill="#241A1A" d="M36 43V29h7v-7h12v-5h18v5h12v7h7v14h-7V35H42v8z"/>`,
long:`<path fill="#241A1A" d="M34 46V27h8v-7h12v-5h18v5h12v7h8v46h-8V50H40v23h-6z"/>`,
bun:`<path fill="#241A1A" d="M35 44V28h8v-8h12v-6h18v6h12v8h8v16h-8V34H43v10z"/><rect x="58" y="8" width="22" height="10" fill="#241A1A"/><rect x="64" y="4" width="11" height="6" fill="#241A1A"/>`,
ponytail:`<path fill="#241A1A" d="M35 44V27h8v-7h12v-5h18v5h12v7h8v18h-8V34H42v10z"/><path fill="#241A1A" d="M90 27h10v8h5v15h-7V39h-8z"/>`
};

const beard={
none:'',
stubble:`<path fill="#4A3028" d="M40 61h48v10H82v6H46v-6h-6z" opacity=".55"/>`,
short:`<path fill="#3A2722" d="M39 61h50v12h-7v8H46v-8h-7z"/><rect x="54" y="70" width="20" height="5" fill="#D49A70"/>`,
full:`<path fill="#33231F" d="M38 59h52v17h-6v11H44V76h-6z"/><rect x="52" y="70" width="24" height="6" fill="#D49A70"/>`,
long:`<path fill="#2D201D" d="M38 58h52v18h-6v17H44V76h-6z"/><path fill="#2D201D" d="M49 88h30v10H49z"/><rect x="53" y="70" width="22" height="6" fill="#D49A70"/>`
};

function base(sex){
 const torso=sex==='female'?'#4A3E66':'#3D5265';
 const torso2=sex==='female'?'#332A4A':'#263545';
 const legs=sex==='female'?'#202434':'#1C2632';
 const boots=sex==='female'?'#303348':'#273646';
 return `<path fill="#D49A70" d="M40 25h48v6h8v35h-8v8H40v-8h-8V31h8z"/><rect x="52" y="74" width="24" height="16" fill="#D49A70"/>
<rect x="40" y="65" width="48" height="9" fill="#C58962"/><rect x="32" y="43" width="8" height="16" fill="#D49A70"/><rect x="88" y="43" width="8" height="16" fill="#D49A70"/>
<rect x="45" y="48" width="6" height="6" fill="#4C74B9"/><rect x="77" y="48" width="6" height="6" fill="#4C74B9"/>
<rect x="62" y="54" width="5" height="8" fill="#B77758"/><rect x="56" y="65" width="16" height="4" fill="#A85852"/>
<path fill="${torso}" d="M39 84h50l11 12v39H28V96z"/><path fill="${torso2}" d="M35 91h58v34H35z"/><rect x="61" y="89" width="6" height="36" fill="#BFC8D0"/>
<rect x="31" y="122" width="66" height="7" fill="#151B22"/><rect x="61" y="121" width="6" height="9" fill="#D6A83E"/>
<rect x="39" y="129" width="19" height="33" fill="${legs}"/><rect x="70" y="129" width="19" height="33" fill="${legs}"/><rect x="36" y="158" width="24" height="8" fill="${boots}"/><rect x="68" y="158" width="24" height="8" fill="${boots}"/>
<path fill="#304254" d="M28 96h11v32H30zM89 96h11v32H89z"/><rect x="28" y="124" width="11" height="9" fill="#D49A70"/><rect x="89" y="124" width="11" height="9" fill="#D49A70"/>`;
}

function characterSVG(){
 let beardLayer=state.sex==='male' ? (beard[state.beard]||'') : '';
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 176" aria-label="Avatar">${base(state.sex)}${hair[state.hair]}${beardLayer}</svg>`;
}
function renderCharacter(el){
 el.replaceChildren();
 el.innerHTML=characterSVG();
}
function save(){localStorage.setItem('become.sex',state.sex);localStorage.setItem('become.hair',state.hair);localStorage.setItem('become.beard',state.beard)}
function render(){
 save();
 renderCharacter(document.querySelector('#character'));
 renderCharacter(document.querySelector('#preview'));
 document.querySelectorAll('[data-sex]').forEach(b=>b.classList.toggle('active',b.dataset.sex===state.sex));
 document.querySelector('#beardGroup').style.display=state.sex==='male'?'block':'none';
 const hc=document.querySelector('#hairChoices');hc.replaceChildren();
 Object.entries(hairNames).forEach(([k,n])=>{const b=document.createElement('button');b.dataset.hair=k;b.className=state.hair===k?'active':'';b.textContent=n;hc.append(b)});
 const bc=document.querySelector('#beardChoices');bc.replaceChildren();
 Object.entries(beardNames).forEach(([k,n])=>{const b=document.createElement('button');b.dataset.beard=k;b.className=state.beard===k?'active':'';b.textContent=n;bc.append(b)});
}
document.addEventListener('click',e=>{
 const p=e.target.closest('[data-page]');
 if(p){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.querySelector('#'+p.dataset.page).classList.add('active');document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('active',x===p));scrollTo(0,0);return}
 const s=e.target.closest('[data-sex]'); if(s){state.sex=s.dataset.sex;render();return}
 const h=e.target.closest('[data-hair]'); if(h){state.hair=h.dataset.hair;render();return}
 const b=e.target.closest('[data-beard]'); if(b){state.beard=b.dataset.beard;render();return}
});
render();