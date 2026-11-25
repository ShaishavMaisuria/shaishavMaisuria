// Run with Node to regenerate the self-contained profile illustrations.
import { writeFileSync } from 'node:fs';

const out = (stem, svg) => writeFileSync(new URL('../assets/' + stem + '.svg', import.meta.url), svg + '\n');
const n = x => Number(x.toFixed(2));
const point = (x, y, z = 0) => [n(2.56 * (x - y)), n(1.13 * (x + y) - z * 2.65)];
const coord = p => point(...p).join(',');
const path = (points, close = false) => 'M' + points.map(coord).join('L') + (close ? 'Z' : '');
const face = (pts, fill, stroke = 'none', width = 0.9) =>
  `<path d="${path(pts, true)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/>`;
const line = (pts, color, width, extra = '') =>
  `<path d="${path(pts)}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;
const rect = (x, y, w, d, z = 0) => [[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]];
const text = (x, y, s, cls, extra = '') => `<text x="${x}" y="${y}" class="${cls}" ${extra}>${s}</text>`;
const ink = '#203a43', blue = '#234cc2', teal = '#086c69';
const range = (count, fn) => Array.from({length:count}, (_, i) => fn(i)).join('');

function block(x, y, w, d, h, palette, base = 0) {
  const [roof, left, right, edge] = palette, top = base + h;
  return face([[x,y+d,base],[x+w,y+d,base],[x+w,y+d,top],[x,y+d,top]], left, edge)
    + face([[x+w,y,base],[x+w,y+d,base],[x+w,y+d,top],[x+w,y,top]], right, edge)
    + face(rect(x,y,w,d,top), roof, edge);
}
const plaster = ['#f2f4ed','#c8d6ce','#a6baba','#586e73'];
const glazed = ['#daf0e7','#82b9b2','#50908d','#356b70'];
const copper = ['#ffba87','#e88656','#bb654c','#854d41'];

function building(x,y,w,d,h,palette,step=false) {
  let s = block(x,y,w,d,h,palette);
  for (let z=3; z<h-1; z+=3.6) {
    s += line([[x+.8,y+d,z],[x+w-.8,y+d,z]],palette[3],.85);
    s += line([[x+w,y+.8,z],[x+w,y+d-.8,z]],palette[3],.85);
  }
  for(let a=2; a<w-1; a+=2.8) s += line([[x+a,y+d,1],[x+a,y+d,h-.8]],palette[3],.55);
  for(let a=2; a<d-1; a+=2.8) s += line([[x+w,y+a,1],[x+w,y+a,h-.8]],palette[3],.55);
  s += face(rect(x+1,y+1,w-2,d-2,h+.04),'none',palette[3],.7);
  if (step) s += block(x+w*.22,y+d*.16,w*.56,d*.52,3.2,palette,h);
  return s;
}

// Samples and shaded faces are derived from the same footprint and height.
// Facing surfaces only: the rear wall should not show through the roof.
function sampledBuilding(x,y,w,d,h,phase) {
  const groups = [[],[],[],[]];
  const dot = (a,b,c,i,j) => {
    const [sx,sy] = point(a,b,c);
    groups[(i+j+phase)%4].push(`M${sx},${sy}h0`);
  };
  for(let i=0;i<=w;i+=1.5) for(let j=0;j<=d;j+=1.5) dot(x+i,y+j,h,Math.floor(i),Math.floor(j));
  for(let k=0;k<h;k+=1.8) {
    for(let i=0;i<w;i+=1.5) dot(x+i,y+d,k,Math.floor(i),Math.floor(k));
    for(let j=0;j<=d;j+=1.5) dot(x+w,y+j,k,Math.floor(j),Math.floor(k));
  }
  return face(rect(x,y,w,d),'#dce6f8') + groups.map((g,i)=>
    `<path class="returns r${i}" d="${g.join('')}" fill="none" stroke="${['#2e4ab4','#406aca','#4863b0','#5788b9'][i]}" stroke-width="2.05" stroke-linecap="round"/>`).join('');
}

function city() {
  let s = face(rect(1,1,97,80,-5),'#e6eeec');
  s += block(0,0,96,80,2.8,['#f3f5ed','#d1ded8','#b3c6c4','#829997'],-2.8);
  // Linear park and river along one edge of the survey tile.
  const bank = [[0,59],[12,61],[26,66],[45,69],[63,67],[79,61],[96,58]];
  s += face([...bank,[96,80],[0,80]],'#83cecf');
  s += line(bank,'#287d83',1.6);
  for(let j=0;j<3;j++) s += line(bank.map(([x,y])=>[x,y+3.4+j*2.85]),'#b8e6e0',1);
  s += face([[0,54],[19,57],[35,63],[58,64],[74,59],[96,53],...bank.slice().reverse()],'#b8d7a9');
  for (const x of [22,47,72]) {
    s += face(rect(x,0,4,55),'#d6dfdd');
    s += line([[x+2,0],[x+2,55]],'#fff',1.1,'stroke-dasharray="4 4"');
  }
  for(const y of [22,45]) {
    s += face(rect(0,y,96,4),'#d6dfdd');
    s += line([[0,y+2],[96,y+2]],'#fff',1.1,'stroke-dasharray="4 4"');
  }
  // Painter order follows depth, so nearer features occlude farther ones.
  const items=[];
  const add=(x,y,w,d,render)=>items.push({depth:x+y+(w+d)/2,render});
  const buildings=[
    [3,3,14,13,15],[29,3,13,15,23],[52,3,14,13,20],[78,3,13,14,10],
    [3,29,15,11,12],[29,29,13,11,17],[51,28,15,12,26],[77,29,14,12,14],
    [4,51,11,5,6],[30,51,11,6,6],[53,51,12,6,8],[79,50,12,5,6]
  ];
  for(const [x,y,w,d,h] of buildings) add(x,y,w,d,() => {
    if ((x<40 && y>=20) || x<10) {
      const dots = sampledBuilding(x,y,w,d,h,Math.floor(x)%4);
      if (x<20) return dots;
      return dots + `<g class="rebuild">${building(x,y,w,d,h,plaster)}</g>`;
    }
    return building(x,y,w,d,h, x===51 ? copper : (h>=20 ? glazed : plaster), h>=14);
  });
  const trees=[[9,58],[17,59],[22,60],[28,62],[35,64],[41,65],[47,65],[54,65],[61,64],[68,62],[74,60],[80,58],[87,56],[92,56],[69,14],[68,30],[44,10]];
  for(const [x,y] of trees) add(x,y,1,1,()=>{
    const [cx,cy]=point(x,y);
    return `<g transform="translate(${cx} ${cy})"><path d="M0,1v-6" stroke="#506e67" stroke-width="1.5"/><path d="M0,-14l4,4 1,5-4,2-5,-2-1,-5z" fill="#7da791" stroke="#44786e" stroke-width=".7"/><path d="M0,-13v9l-4,-2-1,-4z" fill="#a7c4a6"/></g>`;
  });
  s+=items.sort((a,b)=>a.depth-b.depth).map(i=>i.render()).join('');
  const roof=rect(51,28,15,12,26);
  s+=`<path class="outline" d="${path(roof,true)}" pathLength="100" stroke="#963c1d" stroke-width="2.6" fill="none"/>`;
  return s;
}

const styles=`text{font-family:Arial,Helvetica,sans-serif;fill:#182d35}
  .eyebrow,.legend{font-family:Menlo,Consolas,monospace;font-size:14px;fill:#455d65}
  .first{font-size:66px;font-weight:700}.last{font-family:Georgia,'Times New Roman',serif;font-size:76px;font-weight:700;font-style:italic;fill:#234cc2}
  .role{font-size:25px;font-weight:700}.micro{font-size:19px;fill:#405861}
  .returns{animation:sample 6s ease-in-out infinite}.r1{animation-delay:-.32s}.r2{animation-delay:-.64s}.r3{animation-delay:-.96s}
  .outline{stroke-dasharray:100;animation:trace 6s ease-in-out infinite}
  .rebuild{opacity:0;animation:model 6s ease-in-out infinite}
  @keyframes model{0%,20%,100%{opacity:0}48%,75%{opacity:1}}
  @keyframes sample{0%,62%,100%{opacity:.94}24%{opacity:.3}40%{opacity:1}}
  @keyframes trace{0%,17%{stroke-dashoffset:100;opacity:0}19%{opacity:1}48%,75%{stroke-dashoffset:0;opacity:1}92%,100%{stroke-dashoffset:0;opacity:0}}
  @media(prefers-reduced-motion:reduce){.returns,.outline,.rebuild{animation:none}.outline{stroke-dashoffset:0}}`;
const mark=`<path d="m0,7 10,-6 10,6-10,6zM0,12l10,6 10,-6M0,17l10,6 10,-6" stroke="${teal}" stroke-width="2" fill="none"/>`;
function legend(x,y,small=false){
  return `<g transform="translate(${x} ${y})"><g fill="${blue}"><circle cx="2" cy="-8" r="1.8"/><circle cx="8" cy="-8" r="1.8"/><circle cx="5" cy="-3" r="1.8"/></g>${text(17,0,'Point cloud','legend')}<path d="m${small?144:152},-7 6,-4 6,4-6,4z" fill="#eb9364" stroke="#935537"/>${text(small?163:172,0,'Building model','legend')}</g>`;
}
function banner(mobile) {
  const [w,h]=mobile?[480,454]:[1020,336], x=mobile?23:35;
  const object=mobile?'translate(222 228) scale(.85)':'translate(715 60) scale(1.10)';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">Shaishav Maisuria | Geospatial AI engineer</title><desc id="desc">An illustrative survey tile changes from sampled point clouds to labeled three-dimensional buildings beside a river.</desc>
  <style>${styles}</style><rect width="${w}" height="${h}" fill="#fbfcfa"/>
  <g transform="translate(${x} ${mobile?15:24})">${mark}</g>${text(x+32,mobile?33:42,'AMAZON MAPS / SDE II','eyebrow')}
  ${mobile?text(x,91,'Shaishav','first','style="font-size:55px"')+text(x+1,146,'Maisuria','last','style="font-size:65px"'):text(x-2,125,'Shaishav','first')+text(x-1,199,'Maisuria','last')}
  ${text(x,mobile?182:251,'Geospatial AI engineer','role')}${mobile?'':text(x,282,'Agent systems and distributed spatial ETL','micro')}
  <g transform="${object}">${city()}</g>
  ${legend(mobile?101:599,mobile?433:315,mobile)}
  </svg>`;
}
out('atlas-signature',banner(false));
out('atlas-signature-mobile',banner(true));

const rows=[['Intersection attributes',94.9],['Road-segment attributes',94.5],['Turn restrictions',60]];
out('conflation-results',`<svg xmlns="http://www.w3.org/2000/svg" width="540" height="151" viewBox="0 0 540 151" role="img" aria-labelledby="t d"><title id="t">Share transferred between basemaps</title><desc id="d">About 94.9 percent of intersection attributes, 94.5 percent of road-segment attributes and 60 percent of turn restrictions.</desc>
<rect width="540" height="151" rx="4" fill="#f5f8f6"/><g font-family="Arial,Helvetica,sans-serif" fill="${ink}">
<text x="16" y="26" font-size="17" font-weight="700">Share transferred from OpenStreetMap to Overture</text>${rows.map(([label,v],i)=>{
 const y=56+i*35, len=2.04*v, color=i===2?'#a95734':teal;
 return `<text x="16" y="${y+4}" font-size="15">${label}</text><rect x="201" y="${y-5}" width="204" height="8" fill="#e0e6e2"/><rect x="201" y="${y-5}" width="${n(len)}" height="8" fill="${color}"/><text x="427" y="${y+5}" font-size="17" font-weight="700">~${v}%</text>`;
}).join('')}</g></svg>`);

out('paper-medal',`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="38" viewBox="0 0 36 38" role="img"><title>Paper award</title><path d="m10 22-3 13 7-3 4 5 3-13m-4-1 5 12 3-5 7 1-6-12" fill="#2858a1"/><path d="m18 1 3 2 4-.1 2 3 3 2 .3 4 1.7 3-1.7 3-.3 4-3 2-2 3-4-.1-3 2-3-2-4 .1-2-3-3-2-.3-4L4 15l1.7-3 .3-4 3-2 2-3 4 .1z" fill="#edb45c" stroke="#895725"/><circle cx="18" cy="15" r="9.2" fill="#fff0c8" stroke="#a26829"/><path d="m18 8 1.9 4.4 4.8.4-3.6 3.2 1.1 4.7-4.2-2.5-4.2 2.5 1.1-4.7-3.6-3.2 4.8-.4z" fill="#a56424"/></svg>`);
