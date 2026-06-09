//  AVATAR COLORS 
var AVATAR_COLORS=['#2D6A4F','#1565C0','#6A1B9A','#C62828','#E65100','#00695C','#4527A0','#AD1457'];
function getColor(seed){var h=0;for(var i=0;i<seed.length;i++)h=seed.charCodeAt(i)+((h<<5)-h);return AVATAR_COLORS[Math.abs(h)%AVATAR_COLORS.length];}
function getInitials(name){var p=name.trim().split(' ');return p.length>=2?(p[0][0]+p[p.length-1][0]).toUpperCase():name.substring(0,2).toUpperCase();}

//  STORAGE HELPERS
function getUsers(){try{return JSON.parse(localStorage.getItem('agrimind_users')||'[]');}catch(e){return [];}}
function saveUsers(u){localStorage.setItem('agrimind_users',JSON.stringify(u));}
function getSession(){try{return JSON.parse(localStorage.getItem('agrimind_session')||'null');}catch(e){return null;}}
function saveSession(s){localStorage.setItem('agrimind_session',JSON.stringify(s));}
function clearSession(){localStorage.removeItem('agrimind_session');}
function getUserData(email){try{return JSON.parse(localStorage.getItem('agrimind_data_'+email)||'{}');}catch(e){return {};}}
function saveUserData(email,data){localStorage.setItem('agrimind_data_'+email,JSON.stringify(data));}

//  APP STATE
var S={user:null,data:{result:null,soilData:null,history:[]}};

function loadUserData(){
  if(!S.user)return;
  var d=getUserData(S.user.email);
  S.data={result:d.result||null,soilData:d.soilData||null,history:d.history||[]};
}
function persistData(){
  if(!S.user)return;
  saveUserData(S.user.email,{result:S.data.result,soilData:S.data.soilData,history:S.data.history});
}

//  THEME
var isDark=false;
function toggleTheme(){
  isDark=!isDark;
  document.documentElement.setAttribute('data-theme',isDark?'dark':'light');
  document.getElementById('theme-btn').textContent=isDark?'☀️':'🌙';
  localStorage.setItem('agrimind_theme',isDark?'dark':'light');
}
(function(){
  var t=localStorage.getItem('agrimind_theme');
  if(t==='dark'){isDark=true;document.documentElement.setAttribute('data-theme','dark');document.getElementById('theme-btn').textContent='☀️';}
})();

//  AUTH 
function requireAuth(page){
  if(!S.user){showPage('login');showToast('Please sign in to continue.');return;}
  showPage(page);
}

function doLogin(){
  var id=document.getElementById('login-id').value.trim();
  var pwd=document.getElementById('login-pwd').value;
  var ok=true;
  if(!id){setFieldError('login-id-err','Please enter your email or phone number');setInputError('login-id');ok=false;}
  if(!pwd){setFieldError('login-pwd-err','Please enter your password');setInputError('login-pwd');ok=false;}
  if(!ok)return;
  var users=getUsers();
  var isEmail=id.includes('@');
  var user=users.find(function(u){return isEmail?(u.email===id):(u.phone===id);});
  if(!user){
    var banner=document.getElementById('login-banner');
    banner.style.display='block';banner.textContent='⚠️ No account found with this '+(isEmail?'email':'phone number')+'.';
    setInputError(isEmail?'login-id':'login-id');return;
  }
  if(user.password!==pwd){
    setFieldError('login-pwd-err','Incorrect password. Please try again.');setInputError('login-pwd');return;
  }
  loginUser(user);
}

function doSignup(){
  var name=document.getElementById('su-name').value.trim();
  var email=document.getElementById('su-email').value.trim();
  var phone=document.getElementById('su-phone').value.trim();
  var pwd=document.getElementById('su-pwd').value;
  var pwd2=document.getElementById('su-pwd2').value;
  var ok=true;
  if(!name){setFieldError('su-name-err','Please enter your full name');setInputError('su-name');ok=false;}
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setFieldError('su-email-err','Please enter a valid email address');setInputError('su-email');ok=false;}
  if(!phone||!/^[6-9]\d{9}$/.test(phone)){setFieldError('su-phone-err','Enter a valid 10-digit Indian mobile number');setInputError('su-phone');ok=false;}
  if(!pwd||pwd.length<8){setFieldError('su-pwd-err','Password must be at least 8 characters');setInputError('su-pwd');ok=false;}
  if(pwd!==pwd2){setFieldError('su-pwd2-err','Passwords do not match');setInputError('su-pwd2');ok=false;}
  if(!ok)return;
  var users=getUsers();
  if(users.find(function(u){return u.email===email;})){
    setFieldError('su-email-err','An account with this email already exists');setInputError('su-email');return;
  }
  if(users.find(function(u){return u.phone===phone;})){
    setFieldError('su-phone-err','This phone number is already registered');setInputError('su-phone');return;
  }
  var color=getColor(email);
  var user={name:name,email:email,phone:phone,password:pwd,color:color,farm:'',location:'',land:'',joined:new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'})};
  users.push(user);saveUsers(users);
  loginUser(user);
}

function loginUser(user){
  S.user=user;saveSession(user);
  loadUserData();
  updateNavForUser();
  updateDashboard();
  showPage('dashboard');
  showToast('👋 Welcome back, '+user.name.split(' ')[0]+'!');
}

function doLogout(){
  closeModal('modal-logout');
  S.user=null;S.data={result:null,soilData:null,history:[]};
  clearSession();
  updateNavForGuest();
  showPage('landing');
  showToast('You have been logged out.');
}

function confirmLogout(){document.getElementById('modal-logout').style.display='flex';}

//  NAV STATE 
function updateNavForUser(){
  document.getElementById('nav-guest').style.display='none';
  document.getElementById('nav-user').style.display='block';
  var av=document.getElementById('nav-avatar');
  var initials=getInitials(S.user.name);
  av.textContent=initials;av.style.background=S.user.color;
  document.getElementById('dd-name').textContent=S.user.name;
  document.getElementById('dd-email').textContent=S.user.email;
  document.getElementById('mob-signin').style.display='none';
  document.getElementById('mob-signup').style.display='none';
  document.getElementById('mob-logout').style.display='flex';
}
function updateNavForGuest(){
  document.getElementById('nav-guest').style.display='flex';
  document.getElementById('nav-user').style.display='none';
  document.getElementById('mob-signin').style.display='flex';
  document.getElementById('mob-signup').style.display='flex';
  document.getElementById('mob-logout').style.display='none';
}

//  DROPDOWN 
var ddOpen=false;
function toggleDropdown(){ddOpen=!ddOpen;document.getElementById('avatar-dropdown').style.display=ddOpen?'block':'none';}
function closeDropdown(){ddOpen=false;document.getElementById('avatar-dropdown').style.display='none';}
document.addEventListener('click',function(e){if(!e.target.closest('.avatar-wrap'))closeDropdown();});

//  DASHBOARD 
function getGreeting(){
  var h=new Date().getHours();
  if(h<12)return'Good morning';
  if(h<17)return'Good afternoon';
  return'Good evening';
}
function updateDashboard(){
  if(!S.user)return;
  var first=S.user.name.split(' ')[0];
  document.getElementById('dash-greeting').innerHTML=getGreeting()+', <span id="dash-username">'+first+'</span>! 👋';
  var av=document.getElementById('dash-avatar');
  av.textContent=getInitials(S.user.name);av.style.background=S.user.color;
  updateMetrics();
}
function updateMetrics(){
  if(!S.user)return;
  var mRec=document.getElementById('m-rec'),mRecSub=document.getElementById('m-rec-sub');
  var mProfit=document.getElementById('m-profit'),mProfitSub=document.getElementById('m-profit-sub');
  var mSoil=document.getElementById('m-soil'),mSoilSub=document.getElementById('m-soil-sub');
  if(S.data.result){mRec.className='metric-val';mRec.style.fontSize='16px';mRec.textContent=S.data.result.crop.name.split(' ')[0];mRecSub.textContent=S.data.result.crop.confidence+'% match';}
  else{mRec.className='metric-null';mRec.textContent='—';mRecSub.textContent='No recommendation yet';}
  var completed=S.data.history.filter(function(e){return e.completed;});
  if(completed.length>0){var p=completed.reduce(function(s,e){return s+(e.revenue-e.investment);},0);mProfit.className='metric-val';mProfit.style.fontSize='18px';mProfit.textContent='₹'+Math.abs(p).toLocaleString('en-IN');mProfitSub.textContent=p>=0?'↑ Net profit':'↓ Net loss';}
  else{mProfit.className='metric-null';mProfit.textContent='—';mProfitSub.textContent='Confirm crop to see profit';}
  if(S.data.soilData){var sc=calcSoilScore(S.data.soilData);mSoil.className='metric-val';mSoil.textContent=sc+'/100';mSoilSub.textContent='Good condition';}
  else{mSoil.className='metric-null';mSoil.textContent='—';mSoilSub.textContent='Submit form to analyze';}
  document.getElementById('m-crops').textContent=S.data.history.length;
}
function calcSoilScore(s){return Math.round(((s.n/140)+(s.p/145)+(s.k/205))/3*100);}

//  DASH SECTIONS 
function showDashSection(s,el){
  ['ds-overview','ds-rec','ds-map','ds-report'].forEach(function(id){var d=document.getElementById(id);if(d)d.style.display='none';});
  var t=document.getElementById('ds-'+s);if(t)t.style.display='block';
  document.querySelectorAll('.sidebar-item').forEach(function(x){x.classList.remove('active');});
  if(el)el.classList.add('active');
  if(s==='map')renderLocationSection();
  if(s==='report')renderReportSection();
}

//  PAGE ROUTING 
function showPage(p){
  document.querySelectorAll('.page').forEach(function(x){x.classList.remove('active');});
  var el=document.getElementById('page-'+p);
  if(el){el.classList.add('active');window.scrollTo(0,0);}
  if(p==='history')renderHistory();
  if(p==='soil')renderSoil();
  if(p==='dashboard')updateDashboard();
}

//  FORM HELPERS
function clearRecForm(){document.querySelectorAll('#ds-rec .styled-input, #ds-rec .styled-select').forEach(function(i){i.value='';});}

//  CROPS DATA 
var CROPS=[
  {name:'Rice (Paddy)',emoji:'🌾',season:'June–October',seasonType:'Kharif Season',duration:'90–120 days',confidence:94,tips:['Maintain 5–10 cm standing water during tillering','Apply Urea in 3 splits: basal, tillering, panicle initiation','Monitor for stem borer and brown planthopper weekly','Transplant 25-day seedlings at 20×15 cm spacing','Harvest at 85–90% grain maturity']},
  {name:'Wheat',emoji:'🌿',season:'November–March',seasonType:'Rabi Season',duration:'100–130 days',confidence:89,tips:['Sow at 20–22°C for best germination','Apply phosphorus at sowing time','Irrigate at crown root initiation stage','Apply fungicide for rust control if needed','Harvest when grain moisture is below 14%']},
  {name:'Maize',emoji:'🌽',season:'June–September',seasonType:'Kharif Season',duration:'75–90 days',confidence:81,tips:['Ensure well-drained soil before sowing','Side-dress nitrogen at knee-high stage','Control fall armyworm with timely spraying','Thin seedlings to one per hill after germination','Harvest when husk turns brown and grains are hard']},
  {name:'Chickpea',emoji:'🫘',season:'October–February',seasonType:'Rabi Season',duration:'90–110 days',confidence:76,tips:['Do not over-irrigate — chickpea is drought-tolerant','Apply Rhizobium inoculant for nitrogen fixation','Control pod borer with recommended insecticide','Avoid waterlogging at any stage','Harvest when leaves turn yellow and pods rattle']},
  {name:'Mango',emoji:'🥭',season:'March–June',seasonType:'Summer',duration:'120–150 days',confidence:72,tips:['Prune after harvest for better aeration','Apply balanced NPK before flowering','Manage powdery mildew with sulphur spray','Thin fruits to improve size and quality','Harvest when fruits reach full size and show color change']}
];
function pickCrop(n,p,k,temp,hum,ph){
  if(temp>28&&hum>70&&ph>=6.0&&ph<=7.5)return CROPS[0];
  if(temp<22&&ph>=6.5&&ph<=7.5)return CROPS[1];
  if(temp>20&&temp<=30&&hum>50)return CROPS[2];
  if(temp<25&&hum<60)return CROPS[3];
  return CROPS[Math.floor(Math.random()*CROPS.length)];
}

//  RECOMMENDATION 
function getRecommendation(){
  var fields=[
  'f-n',
  'f-p',
  'f-k',
  'f-temp',
  'f-hum',
  'f-ph',
  'f-rain',

  'f-soil-moisture',
  'f-organic-carbon',
  'f-electrical-conductivity',

  'f-season',
  'f-soil-color',
  'f-region',
  'f-district',

  'f-area'
  ];
  var missing=fields.some(function(id){return !document.getElementById(id).value;});
  var errEl=document.getElementById('form-error');
  if(missing||!document.getElementById('f-soil').value){errEl.style.display='block';return;}
  errEl.style.display='none';
  var btn=document.getElementById('rec-btn');
  btn.innerHTML='<div class="loading-spinner"></div> Analyzing...';btn.disabled=true;
  var n=+document.getElementById('f-n').value,p=+document.getElementById('f-p').value,k=+document.getElementById('f-k').value;
  var temp=+document.getElementById('f-temp').value,hum=+document.getElementById('f-hum').value,ph=+document.getElementById('f-ph').value;
  var rain=+document.getElementById('f-rain').value,area=+document.getElementById('f-area').value;
  var soil=document.getElementById('f-soil').value;
  var soil_moisture =
  +document.getElementById('f-soil-moisture').value;

  var organic_carbon =  +document.getElementById('f-organic-carbon').value;

  var electrical_conductivity =  +document.getElementById('f-electrical-conductivity').value;

  var season =  document.getElementById('f-season').value;

  var soil_color =  document.getElementById('f-soil-color').value;

  var region =  document.getElementById('f-region').value;

  var district_name = document.getElementById('f-district').value;
  
  fetch("http://127.0.0.1:5000/predict", { //API call starts here for reference
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nitrogen: n,
    phosphorus: p,
    potassium: k,
    temperature: temp,
    humidity: hum,
    ph: ph,
    rainfall: rain,

    soil_moisture: soil_moisture,
    organic_carbon: organic_carbon,
    electrical_conductivity: electrical_conductivity,

    season: season,
    soil_color: soil_color,
    region: region,
    district_name: district_name
  })
})

.then(response => response.json())

.then(data => {

    console.log(data);

    const info = cropInfo[data.recommended_crop] || {
    emoji: "🌱",
    season: "Unknown",
    seasonType: "General Crop",
    duration: "Unknown",
    tips: [
      "Follow recommended farming practices."
    ]
  };

  var crop = {
    name: data.recommended_crop,
    emoji: info.emoji,
    confidence: data.confidence,
    season: info.season,
    seasonType: info.seasonType,
    duration: info.duration,
    tips: info.tips
  };

  S.data.result = {
    crop: crop,
    n: n,
    p: p,
    k: k,
    temp: temp,
    hum: hum,
    ph: ph,
    rain: rain,
    area: area,
    soil: soil
  };

  S.data.soilData = {
    n: n,
    p: p,
    k: k,
    ph: ph,
    hum: hum
  };

  persistData();

  btn.innerHTML = '🌾 Get Recommendation';
  btn.disabled = false;

  renderResultPage(crop);
  updateMetrics();
  showPage('result');
})
.catch(error => {

  console.error(error);

  alert("Prediction failed. Is Flask running?");

  btn.innerHTML = '🌾 Get Recommendation';
  btn.disabled = false;
});
}
function renderResultPage(crop){
  document.getElementById('result-emoji').textContent=crop.emoji;
  document.getElementById('result-name').textContent=crop.name;
  document.getElementById('result-conf-val').textContent=crop.confidence+'%';
  document.getElementById('result-conf-bar').style.width=crop.confidence+'%';
  document.getElementById('result-season').textContent='🌱 '+crop.season;
  document.getElementById('result-type').textContent='☀️ '+crop.seasonType;
  document.getElementById('result-dur').textContent='⏱ '+crop.duration;
  document.getElementById('result-score').textContent=S.data.soilData?calcSoilScore(S.data.soilData):78;
  document.getElementById('mgrown-crop').textContent=crop.name;
  var tips=document.getElementById('result-tips');tips.innerHTML='';
  crop.tips.forEach(function(t){tips.innerHTML+='<li class="tip-item"><span>🌿</span> '+t+'</li>';});
  var alreadyGrown=S.data.history.find(function(e){return e.name===crop.name&&!e.completed;});
  document.getElementById('mark-grown-banner').style.display=alreadyGrown?'none':'flex';
}

//  HISTORY 
var editRevIdx=null;
function openGrownModal(){
  if(!S.data.result)return;
  document.getElementById('mg-invest').value='';document.getElementById('mg-area').value=S.data.result.area||'';document.getElementById('mg-days').value='';
  document.getElementById('modal-grown').style.display='flex';
}
function saveGrownEntry(){
  var invest=document.getElementById('mg-invest').value,area=document.getElementById('mg-area').value,days=document.getElementById('mg-days').value;
  if(!invest||!area||!days){showToast('⚠️ Please fill all fields');return;}
  var crop=S.data.result.crop;
  S.data.history.unshift({id:Date.now(),name:crop.name,emoji:crop.emoji,season:crop.season,seasonType:crop.seasonType,duration:crop.duration,investment:+invest,area:+area,days:+days,revenue:null,completed:false,date:new Date().toLocaleDateString('en-IN',{month:'short',year:'numeric'})});
  persistData();updateMetrics();closeModal('modal-grown');
  document.getElementById('mark-grown-banner').style.display='none';
  showToast('✅ Crop saved to history!');
}
function openRevenueModal(idx){
  editRevIdx=idx;var e=S.data.history[idx];
  document.getElementById('mrev-crop').textContent=e.name;
  document.getElementById('mr-revenue').value='';document.getElementById('mr-price').value='';
  document.getElementById('modal-revenue').style.display='flex';
}
function saveRevenue(){
  var rev=document.getElementById('mr-revenue').value;
  if(!rev){showToast('⚠️ Please enter revenue');return;}
  S.data.history[editRevIdx].revenue=+rev;S.data.history[editRevIdx].completed=true;
  persistData();updateMetrics();closeModal('modal-revenue');
  showToast('💰 Revenue updated! Analytics unlocked.');renderHistory();
}
function renderHistory(){
  var empty=document.getElementById('history-empty'),list=document.getElementById('history-list');
  var entries=document.getElementById('history-entries'),analytics=document.getElementById('history-analytics');
  var notice=document.getElementById('history-pending-notice');
  if(!S.data.history.length){empty.style.display='block';list.style.display='none';return;}
  empty.style.display='none';list.style.display='block';
  entries.innerHTML='';
  var hasPending=false,hasCompleted=false;
  S.data.history.forEach(function(e,i){
    if(!e.completed)hasPending=true;else hasCompleted=true;
    var profit=e.completed?e.revenue-e.investment:null;
    var badge=e.completed?'<span class="profit-badge '+(profit>=0?'profit-pos':'profit-neg')+'">'+(profit>=0?'+':'')+' ₹'+Math.abs(profit).toLocaleString('en-IN')+'</span>':'<span class="pending-badge">⏳ Pending</span>';
    var revBtn=!e.completed?'<button class="btn-primary" style="font-size:11px;padding:6px 13px" onclick="openRevenueModal('+i+')">+ Revenue</button>':'<span style="font-size:11px;color:var(--text3)">Revenue: ₹'+e.revenue.toLocaleString('en-IN')+'</span>';
    entries.innerHTML+='<div class="history-card fade-up"><div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><div class="crop-badge">'+e.emoji+'</div><div style="flex:1;min-width:160px"><div style="font-weight:700;font-size:14px;color:var(--text)">'+e.name+'</div><div style="font-size:11px;color:var(--text3);margin-top:2px">'+e.seasonType+' · '+e.area+' acres · '+e.days+' days · '+e.date+'</div><div style="display:flex;gap:12px;margin-top:5px;font-size:11px;color:var(--text2);flex-wrap:wrap"><span>💰 Invested: <strong>₹'+e.investment.toLocaleString('en-IN')+'</strong></span>'+(e.completed?'<span>📈 ₹'+e.revenue.toLocaleString('en-IN')+'</span>':'')+'</div></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:7px">'+badge+revBtn+'</div></div></div>';
  });
  notice.style.display=hasPending?'block':'none';
  if(hasCompleted){analytics.style.display='block';setTimeout(renderHistoryCharts,120);}
  else analytics.style.display='none';
}

//  SOIL 
function renderSoil(){
  var empty=document.getElementById('soil-empty'),data=document.getElementById('soil-data');
  if(!S.data.soilData){empty.style.display='block';data.style.display='none';return;}
  empty.style.display='none';data.style.display='block';
  var s=S.data.soilData;
  document.getElementById('sv-n').textContent=s.n;document.getElementById('sv-p').textContent=s.p;
  document.getElementById('sv-k').textContent=s.k;document.getElementById('sv-ph').textContent=s.ph;document.getElementById('sv-hum').textContent=s.hum;
  document.getElementById('spv-n').textContent=s.n;document.getElementById('spv-p').textContent=s.p;document.getElementById('spv-k').textContent=s.k;
  document.getElementById('sp-n').style.width=Math.min(s.n/140*100,100)+'%';
  document.getElementById('sp-p').style.width=Math.min(s.p/145*100,100)+'%';
  document.getElementById('sp-k').style.width=Math.min(s.k/205*100,100)+'%';
  document.getElementById('soil-score').textContent=calcSoilScore(s);
  var pct=(s.ph/14)*100;
  document.getElementById('ph-marker').style.left='calc('+pct+'% - 6px)';
  document.getElementById('ph-label-text').innerHTML='pH: <strong>'+s.ph+'</strong> '+(s.ph>=6&&s.ph<=7.5?'✅ Good for most crops':'⚠️ Check crop-specific pH range');
}

//  REPORT 
function renderReportSection(){
  document.getElementById('pdf-no-data').style.display=S.data.result?'none':'block';
  document.getElementById('pdf-ready').style.display=S.data.result?'block':'none';
  if(S.data.result) document.getElementById('pdf-date').textContent='Generated: '+new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'});
}


//  LIVE LOCATION
function renderLocationSection(){
  var nameEl=document.getElementById('location-name');
  var coordsEl=document.getElementById('location-coords');
  var statusEl=document.getElementById('location-status');
  if(!nameEl||!coordsEl||!statusEl)return;
  nameEl.textContent=S.user&&S.user.location?S.user.location:'Location not fetched yet';
  coordsEl.textContent='Use current location to fetch city and state.';
  statusEl.textContent='Ready to request browser location permission.';
}
function setLocationStatus(msg,isError){
  var el=document.getElementById('location-status');
  if(!el)return;
  el.textContent=msg;
  el.style.color=isError?'#C0392B':'var(--text3)';
}
function saveLiveLocationToProfile(place){
  if(!S.user||!place)return;
  S.user.location=place;
  var users=getUsers();
  var idx=users.findIndex(function(u){return u.email===S.user.email;});
  if(idx>-1){users[idx]=S.user;saveUsers(users);}
  saveSession(S.user);
}
function formatOsmPlace(data){
  var a=data.address||{};
  var city=a.city||a.town||a.village||a.municipality||a.county||a.state_district||a.suburb||'';
  var state=a.state||a.region||'';
  var country=a.country||'';
  var parts=[city,state,country].filter(Boolean);
  return parts.length?parts.join(', '):(data.display_name||'Location found');
}
function fetchLiveLocation(){
  if(!navigator.geolocation){setLocationStatus('Geolocation is not supported in this browser.',true);return;}
  setLocationStatus('Requesting location permission...',false);
  navigator.geolocation.getCurrentPosition(function(pos){
    var lat=pos.coords.latitude;
    var lon=pos.coords.longitude;
    var coords=lat.toFixed(5)+'° N, '+lon.toFixed(5)+'° E';
    document.getElementById('location-name').textContent='Finding city and state...';
    document.getElementById('location-coords').textContent=coords;
    setLocationStatus('Calling OpenStreetMap for city/state...',false);
    var url='https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&accept-language=en&lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon);
    fetch(url,{headers:{'Accept':'application/json'}})
      .then(function(res){if(!res.ok)throw new Error('Location lookup failed');return res.json();})
      .then(function(data){
        var place=formatOsmPlace(data);
        document.getElementById('location-name').textContent=place;
        document.getElementById('location-coords').textContent=coords;
        saveLiveLocationToProfile(place);
        setLocationStatus('Live location updated from OpenStreetMap.',false);
        updateDashboard();
      })
      .catch(function(err){
        console.error("OSM ERROR:", err);

        document.getElementById('location-name').textContent =
          'Coordinates found';

        setLocationStatus(
          'Coordinates loaded, but city/state lookup failed.',
          true
        );

        alert(err);
      });        
  },function(err){
    var msg='Location permission was denied or unavailable.';
    if(err.code===err.POSITION_UNAVAILABLE)msg='Your device could not provide a location.';
    if(err.code===err.TIMEOUT)msg='Location request timed out. Try again.';
    setLocationStatus(msg,true);
  },{enableHighAccuracy:true,timeout:12000,maximumAge:300000});
}

//  PROFILE 
function openProfile(){
  if(!S.user)return;
  document.getElementById('profile-view').style.display='block';
  document.getElementById('profile-edit').style.display='none';
  var av=document.getElementById('profile-avatar-big');
  av.textContent=getInitials(S.user.name);av.style.background=S.user.color;
  document.getElementById('profile-fullname').textContent=S.user.name;
  document.getElementById('profile-emailshow').textContent=S.user.email;
  document.getElementById('pf-name').textContent=S.user.name;
  document.getElementById('pf-email').textContent=S.user.email;
  document.getElementById('pf-phone').textContent=S.user.phone||'Not set';
  document.getElementById('pf-farm').textContent=S.user.farm||'Not set';document.getElementById('pf-farm').style.color=S.user.farm?'var(--text)':'var(--text3)';
  document.getElementById('pf-location').textContent=S.user.location||'Not set';document.getElementById('pf-location').style.color=S.user.location?'var(--text)':'var(--text3)';
  document.getElementById('pf-land').textContent=S.user.land?(S.user.land+' acres'):'Not set';document.getElementById('pf-land').style.color=S.user.land?'var(--text)':'var(--text3)';
  document.getElementById('modal-profile').style.display='flex';
}
function switchToEditProfile(){
  document.getElementById('profile-view').style.display='none';
  document.getElementById('profile-edit').style.display='block';
  document.getElementById('pe-name').value=S.user.name;
  document.getElementById('pe-phone').value=S.user.phone||'';
  document.getElementById('pe-farm').value=S.user.farm||'';
  document.getElementById('pe-location').value=S.user.location||'';
  document.getElementById('pe-land').value=S.user.land||'';
}
function switchToViewProfile(){document.getElementById('profile-view').style.display='block';document.getElementById('profile-edit').style.display='none';}
function saveProfile(){
  var name=document.getElementById('pe-name').value.trim();
  var phone=document.getElementById('pe-phone').value.trim();
  if(!name){showToast('⚠️ Name cannot be empty');return;}
  if(phone&&!/^[6-9]\d{9}$/.test(phone)){showToast('⚠️ Invalid phone number');return;}
  S.user.name=name;S.user.phone=phone||S.user.phone;
  S.user.farm=document.getElementById('pe-farm').value.trim();
  S.user.location=document.getElementById('pe-location').value.trim();
  S.user.land=document.getElementById('pe-land').value.trim();
  var users=getUsers();
  var idx=users.findIndex(function(u){return u.email===S.user.email;});
  if(idx>-1){users[idx]=S.user;saveUsers(users);}
  saveSession(S.user);
  updateNavForUser();updateDashboard();
  switchToViewProfile();openProfile();
  showToast('✅ Profile updated!');
}
function openSettings(){document.getElementById('modal-settings').style.display='flex';}

//  CHARTS 
function drawBarChart(id,labels,datasets,colors){
  var el=document.getElementById(id);if(!el)return;el.innerHTML='';
  var W=el.offsetWidth||360,H=el.offsetHeight||190;
  var pad={t:14,r:14,b:32,l:48};var cW=W-pad.l-pad.r,cH=H-pad.t-pad.b;
  var allVals=datasets.flatMap(function(d){return d;});var maxV=Math.max.apply(null,allVals)*1.15||1;
  var n=labels.length,ds=datasets.length;var bW=Math.max(10,Math.min(26,(cW/n/ds)-4));var grp=cW/n;
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('width','100%');svg.setAttribute('height','100%');svg.setAttribute('viewBox','0 0 '+W+' '+H);
  for(var i=0;i<=3;i++){var y=pad.t+cH*(1-i/3);var gl=document.createElementNS('http://www.w3.org/2000/svg','line');gl.setAttribute('x1',pad.l);gl.setAttribute('x2',W-pad.r);gl.setAttribute('y1',y);gl.setAttribute('y2',y);gl.setAttribute('stroke','rgba(45,106,79,.07)');gl.setAttribute('stroke-width','1');svg.appendChild(gl);var vt=document.createElementNS('http://www.w3.org/2000/svg','text');vt.setAttribute('x',pad.l-4);vt.setAttribute('y',y+4);vt.setAttribute('text-anchor','end');vt.setAttribute('font-size','9');vt.setAttribute('fill','rgba(74,103,65,.5)');vt.textContent='₹'+Math.round(maxV*i/3/1000)+'K';svg.appendChild(vt);}
  datasets.forEach(function(data,di){data.forEach(function(val,i){var x=pad.l+grp*i+(grp-ds*bW-(ds-1)*3)/2+di*(bW+3);var bH=Math.max(2,cH*(val/maxV));var rect=document.createElementNS('http://www.w3.org/2000/svg','rect');rect.setAttribute('x',x);rect.setAttribute('y',pad.t+cH-bH);rect.setAttribute('width',bW);rect.setAttribute('height',bH);rect.setAttribute('rx',3);rect.setAttribute('fill',colors[di]);rect.setAttribute('opacity','0.85');svg.appendChild(rect);});});
  labels.forEach(function(l,i){var lt=document.createElementNS('http://www.w3.org/2000/svg','text');lt.setAttribute('x',pad.l+grp*i+grp/2);lt.setAttribute('y',H-5);lt.setAttribute('text-anchor','middle');lt.setAttribute('font-size','9');lt.setAttribute('fill','rgba(74,103,65,.6)');lt.textContent=l;svg.appendChild(lt);});
  el.appendChild(svg);
}
function drawLineChart(id,labels,data,color){
  var el=document.getElementById(id);if(!el||data.length<2)return;el.innerHTML='';
  var W=el.offsetWidth||360,H=el.offsetHeight||190;var pad={t:18,r:14,b:32,l:52};
  var cW=W-pad.l-pad.r,cH=H-pad.t-pad.b;
  var minV=Math.min.apply(null,data),maxV=Math.max.apply(null,data);var range=maxV-minV||1;minV-=range*.1;maxV+=range*.1;
  var pts=data.map(function(v,i){return[pad.l+cW*i/(data.length-1),pad.t+cH-cH*(v-minV)/(maxV-minV)];});
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('width','100%');svg.setAttribute('height','100%');svg.setAttribute('viewBox','0 0 '+W+' '+H);
  for(var i=0;i<=3;i++){var y=pad.t+cH*(1-i/3);var gl=document.createElementNS('http://www.w3.org/2000/svg','line');gl.setAttribute('x1',pad.l);gl.setAttribute('x2',W-pad.r);gl.setAttribute('y1',y);gl.setAttribute('y2',y);gl.setAttribute('stroke','rgba(45,106,79,.07)');gl.setAttribute('stroke-width','1');svg.appendChild(gl);var vt=document.createElementNS('http://www.w3.org/2000/svg','text');vt.setAttribute('x',pad.l-4);vt.setAttribute('y',y+4);vt.setAttribute('text-anchor','end');vt.setAttribute('font-size','9');vt.setAttribute('fill','rgba(74,103,65,.5)');vt.textContent='₹'+Math.round((minV+(maxV-minV)*i/3)/1000)+'K';svg.appendChild(vt);}
  var aPath='M'+pts[0][0]+','+(pad.t+cH);pts.forEach(function(p){aPath+=' L'+p[0]+','+p[1];});aPath+=' L'+pts[pts.length-1][0]+','+(pad.t+cH)+' Z';
  var area=document.createElementNS('http://www.w3.org/2000/svg','path');area.setAttribute('d',aPath);area.setAttribute('fill',color);area.setAttribute('opacity','0.1');svg.appendChild(area);
  var lPath='M'+pts.map(function(p){return p[0]+','+p[1];}).join(' L');
  var line=document.createElementNS('http://www.w3.org/2000/svg','path');line.setAttribute('d',lPath);line.setAttribute('fill','none');line.setAttribute('stroke',color);line.setAttribute('stroke-width','2.5');line.setAttribute('stroke-linecap','round');line.setAttribute('stroke-linejoin','round');svg.appendChild(line);
  pts.forEach(function(p,i){var c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',p[0]);c.setAttribute('cy',p[1]);c.setAttribute('r',4);c.setAttribute('fill',isDark?'#1a1a1a':'#fff');c.setAttribute('stroke',color);c.setAttribute('stroke-width','2');svg.appendChild(c);var lt=document.createElementNS('http://www.w3.org/2000/svg','text');lt.setAttribute('x',p[0]);lt.setAttribute('y',H-5);lt.setAttribute('text-anchor','middle');lt.setAttribute('font-size','9');lt.setAttribute('fill','rgba(74,103,65,.6)');lt.textContent=labels[i];svg.appendChild(lt);});
  el.appendChild(svg);
}
function renderHistoryCharts(){
  var completed=S.data.history.filter(function(e){return e.completed;});if(completed.length<1)return;
  var labels=completed.map(function(e){return e.name.split(' ')[0];});
  drawBarChart('chart-cost',labels,[completed.map(function(e){return e.investment;}),completed.map(function(e){return e.revenue;})],['#E07A2F','#52B788']);
  drawLineChart('chart-profit',labels,completed.map(function(e){return e.revenue-e.investment;}),'#2D6A4F');
}

//  HELPERS 
function togglePwd(id,btn){var i=document.getElementById(id);i.type=i.type==='password'?'text':'password';btn.textContent=i.type==='password'?'👁':'🙈';}
function setFieldError(id,msg){var el=document.getElementById(id);el.textContent=msg;el.classList.add('show');}
function clearFieldError(id){var el=document.getElementById(id);if(el){el.classList.remove('show');}}
function setInputError(id){var el=document.getElementById(id);if(el){el.classList.add('error');el.addEventListener('input',function(){el.classList.remove('error');},{once:true});}}
function closeModal(id){document.getElementById(id).style.display='none';}
function showToast(msg){var t=document.getElementById('toast');t.textContent=msg;t.style.display='block';clearTimeout(showToast._t);showToast._t=setTimeout(function(){t.style.display='none';},3000);}
function escapeHtml(value){
  return String(value===undefined||value===null?'':value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch];});
}
function downloadPDF(){
  if(!S.data.result){showToast('⚠️ Submit the recommendation form first.');return;}
  if(typeof html2pdf==='undefined'){showToast('⚠️ PDF library is still loading. Try again.');return;}
  var r=S.data.result;
  var crop=r.crop;
  var user=S.user||{};
  var report=document.createElement('div');
  report.style.width='760px';
  report.style.padding='34px';
  report.style.background='#ffffff';
  report.style.color='#1A2E1A';
  report.style.fontFamily='Plus Jakarta Sans, Arial, sans-serif';
  report.style.lineHeight='1.5';
  report.innerHTML=''
    +'<div style="border-bottom:3px solid #52B788;padding-bottom:14px;margin-bottom:20px">'
    +'<div style="font-size:24px;font-weight:800;color:#2D6A4F">AgriMind Crop Recommendation Report</div>'
    +'<div style="font-size:12px;color:#4A6741;margin-top:4px">Generated on '+escapeHtml(new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}))+'</div>'
    +'</div>'
    +'<div style="margin-bottom:18px"><div style="font-size:13px;color:#7A9E77;font-weight:700;text-transform:uppercase">Recommended Crop</div>'
    +'<div style="font-size:32px;font-weight:800;margin-top:4px">'+escapeHtml(crop.name)+'</div>'
    +'<div style="font-size:13px;color:#4A6741">Confidence: '+escapeHtml(crop.confidence)+'% · '+escapeHtml(crop.seasonType)+' · '+escapeHtml(crop.duration)+'</div></div>'
    +'<table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:12px">'
    +'<tr><th style="text-align:left;background:#D8F3DC;padding:9px;border:1px solid #B7E4C7">Parameter</th><th style="text-align:left;background:#D8F3DC;padding:9px;border:1px solid #B7E4C7">Value</th></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Nitrogen</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.n)+' kg/ha</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Phosphorus</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.p)+' kg/ha</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Potassium</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.k)+' kg/ha</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Temperature</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.temp)+' °C</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Humidity</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.hum)+'%</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">pH</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.ph)+'</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Rainfall</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.rain)+' mm</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Soil Type</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.soil)+'</td></tr>'
    +'<tr><td style="padding:8px;border:1px solid #E8E4D0">Field Area</td><td style="padding:8px;border:1px solid #E8E4D0">'+escapeHtml(r.area)+' acres</td></tr>'
    +'</table>'
    +'<div style="margin-top:18px"><div style="font-size:15px;font-weight:800;color:#2D6A4F;margin-bottom:8px">Farming Tips</div>'
    +'<ul style="padding-left:18px;margin:0">'+crop.tips.map(function(t){return '<li style="margin-bottom:6px">'+escapeHtml(t)+'</li>';}).join('')+'</ul></div>'
    +'<div style="margin-top:22px;font-size:11px;color:#7A9E77">Farmer: '+escapeHtml(user.name||'Not signed in')+' · Location: '+escapeHtml(user.location||'Not set')+'</div>';
  document.body.appendChild(report);
  showToast('📥 Preparing PDF...');
  html2pdf().set({
    margin:0.45,
    filename:'AgriMind_Crop_Report.pdf',
    image:{type:'jpeg',quality:0.98},
    html2canvas:{scale:2,useCORS:true},
    jsPDF:{unit:'in',format:'a4',orientation:'portrait'}
  }).from(report).save().then(function(){
    report.remove();
    showToast('✅ PDF downloaded.');
  }).catch(function(err){
    console.error(err);
    report.remove();
    showToast('⚠️ PDF generation failed. Try again.');
  });
}

// Password strength
function checkStrength(){
  var pwd=document.getElementById('su-pwd').value;
  var wrap=document.getElementById('pwd-strength-wrap');
  if(!pwd){wrap.style.display='none';return;}
  wrap.style.display='block';
  var score=0;
  if(pwd.length>=8)score++;if(pwd.length>=12)score++;
  if(/[A-Z]/.test(pwd)&&/[a-z]/.test(pwd))score++;
  if(/[0-9]/.test(pwd))score++;if(/[^A-Za-z0-9]/.test(pwd))score++;
  var level=score<=1?'weak':score<=2?'fair':score<=3?'good':'strong';
  var labels={weak:'Weak',fair:'Fair',good:'Good',strong:'Strong'};
  var bars=['bar1','bar2','bar3','bar4'];
  bars.forEach(function(b,i){var el=document.getElementById(b);el.className='pwd-bar';if(i<score)el.classList.add(level);});
  document.getElementById('pwd-strength-label').textContent='Password strength: '+labels[level];
  document.getElementById('pwd-strength-label').style.color=level==='weak'?'#E74C3C':level==='fair'?'var(--orange)':level==='good'?'var(--yellow)':'var(--green2)';
}

// Mobile sidebar
function openMobileSidebar(){document.getElementById('mobile-overlay').style.display='block';document.getElementById('mobile-sidebar').style.display='block';}
function closeMobileSidebar(){document.getElementById('mobile-overlay').style.display='none';document.getElementById('mobile-sidebar').style.display='none';}

//  INIT 
(function(){
  var session=getSession();
  if(session){
    S.user=session;loadUserData();
    updateNavForUser();
  } else {
    updateNavForGuest();
  }
  // restore form if result exists
  if(S.data.result){
    var r=S.data.result;
    ['n','p','k','temp','hum','ph','rain','area'].forEach(function(f){var el=document.getElementById('f-'+f);if(el)el.value=r[f]||'';});
    var soil=document.getElementById('f-soil');if(soil)soil.value=r.soil||'';
  }
})();

  //Crop Metadata
  const cropInfo = {

  Rice: {
    emoji: "🌾",
    season: "Kharif",
    seasonType: "Monsoon Crop",
    duration: "120-150 Days",
    tips: [
      "Maintain standing water during early growth.",
      "Monitor pest attacks regularly.",
      "Use balanced nitrogen fertilizer.",
      "Ensure proper drainage before harvest."
    ]
  },

  Wheat: {
    emoji: "🌾",
    season: "Rabi",
    seasonType: "Winter Crop",
    duration: "120-140 Days",
    tips: [
      "Irrigate during tillering stage.",
      "Avoid waterlogging.",
      "Monitor rust disease.",
      "Apply fertilizer in split doses."
    ]
  },

  Cotton: {
    emoji: "🧵",
    season: "Kharif",
    seasonType: "Cash Crop",
    duration: "150-180 Days",
    tips: [
      "Monitor bollworm infestation.",
      "Maintain proper spacing.",
      "Avoid excessive irrigation.",
      "Use balanced NPK fertilization."
    ]
  },

  Maize: {
    emoji: "🌽",
    season: "Kharif",
    seasonType: "Cereal Crop",
    duration: "90-120 Days",
    tips: [
      "Ensure adequate nitrogen supply.",
      "Maintain weed-free fields.",
      "Irrigate during tasseling.",
      "Monitor stem borer attacks."
    ]
  }

};

// Search Location Recommendation
const locationInput =
  document.getElementById("location-search");

const suggestionBox =
  document.getElementById("location-suggestions");

if(locationInput){

locationInput.addEventListener(
  "input",
  async function(){

    const query = this.value.trim();
    console.log("typing", query);

    if(query.length < 3){
      suggestionBox.innerHTML = "";
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`,
      {
        headers: {
          "Accept": "application/json"
        }
      }
    );

    const data = await response.json();

    suggestionBox.innerHTML = "";

    data.forEach(place => {

      const item = document.createElement("div");

      const name = place.display_name.split(",").slice(0,2).join(", ");

      item.textContent = name;

      item.className =
        "location-item";

      item.onclick = async () => {

        locationInput.value = place.display_name;

        suggestionBox.innerHTML = "";

          // unlock old values first
        document.getElementById("f-region").disabled = false;
        document.getElementById("f-district").disabled = false;

        try {

          const detailsResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${place.lat}&lon=${place.lon}`
          );

          const details = await detailsResponse.json();

          const addr = details.address || {};
          
          console.log(details);
          console.log(addr);

          document.getElementById("f-region").disabled = true;
          document.getElementById("f-district").disabled = true;

          document.getElementById("f-region").value =
            addr.state || "";
          document.getElementById("f-district").value =
            addr.state_district ||
            addr.county ||
            "";

          document.getElementById("f-region").readOnly = true;
          document.getElementById("f-district").readOnly = true;

          document.getElementById("f-region").classList.add("autofilled");
          document.getElementById("f-district").classList.add("autofilled");

        }
        catch(error){

          console.error("Location details error:", error);

        }

        fetchWeather(
          place.lat,
          place.lon
        );
      };

      suggestionBox.appendChild(item);
    });
  }
);
}

// Weather Function
async function fetchWeather(lat, lon){

  try{
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation`
    );

    const data = await response.json();

    document.getElementById("f-temp").value =
      Math.round(data.current.temperature_2m);
    document.getElementById("f-hum").value =
      Math.round(data.current.relative_humidity_2m);
    document.getElementById("f-rain").value =
      Math.round(data.current.precipitation);
  }

  catch(error){
    console.error(error);
    alert("Weather fetch failed");
  }
}