// AC Pay Calculator — iPhone (robust dropdown init)
// Defaults: FO, 320, 2025, MB, 80 hrs
const DOH = new Date('2024-08-07T00:00:00Z');
const PROGRESSION = {m:11, d:10};  // Nov 10
const SWITCH = {m:9, d:30};        // Sep 30
const AIRCRAFT_ORDER = ["777","787","330","767","320","737","220"];

// Pay tables 2023–2026 (contract) + projections 2027–2031
const PAY_TABLES = {
  2023: { CA: { "777":{1:365.60,2:369.28,3:372.99,4:376.75,5:380.54,6:384.38,7:388.26,8:392.18,9:396.14,10:400.14,11:404.18,12:408.27},
                "787":{1:336.02,2:339.40,3:342.81,4:346.27,5:349.76,6:353.28,7:356.85,8:360.45,9:364.09,10:367.77,11:371.48,12:375.23},
                "330":{1:329.57,2:332.88,3:336.23,4:339.62,5:343.04,6:346.50,7:349.99,8:353.53,9:357.10,10:360.70,11:364.35,12:368.03},
                "767":{1:308.82,2:311.93,3:315.07,4:318.24,5:321.45,6:324.69,7:327.96,8:331.27,9:334.62,10:338.00,11:341.41,12:344.86},
                "320":{1:268.55,2:271.25,3:273.98,4:276.74,5:279.53,6:282.35,7:168.27,8:288.07,9:290.98,10:293.92,11:296.89,12:299.89},
                "737":{1:268.55,2:271.25,3:273.98,4:276.74,5:279.53,6:282.35,7:285.20,8:174.29,9:180.41,10:186.64,11:192.98,12:199.43},
                "220":{1:263.35,2:265.99,3:268.67,4:271.37,5:274.11,6:276.87,7:279.67,8:282.49,9:285.34,10:288.22,11:291.14,12:294.08} },
          FO: { "777":{1:84.12,2:91.16,3:138.01,4:148.82,5:207.40,6:215.25,7:223.25,8:231.39,9:239.66,10:248.09,11:256.66,12:265.37},
                "787":{1:84.12,2:91.16,3:126.84,4:136.78,5:190.62,6:197.84,7:205.19,8:212.67,9:220.27,10:228.02,11:235.89,12:243.90},
                "330":{1:84.12,2:91.16,3:124.41,4:134.15,5:186.96,6:194.04,7:201.25,8:208.58,9:216.04,10:223.64,11:231.36,12:239.22},
                "767":{1:84.12,2:91.16,3:116.57,4:125.70,5:175.19,6:181.82,7:188.58,8:195.45,9:202.44,10:209.56,11:216.80,12:224.16},
                "320":{1:84.12,2:91.16,3:115.07,4:123.15,5:156.54,6:162.35,7:168.27,8:174.29,9:180.41,10:186.64,11:192.98,12:199.43},
                "737":{1:84.12,2:91.16,3:115.07,4:123.15,5:156.54,6:162.35,7:168.27,8:174.29,9:180.41,10:186.64,11:192.98,12:199.43},
                "220":{1:84.12,2:91.16,3:112.84,4:120.76,5:153.50,6:159.20,7:165.00,8:170.91,9:176.91,10:183.02,11:189.24,12:195.56} },
          RP: { "777":{1:84.12,2:91.16,3:106.30,4:114.91,5:140.80,6:146.07,7:151.42,8:156.87,9:162.42,10:168.06,11:171.78,12:175.55},
                "787":{1:84.12,2:91.16,3:97.70,4:105.61,5:129.41,6:134.25,7:139.17,8:144.18,9:149.28,10:154.46,11:157.88,12:161.35},
                "330":{1:84.12,2:91.16,3:95.83,4:103.58,5:126.92,6:131.67,7:136.50,8:141.41,9:146.41,10:151.50,11:154.85,12:158.25} }
        },
  2024: { CA: { "777":{1:380.23,2:384.05,3:387.91,4:391.82,5:395.77,6:399.76,7:403.79,8:407.87,9:411.99,10:416.15,11:420.35,12:424.60},
                "787":{1:349.46,2:352.98,3:356.53,4:360.12,5:363.75,6:367.41,7:371.12,8:374.87,9:378.65,10:382.48,11:386.34,12:390.24},
                "330":{1:342.75,2:346.20,3:349.68,4:353.20,5:356.76,6:360.36,7:364.00,8:367.67,9:371.38,10:375.13,11:378.92,12:382.75},
                "767":{1:321.18,2:324.40,3:327.67,4:330.97,5:334.30,6:337.67,7:341.08,8:344.52,9:348.00,10:351.52,11:355.07,12:358.66},
                "320":{1:279.29,2:282.10,3:284.94,4:287.81,5:290.71,6:293.64,7:296.60,8:299.60,9:302.62,10:305.68,11:308.77,12:311.89},
                "737":{1:279.29,2:282.10,3:284.94,4:287.81,5:290.71,6:293.64,7:296.60,8:299.60,9:302.62,10:305.68,11:308.77,12:311.89},
                "220":{1:273.88,2:276.63,3:279.41,4:282.23,5:285.07,6:287.95,7:290.85,8:293.79,9:296.76,10:299.75,11:302.78,12:305.84} }
};

// Projections from 2026 base
const RAISES = {2027: 1.08, 2028: 1.08*1.04, 2029: 1.08*1.04*1.04, 2030: 1.08*1.04*1.04*1.04};
[2027,2028,2029,2030,2031].forEach(y=>{
  const factor = (y===2031) ? RAISES[2030] : RAISES[y];
  const base = PAY_TABLES[2026];
  const proj = {};
  for (const seat of Object.keys(base)){
    proj[seat] = {};
    for (const ac of Object.keys(base[seat])){
      proj[seat][ac] = {};
      for (const step of Object.keys(base[seat][ac])){
        proj[seat][ac][step] = +(base[seat][ac][step]*factor).toFixed(2);
      }
    }
  }
  PAY_TABLES[y] = proj;
});

// Tax data 2025
const FED = { brackets:[[57375,.145],[114750,.205],[177882,.26],[253414,.29],[Infinity,.33]],
              bpa_base:14538,bpa_additional:1591,bpa_addl_start:177882,bpa_addl_end:253414 };
const PROV = {
  AB:{brackets:[[60000,.08],[151234,.10],[181481,.12],[241974,.13],[362961,.14],[Infinity,.15]], bpa:22323},
  BC:{brackets:[[49279,.0506],[98560,.077],[113158,.105],[137407,.1229],[186306,.147],[259829,.168],[Infinity,.205]], bpa:12932},
  MB:{brackets:[[47000,.108],[100000,.1275],[Infinity,.174]], bpa:15780},
  NB:{brackets:[[51306,.094],[102614,.14],[190060,.16],[Infinity,.195]], bpa:13261},
  NL:{brackets:[[44192,.087],[88382,.145],[157792,.158],[220910,.178],[282214,.198],[564429,.208],[1128858,.213],[Infinity,.218]], bpa:10882},
  NS:{brackets:[[30507,.0879],[61015,.1495],[95883,.1667],[154650,.175],[Infinity,.21]], bpa:8841},
  NT:{brackets:[[51964,.059],[103930,.086],[168967,.122],[Infinity,.1405]], bpa:16673},
  NU:{brackets:[[54707,.04],[109413,.07],[177881,.09],[Infinity,.115]], bpa:16862},
  ON:{brackets:[[52886,.0505],[105775,.0915],[150000,.1116],[220000,.1216],[Infinity,.1316]], bpa:12399},
  PE:{brackets:[[33328,.095],[64656,.1347],[105000,.166],[140000,.1762],[Infinity,.19]], bpa:13000},
  QC:{brackets:[[53255,.14],[106495,.19],[129590,.24],[Infinity,.2575]], bpa:18571},
  SK:{brackets:[[53463,.105],[152750,.125],[Infinity,.145]], bpa:19241},
  YT:{brackets:[[57375,.064],[114750,.09],[177882,.109],[500000,.128],[Infinity,.15]], bpa:15805},
};
const CPP = {ympe:71300,yampe:81200,ybe:3500, rate_base:.0595, rate_cpp2:.04, max_base:4034.10, max_cpp2:396.00};
const QPP = {ympe:71300,yampe:81200,ybe:3500, rate_base_total:.064, rate_qpp2:.04};
const EI = {mie:65700, rate:.0164, rate_qc:.0131, max_prem:1077.48, max_prem_qc:860.67};
const HEALTH_MO = 58.80;

// Helpers
const clampStep = s => Math.max(1, Math.min(12, s));
function federalBPA2025(income){
  const b=FED;
  let addl=0;
  if (income<=b.bpa_addl_start) addl=b.bpa_additional;
  else if (income>=b.bpa_addl_end) addl=0;
  else {
    const frac=(b.bpa_addl_end-income)/(b.bpa_addl_end-b.bpa_addl_start);
    addl=b.bpa_additional*Math.max(0,Math.min(1,frac));
  }
  return b.bpa_base+addl;
}
function taxFromBrackets(taxable, brackets){
  let tax=0,last=0;
  for (const [cap,rate] of brackets){
    const slice=Math.min(taxable,cap)-last;
    if (slice>0){ tax+=slice*rate; last=cap; }
    if (taxable<=cap) break;
  }
  return Math.max(0,tax);
}
function pensionRateOnDate(d){
  const years = (d-DOH)/(365.2425*24*3600*1000);
  if (years<2) return 0.06;
  if (years<5) return 0.065;
  return 0.07;
}
function stepOnJan1(selectedStep, tieOn, year){ return tieOn ? clampStep((year-2025)+1) : clampStep(selectedStep); }
function rateFor(seat, ac, year, step, xlr){
  const table = PAY_TABLES[year][seat];
  if (seat==='RP' && !['777','787','330'].includes(ac)) throw new Error('RP seat only on 777/787/330');
  let rate = table[ac][clampStep(step)];
  if (xlr && ac==='320' && !(seat==='FO' && (step===1||step===2))) rate += 2.46;
  return rate;
}
function yearSegments(year, stepJan1){
  const jan1=new Date(Date.UTC(year,0,1));
  const sep30=new Date(Date.UTC(year, SWITCH.m-1, SWITCH.d));
  const nov10=new Date(Date.UTC(year, PROGRESSION.m-1, PROGRESSION.d));
  const dec31=new Date(Date.UTC(year,11,31));
  const prev=year-1;
  return [
    {start:jan1, end:new Date(sep30.getTime()-86400000), payYear:prev, step:stepJan1},
    {start:sep30, end:new Date(nov10.getTime()-86400000), payYear:year, step:stepJan1},
    {start:nov10, end:dec31, payYear:year, step:clampStep(stepJan1+1)},
  ];
}
function daysInclusive(a,b){ return Math.round((b-a)/86400000)+1; }
function topRate(amount, brackets){ for (const [cap,rate] of brackets){ if (amount<=cap) return rate; } return brackets[brackets.length-1][1]; }

function computeAnnual({seat,ac,year,stepInput,tieOn,xlrOn,avgMonthlyHours,province,esopPct}){
  const stepJan1=stepOnJan1(stepInput,tieOn,year);
  const segs=yearSegments(year, stepJan1);
  const dailyHours = avgMonthlyHours*12/365.2425;
  const audit=[]; let gross=0;
  for (const seg of segs){
    const r=rateFor(seat, ac, seg.payYear, seg.step, xlrOn);
    const d=daysInclusive(seg.start, seg.end);
    const h=dailyHours*d;
    const pay=h*r;
    gross += pay;
    audit.push({start:seg.start, end:seg.end, pay_table_year:seg.payYear, step:seg.step, hourly:r, days:d, hours:h, segment_gross:pay});
  }
  // Pension (pre-tax), iterate days
  let pension=0;
  for (let t=Date.UTC(year,0,1); t<=Date.UTC(year,11,31); t+=86400000){
    const day=new Date(t);
    const pct = pensionRateOnDate(day);
    let py=year, st=stepJan1;
    for (const seg of segs){ if (day>=seg.start && day<=seg.end){ py=seg.payYear; st=seg.step; break; } }
    const rate = rateFor(seat, ac, py, st, xlrOn);
    const dayPay = dailyHours*rate; pension += dayPay*pct;
  }
  const taxable = Math.max(0, gross - pension);
  const inQC = province==='QC';
  // CPP/QPP + EI
  let cpp_base, cpp2, cpp_total, ei;
  if (inQC){
    const pensionable = Math.max(0, Math.min(QPP.ympe, gross)-QPP.ybe);
    cpp_base = pensionable * QPP.rate_base_total;
    const qpp2_base = Math.max(0, Math.min(QPP.yampe, gross)-QPP.ympe);
    cpp2 = qpp2_base * QPP.rate_qpp2;
  } else {
    const pensionable = Math.max(0, Math.min(CPP.ympe, gross)-CPP.ybe);
    cpp_base = Math.min(pensionable * CPP.rate_base, CPP.max_base);
    const cpp2_base = Math.max(0, Math.min(CPP.yampe, gross)-CPP.ympe);
    cpp2 = Math.min(cpp2_base * CPP.rate_cpp2, CPP.max_cpp2);
  }
  cpp_total = cpp_base + cpp2;
  const ei_rate = inQC ? EI.rate_qc : EI.rate;
  const ei_max = inQC ? EI.max_prem_qc : EI.max_prem;
  ei = Math.min(gross, EI.mie)*ei_rate; ei = Math.min(ei, ei_max);
  // Taxes + credits
  const fed_tax = Math.max(0, taxFromBrackets(taxable, FED.brackets) - (0.145*federalBPA2025(taxable) + 0.15*(cpp_total+ei)));
  const p = PROV[province];
  const prov_gross = taxFromBrackets(taxable, p.brackets);
  const prov_low = p.brackets[0][1];
  const prov_tax = Math.max(0, prov_gross - (prov_low*p.bpa + prov_low*(cpp_total+ei)));
  const income_tax = fed_tax + prov_tax;
  // After-tax fixed + ESOP
  const annual_health = 58.80*12;
  const esop = Math.min((esopPct/100)*gross, 30000);
  const comb_top = topRate(taxable, FED.brackets) + topRate(taxable, p.brackets);
  const esop_match_net = 0.30*esop*(1-comb_top);
  const net = gross - income_tax - cpp_total - ei - annual_health - esop + esop_match_net;
  const monthly = {gross:gross/12, net:net/12, income_tax:income_tax/12, cpp:cpp_total/12, ei:ei/12, health:annual_health/12, pension:pension/12, esop:esop/12, esop_match_net:esop_match_net/12};
  return {audit,gross,net,tax:income_tax,cpp:cpp_total,ei,health:annual_health,pension,esop,esop_match_after_tax:esop_match_net,monthly, step_jan1:stepJan1};
}

// ---------- UI Wire-up (defensive) ----------
const seatEl = document.getElementById('seat');
const acEl   = document.getElementById('ac');
const yearEl = document.getElementById('year');
const stepEl = document.getElementById('step');
const provEl = document.getElementById('prov');
const avgEl  = document.getElementById('avgHrs');
const tieEl  = document.getElementById('tie');
const xlrEl  = document.getElementById('xlr');
const esopEl = document.getElementById('esop');
const esopPctEl = document.getElementById('esopPct');
const outEl  = document.getElementById('out');
const calcBtn = document.getElementById('calc');

function refreshAircraft(){
  const seat = seatEl.value;
  const allowed = (seat==='RP') ? ["777","787","330"] : AIRCRAFT_ORDER;
  acEl.innerHTML = '';
  for (const a of allowed){
    const opt=document.createElement('option'); opt.textContent=a; acEl.appendChild(opt);
  }
  if (allowed.includes('320')) acEl.value='320';
}

function ensureAircraftInitial(){
  if (acEl.options.length===0){
    for (const a of AIRCRAFT_ORDER){
      const opt=document.createElement('option'); opt.textContent=a; acEl.appendChild(opt);
    }
    acEl.value='320';
  }
}

function ensureProvinces(){
  if (provEl.options.length===0){
    ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'].forEach(k=>{
      const opt=document.createElement('option'); opt.value=k; opt.textContent=k; provEl.appendChild(opt);
    });
    provEl.value='MB';
  }
}

function tieYearStepFromYear(){ if (!tieEl.checked) return; stepEl.value = String(Math.max(1, Math.min(12, (+yearEl.value-2025)+1))); }
function tieYearStepFromStep(){ if (!tieEl.checked) return; yearEl.value = String(Math.max(2023, Math.min(2031, 2024 + Math.max(1, Math.min(12, +stepEl.value))))); }

function money(x){ return '$' + x.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2}); }

function renderOutput(res, params){
  const {seat, ac, year, province, esopPct, avgMonthlyHours, xlrOn, tieOn} = params;
  const m = res.monthly;
  const header = `${seat} · ${ac} · ${province} · Year ${year} · Step Jan 1=${res.step_jan1} · ESOP ${esopPct}% · ${avgMonthlyHours.toFixed(2)} hrs/mo · XLR ${xlrOn?'ON':'OFF'} · Tie ${tieOn?'ON':'OFF'}`;
  const annual = [
    'ANNUAL',
    `  Gross              ${money(res.gross)}`,
    `  Pension (pre-tax) -${money(res.pension)}`,
    `  Tax (fed+prov)    -${money(res.tax)}`,
    `  CPP/QPP+CPP2      -${money(res.cpp)}`,
    `  EI                -${money(res.ei)}`,
    `  Health            -${money(res.health)}`,
    `  ESOP (${esopPct}%)     -${money(res.esop)}`,
    `  + ESOP match (net)+${money(res.esop_match_after_tax)}`,
    `  NET                ${money(res.net)}`,
  ].join('\n');
  const monthly = [
    'MONTHLY',
    `  Gross ${money(m.gross)}`,
    `  Net   ${money(m.net)}`,
    `  Tax   ${money(m.income_tax)}    CPP/QPP ${money(m.cpp)}    EI ${money(m.ei)}`,
    `  Health ${money(m.health)}    Pension ${money(m.pension)}`,
    `  ESOP ${money(m.esop)}    ESOP match (net) ${money(m.esop_match_net)}`
  ].join('\n');
  const auditLines = res.audit.map(seg=>{
    const fmt = d=> d.toISOString().slice(0,10);
    return `  ${fmt(seg.start)} → ${fmt(seg.end)} | tbl ${seg.pay_table_year} | step ${String(seg.step).padStart(2,' ')} | $${seg.hourly.toFixed(2)}/hr | ${seg.hours.toFixed(2)} hrs | ${money(seg.segment_gross)}`;
  }).join('\n');
  const audit = 'AUDIT (date ranges)\n' + auditLines;
  outEl.textContent = [header, '', annual, '', monthly, '', audit].join('\n');
}

function init(){
  ensureAircraftInitial();
  ensureProvinces();
  tieYearStepFromYear();
  esopPctEl.textContent = esopEl.value + '%';
}

seatEl.addEventListener('change', refreshAircraft);
yearEl.addEventListener('change', tieYearStepFromYear);
stepEl.addEventListener('change', tieYearStepFromStep);
esopEl.addEventListener('input', ()=>{ esopPctEl.textContent = esopEl.value + '%'; });

calcBtn.addEventListener('click', ()=>{
  try{
    const params = {
      seat: seatEl.value,
      ac: acEl.value,
      year: +yearEl.value,
      stepInput: +stepEl.value,
      tieOn: !!tieEl.checked,
      xlrOn: !!xlrEl.checked,
      avgMonthlyHours: +avgEl.value,
      province: provEl.value,
      esopPct: +esopEl.value
    };
    const res = computeAnnual(params);
    renderOutput(res, params);
  }catch(err){
    outEl.textContent = 'Error: ' + err.message;
  }
});

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
