const qs=s=>document.querySelector(s);const qsa=s=>Array.from(document.querySelectorAll(s));
function escapeHTML(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}
function isValidDate(d,m,y){const dt=new Date(Number(y),Number(m)-1,Number(d));return dt.getFullYear()==Number(y)&&dt.getMonth()==Number(m)-1&&dt.getDate()==Number(d)}
function zodiacSign(d,m){const dd=Number(d),mm=Number(m);if((mm==3&&dd>=21)||(mm==4&&dd<=19))return"Aries";if((mm==4&&dd>=20)||(mm==5&&dd<=20))return"Taurus";if((mm==5&&dd>=21)||(mm==6&&dd<=20))return"Gemini";if((mm==6&&dd>=21)||(mm==7&&dd<=22))return"Cancer";if((mm==7&&dd>=23)||(mm==8&&dd<=22))return"Leo";if((mm==8&&dd>=23)||(mm==9&&dd<=22))return"Virgo";if((mm==9&&dd>=23)||(mm==10&&dd<=22))return"Libra";if((mm==10&&dd>=23)||(mm==11&&dd<=21))return"Scorpio";if((mm==11&&dd>=22)||(mm==12&&dd<=21))return"Sagittarius";if((mm==12&&dd>=22)||(mm==1&&dd<=19))return"Capricorn";if((mm==1&&dd>=20)||(mm==2&&dd<=18))return"Aquarius";return"Pisces"}
function sumDigits(n){return String(n).split("").reduce((a,b)=>a+Number(b),0)}
function lifePath(d,m,y){const s=sumDigits(d)+sumDigits(m)+sumDigits(y);if([11,22,33].includes(s))return{n:s,steps:[`${d} + ${m} + ${y} = ${s}`]};let a=s;const st=[`${d} + ${m} + ${y} = ${s}`];while(a>9){const b=sumDigits(a);st.push(`${a} → ${b}`);a=b}return{n:a,steps:st}}
function hashValue(s){let h=0;for(let i=0;i<s.length;i++){h=(h<<5)-h+s.charCodeAt(i);h|=0}return Math.abs(h)}
function energyScore(name,d,m,y){const base=(hashValue(`${name}|${d}-${m}-${y}`)%61)+39;return Math.min(97,base)}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function chartGradient(ctx){const g=ctx.createLinearGradient(0,0,320,0);g.addColorStop(0,"#FFD700");g.addColorStop(.5,"#6600CC");g.addColorStop(1,"#CC0033");return g}
function makeGauge(canvas,value){const ctx=canvas.getContext("2d");const gradient=chartGradient(ctx);return new Chart(ctx,{type:"doughnut",data:{labels:["Value","Rest"],datasets:[{data:[clamp(value,0,100),100-clamp(value,0,100)],backgroundColor:[gradient,"rgba(255,255,255,.08)"],borderWidth:0,hoverOffset:0}]},options:{responsive:true,plugins:{legend:{display:false},tooltip:{enabled:false}},rotation:-Math.PI,circumference:Math.PI,cutout:"70%",animation:{animateRotate:true}}})}
const translations={
  nav_home:{sw:"Nyumbani",en:"Home"},
  nav_results:{sw:"Matokeo",en:"Results"},
  nav_history:{sw:"Historia",en:"History"},
  nav_about:{sw:"Kuhusu",en:"About"},
  nav_contact:{sw:"Mawasiliano",en:"Contact"},
  brand_sub:{sw:"Divine Life Path",en:"Divine Life Path"},
  scan_now:{sw:"Scan Now",en:"Scan Now"},
  home_title:{sw:"Gundua Nyota na Njia ya Maisha",en:"Discover Zodiac and Life Path"},
  home_intro:{sw:"Ingiza taarifa zako hapa chini kisha bonyeza Scan. Matokeo yataonekana kama dashboard ya utambuzi yenye gauges, nyota zinazong'aa, na uchambuzi wa kina.",en:"Enter your details below and scan. Results appear as a diagnostic dashboard with gauges, shining stars, and deep analysis."},
  label_name:{sw:"Jina Kamili",en:"Full Name"},
  label_dob:{sw:"Tarehe ya Kuzaliwa",en:"Date of Birth"},
  label_auto:{sw:"Hesabu Kiotomatiki",en:"Auto Calculation"},
  label_auto_hint:{sw:"Tumia hesabu moja kwa moja bila kubonyeza",en:"Calculate automatically without clicking"},
  diagnose:{sw:"Diagnose Life Path",en:"Diagnose Life Path"},
  compat_title:{sw:"Kiwango cha Ulinganifu",en:"Compatibility Score"},
  label_name2:{sw:"Jina la Mwenza",en:"Partner Name"},
  label_dob2:{sw:"Tarehe ya Kuzaliwa ya Mwenza",en:"Partner Date of Birth"},
  compat_check:{sw:"Check Compatibility",en:"Check Compatibility"},
  results_title:{sw:"Matokeo ya Utambuzi",en:"Diagnostic Results"},
  zodiac_title:{sw:"Nyota",en:"Zodiac"},
  life_title:{sw:"Life Path",en:"Life Path"},
  compat_panel:{sw:"Ulinganifu",en:"Compatibility"},
  name_title:{sw:"Numerolojia ya Jina",en:"Name Numerology"},
  expression_label:{sw:"Expression",en:"Expression"},
  soul_label:{sw:"Soul Urge",en:"Soul Urge"},
  personality_label:{sw:"Personality",en:"Personality"},
  element_title:{sw:"Uwiano wa Elementi",en:"Element Balance"},
  chinese_title:{sw:"Nyota ya Kichina",en:"Chinese Zodiac"},
  year_title:{sw:"Mwaka Binafsi",en:"Personal Year Forecast"},
  luck_title:{sw:"Wasifu wa Bahati",en:"Luck Profile"},
  luck_numbers_label:{sw:"Namba za Bahati",en:"Lucky Numbers"},
  luck_colors_label:{sw:"Rangi za Bahati",en:"Lucky Colors"},
  luck_day_label:{sw:"Siku ya Bahati",en:"Lucky Day"},
  career_title:{sw:"Kazi na Vipaji",en:"Career & Talents"},
  history_title:{sw:"Historia ya Utambuzi",en:"Diagnosis History"},
  history_empty:{sw:"Bado hakuna rekodi.",en:"No records yet."},
  history_view:{sw:"Tazama",en:"View"},
  about_title:{sw:"Kuhusu DivLiFe",en:"About DivLiFe"},
  about_p1:{sw:"DivLiFe ni dashboard ya kutabiri na kuchambua nyota (astrology) na namba za maisha (numerology) kwa namna ya kiotomatiki na ya kuona (visual). Inatumia gauges, charts, na animations za anga.",en:"DivLiFe is a visual diagnostic dashboard for astrology and numerology. It uses gauges, charts, and cosmic animations."},
  about_p2:{sw:"Matokeo yanakusudiwa kuwa mwongozo wa kujitambua na si uamuzi wa mwisho. Tumia kama dira ya kujiboresha na kupanga malengo yako.",en:"Results are guidance, not final decisions. Use them to grow and plan."},
  about_p3:{sw:"Hakuna backend; data yako haiko kwenye server. Kila kitu hufanyika kwenye browser yako.",en:"No backend; your data never leaves your browser."},
  contact_title:{sw:"Wasiliana Nasi",en:"Contact Us"},
  label_cname:{sw:"Jina",en:"Name"},
  label_cemail:{sw:"Barua pepe",en:"Email"},
  label_cmsg:{sw:"Ujumbe",en:"Message"},
  contact_send:{sw:"Tuma",en:"Send"}
}
const elementNames={en:{Fire:'Fire',Air:'Air',Earth:'Earth',Water:'Water'},sw:{Fire:'Moto',Air:'Hewa',Earth:'Ardhi',Water:'Maji'}}
const zodiacProfiles={
  Aries:{element:{sw:"Moto",en:"Fire"},planet:{sw:"Mars",en:"Mars"},
    desc:{sw:["Aries ni mtangulizi mwenye ujasiri na nguvu ya kuanzisha. Unapenda kuanza miradi na kusukuma mipaka.","Unatawaliwa na Mars, una msukumo wa ushindi na ushindani chanya. Una shauku na kasi.","Changamoto ni kukasa tamaa mapema na hasira za haraka; ukomavu unakuja kwa kujifunza subira."],
          en:["Aries is a bold pioneer with initiating power. You love starting projects and pushing limits.","Ruled by Mars, you carry drive and healthy competitiveness. Passion and speed define you.","Challenges include impatience and quick temper; maturity comes with practicing patience."]},
    suggestions:{sw:"Tumia mazoezi ya kupumua na kupanga hatua ili kudumisha msukumo bila kuchoka.",en:"Use breathwork and step planning to sustain momentum without burnout."}
  },
  Taurus:{element:{sw:"Ardhi",en:"Earth"},planet:{sw:"Venus",en:"Venus"},
    desc:{sw:["Taurus ni thabiti na mwenye uvumilivu. Unathamini usalama na uzuri wa maisha.","Venus hukupa ladha ya sanaa, urembo, na uhusiano wa imara.","Changamoto ni kukataa mabadiliko; fursa iko katika kubali kubadilika hatua kwa hatua."],
         en:["Taurus is steady and patient. You value security and the beauty of life.","Venus grants taste for art, aesthetics, and solid relationships.","Challenge is resisting change; growth appears by embracing gradual adaptation."]},
    suggestions:{sw:"Weka malengo ya muda mrefu na ratiba ndogo za mabadiliko.",en:"Set long-term goals with micro-schedules for change."}
  },
  Gemini:{element:{sw:"Hewa",en:"Air"},planet:{sw:"Mercury",en:"Mercury"},
    desc:{sw:["Gemini ni mwasilishaji na mwenye udadisi. Akili yako inapenda kujifunza na kugawana mawazo.","Mercury huongeza kasi ya fikra, lugha, na uhusiano wa kijamii.","Changamoto ni kusambaratika kwa kipaumbele; nidhamu ya mawasiliano huleta tija."],
         en:["Gemini is communicative and curious. Your mind loves learning and sharing ideas.","Mercury boosts thought speed, language, and social connections.","Challenge is scattered priorities; disciplined communication brings productivity."]},
    suggestions:{sw:"Tumia orodha ya kipaumbele na muda wa kujitenga na taarifa.",en:"Use priority lists and time off information overload."}
  },
  Cancer:{element:{sw:"Maji",en:"Water"},planet:{sw:"Moon",en:"Moon"},
    desc:{sw:["Cancer ni mlezi wa kihisia. Unathamini familia, usalama, na uhusiano wa karibu.","Mwezi hulainisha hisia na intuisia; unahisi mazingira kwa undani.","Changamoto ni kujificha kupita kiasi; mipaka yenye afya inalinda moyo wako."],
         en:["Cancer is emotionally nurturing. You value family, safety, and intimate bonds.","The Moon softens emotions and intuition; you sense environments deeply.","Challenge is overprotectiveness; healthy boundaries safeguard your heart."]},
    suggestions:{sw:"Andika hisia zako na jadili kwa uwazi na walio salama.",en:"Journal emotions and discuss openly with safe people."}
  },
  Leo:{element:{sw:"Moto",en:"Fire"},planet:{sw:"Sun",en:"Sun"},
    desc:{sw:["Leo ni mng'ao wa uongozi na ubunifu. Unapenda kuonyesha vipaji na kuhamasisha wengine.","Jua huleta joto, ujasiri, na uaminifu kwa dhamira yako.","Changamoto ni kiburi; unyenyekevu unaifanya talanta yako kupendeka zaidi."],
         en:["Leo shines with leadership and creativity. You love showcasing gifts and inspiring others.","The Sun brings warmth, confidence, and loyalty to your mission.","Challenge is pride; humility makes your talent more lovable."]},
    suggestions:{sw:"Shiriki jukwaa na wape wengine nafasi kuangaza.",en:"Share the stage and give others room to shine."}
  },
  Virgo:{element:{sw:"Ardhi",en:"Earth"},planet:{sw:"Mercury",en:"Mercury"},
    desc:{sw:["Virgo ni mtafiti wa undani, anayependa mpangilio na ukamilifu wa kiutendaji.","Mercury hukupa uwezo wa kuchambua na kuboresha mifumo kwa ufanisi.","Changamoto ni ukosoaji kupita; rehema na mapumziko huleta uwiano."],
         en:["Virgo is a detail researcher, loving order and practical perfection.","Mercury grants analysis power and system improvement efficiency.","Challenge is over-criticism; mercy and rest restore balance."]},
    suggestions:{sw:"Panga mapumziko kwenye kalenda na adhari mafanikio madogo.",en:"Schedule rest and celebrate small wins."}
  },
  Libra:{element:{sw:"Hewa",en:"Air"},planet:{sw:"Venus",en:"Venus"},
    desc:{sw:["Libra ni mpatanishi wa usawa na uzuri. Unatafuta maelewano katika mahusiano.","Venus huleta ladha ya ubunifu, urembo, na diplomasia.","Changamoto ni kusita kuamua; ufafanuzi wa maadili husaidia kuchagua."],
         en:["Libra mediates harmony and beauty. You seek balance in relationships.","Venus brings artistry, aesthetics, and diplomacy.","Challenge is indecision; clarifying values helps you choose."]},
    suggestions:{sw:"Andika kanuni binafsi ili kuharakisha maamuzi.",en:"Write personal principles to speed decisions."}
  },
  Scorpio:{element:{sw:"Maji",en:"Water"},planet:{sw:"Pluto",en:"Pluto"},
    desc:{sw:["Scorpio ana kina na nguvu ya mageuzi. Unatafuta ukweli na mabadiliko ya ndani.","Pluto huongeza uwezo wa kuponya kupitia ujasiri na uwazi wa kiroho.","Changamoto ni ukali wa hisia; kuachilia na msamaha huweka uhuru."],
         en:["Scorpio is deep and transformative. You seek truth and inner change.","Pluto boosts healing through courage and spiritual honesty.","Challenge is emotional intensity; release and forgiveness bring freedom."]},
    suggestions:{sw:"Fanya mazoezi ya kuachilia na kutafakari kwa kina.",en:"Practice release and deep meditation."}
  },
  Sagittarius:{element:{sw:"Moto",en:"Fire"},planet:{sw:"Jupiter",en:"Jupiter"},
    desc:{sw:["Sagittarius ni msafiri wa falsafa na utafiti. Unapenda upana wa maarifa.","Jupiter huleta matumaini, upanuzi, na bahati kwa miradi mikubwa.","Changamoto ni kutokamilisha; ukomo wa muda huimarisha matokeo."],
         en:["Sagittarius travels through philosophy and research. You love broad knowledge.","Jupiter brings hope, expansion, and luck to big ventures.","Challenge is unfinished work; deadlines improve outcomes."]},
    suggestions:{sw:"Weka mawe ya hatua na tarehe bayana.",en:"Set milestones and firm dates."}
  },
  Capricorn:{element:{sw:"Ardhi",en:"Earth"},planet:{sw:"Saturn",en:"Saturn"},
    desc:{sw:["Capricorn ni mjenzi wa mifumo na uongozi wa nidhamu. Unathamini matokeo ya kudumu.","Saturn huleta uwajibikaji, uvumilivu, na hekima ya muda.","Changamoto ni ukakamavu; huruma kwa nafsi huleta ustawi endelevu."],
         en:["Capricorn builds systems with disciplined leadership. You value lasting results.","Saturn brings responsibility, perseverance, and time-won wisdom.","Challenge is rigidity; self-compassion sustains success."]},
    suggestions:{sw:"Panga mapumziko yaliyolazimika na tathmini ya mara kwa mara.",en:"Plan mandatory breaks and regular reviews."}
  },
  Aquarius:{element:{sw:"Hewa",en:"Air"},planet:{sw:"Uranus",en:"Uranus"},
    desc:{sw:["Aquarius ni mbunifu wa baadaye na uhuru wa mawazo. Unathamini haki na uvumbuzi.","Uranus huleta uvunjaji wa kanuni na mawazo ya kipekee.","Changamoto ni kujitenga; mawasiliano ya hisia hujenga daraja."],
         en:["Aquarius innovates the future with free thought. You value justice and invention.","Uranus breaks norms and sparks unique ideas.","Challenge is detachment; emotional communication builds bridges."]},
    suggestions:{sw:"Unganisha ubunifu na mahusiano ya karibu.",en:"Fuse innovation with close relationships."}
  },
  Pisces:{element:{sw:"Maji",en:"Water"},planet:{sw:"Neptune",en:"Neptune"},
    desc:{sw:["Pisces ni mtaalamu wa intuisia na huruma. Unahisi umoja wa mambo.","Neptune huongeza ubunifu, ndoto, na kiroho cha kina.","Changamoto ni kutoweka mipaka; miundo midogo inalinda nishati."],
         en:["Pisces is intuitive and compassionate. You sense unity of things.","Neptune enhances creativity, dreams, and deep spirituality.","Challenge is weak boundaries; small structures protect energy."]},
    suggestions:{sw:"Tumia ratiba ya kila siku na muda wa kutenga.",en:"Use daily routines and solitude time."}
  }
}
const lifeProfiles={
  1:{title:{sw:"Kiongozi",en:"Leader"},desc:{sw:["Namba 1 inaashiria uanzishaji, kujitegemea, na ujasiri wa kuongoza.","Nguvu zako ni maamuzi ya haraka na kuona fursa mapema.","Changamoto ni ukatili au kujiona; jenga ushirikiano na uwazi."],en:["Number 1 symbolizes initiation, independence, and leadership courage.","Strengths include quick decisions and early spotting of opportunities.","Challenge is dominance or ego; build collaboration and openness."]}},
  2:{title:{sw:"Mpatanishi",en:"Diplomat"},desc:{sw:["Namba 2 inaleta usawa, ushirikiano, na huruma.","Una uwezo wa kuunganisha watu na mitazamo.","Changamoto ni kujisahau; linda mipaka yako ya hisia."],en:["Number 2 brings balance, partnership, and empathy.","You unite people and perspectives.","Challenge is self-neglect; protect emotional boundaries."]}},
  3:{title:{sw:"Mwasilishaji",en:"Communicator"},desc:{sw:["Namba 3 inasisitiza ubunifu na uwasilishaji wa fikra.","Una mvuto wa kijamii na talanta ya lugha au sanaa.","Changamoto ni kukosa umakini; tengeneza ratiba."],en:["Number 3 emphasizes creativity and expressive ideas.","You have social magnetism and talent in language or arts.","Challenge is lack of focus; create routines."]}},
  4:{title:{sw:"Mjenzi",en:"Builder"},desc:{sw:["Namba 4 ina uadilifu na muundo thabiti.","Una nguvu ya kujenga msingi wa kudumu.","Changamoto ni ukakamavu; jifunze kubadilika kidogo."],en:["Number 4 holds integrity and solid structure.","You can build lasting foundations.","Challenge is rigidity; learn mild flexibility."]}},
  5:{title:{sw:"Msafiri",en:"Explorer"},desc:{sw:["Namba 5 ni uhuru, mabadiliko, na msisimko.","Una kiu ya kujifunza kupitia uzoefu.","Changamoto ni hatari kupita; weka mipaka salama."],en:["Number 5 is freedom, change, and excitement.","You thirst for learning through experiences.","Challenge is excess risk; set safe boundaries."]}},
  6:{title:{sw:"Mlezi",en:"Caretaker"},desc:{sw:["Namba 6 ni huduma, familia, na uwajibikaji wa upendo.","Una moyo wa kusaidia na kujenga amani nyumbani.","Changamoto ni kubeba mzigo mwingi; gawanya majukumu."],en:["Number 6 is service, family, and loving responsibility.","You help and build peace at home.","Challenge is carrying too much; delegate duties."]}},
  7:{title:{sw:"Mtafiti",en:"Seeker"},desc:{sw:["Namba 7 ni uchunguzi wa ndani, hekima, na kiroho.","Una shauku ya ukweli na utafiti wa kina.","Changamoto ni kujitenga; dumisha uhusiano wa karibu."],en:["Number 7 is inner inquiry, wisdom, and spirituality.","You crave truth and deep research.","Challenge is isolation; maintain close bonds."]}},
  8:{title:{sw:"Msimamizi",en:"Executive"},desc:{sw:["Namba 8 ni nguvu ya uongozi wa nyenzo na matokeo.","Una uwezo wa biashara, rasilimali, na uamuzi thabiti.","Changamoto ni kupenda mamlaka; jenga maadili imara."],en:["Number 8 is material leadership and results.","You can manage business, resources, and firm decisions.","Challenge is love of power; build strong ethics."]}},
  9:{title:{sw:"Mwanahuruma",en:"Humanitarian"},desc:{sw:["Namba 9 ni huruma, kilimwengu, na utumishi wa kizazi.","Una wito wa kusaidia na kuleta uponyaji kwa wengi.","Changamoto ni kuchoka kihisia; jali nafsi yako pia."],en:["Number 9 is compassion, universal, and service.","You are called to help and heal many.","Challenge is emotional fatigue; care for yourself too."]}},
  11:{title:{sw:"Msukumo wa Kiakili",en:"Intuitive Illuminator"},desc:{sw:["11 ni namba ya bwana: intuisia kali na mwanga wa kiroho.","Una uwezo wa kuongoza kupitia maono na hisia za kina.","Changamoto ni msongamano wa nishati; thabitiisha mazoea ya kutulia."],en:["11 is a master number: sharp intuition and spiritual light.","You lead with vision and deep feeling.","Challenge is energetic overwhelm; stabilize calming routines."]}},
  22:{title:{sw:"Mjenzi Mkuu",en:"Master Builder"},desc:{sw:["22 ni uwezo wa kubadilisha maono kuwa mifumo ya kudumu.","Una nguvu ya kupanga miradi mikubwa kwa athari ya muda mrefu.","Changamoto ni shinikizo; gawanya hatua na timu thabiti."],en:["22 turns vision into lasting systems.","You plan large projects with long-term impact.","Challenge is pressure; split steps and build strong teams."]}},
  33:{title:{sw:"Mwalimu wa Upendo",en:"Master Teacher of Love"},desc:{sw:["33 ni huduma ya juu, upendo wa kina, na ufundishaji wa uponyaji.","Una wito wa kuinua wengine kupitia huruma na elimu.","Changamoto ni kujitolea kupita; weka mipaka yenye afya."],en:["33 is high service, deep love, and healing teaching.","You elevate others through compassion and education.","Challenge is overgiving; set healthy boundaries."]}}
}
const state={lang:"sw",charts:{zodiac:null,life:null,compat:null,name:null,element:null,chinese:null,year:null,luck:null}}
function setLang(lang){state.lang=lang;document.documentElement.lang=lang;document.documentElement.setAttribute("data-lang",lang);qsa("[data-i18n]").forEach(el=>{const k=el.getAttribute("data-i18n");if(translations[k])el.textContent=translations[k][lang]});renderComputed();renderCompat()}
function getInputData(){const name=escapeHTML(qs('#fullName').value.trim());const d=qs('#dobDay').value.trim();const m=qs('#dobMonth').value.trim();const y=qs('#dobYear').value.trim();if(!name||!d||!m||!y)return null;return{name,d,m,y}}
function computeRecord(){const data=getInputData();if(!data)return null;if(!isValidDate(data.d,data.m,data.y)){shakePanel('#home');toast(state.lang==='sw'?"Tarehe si sahihi":"Invalid date");return null}const s=zodiacSign(data.d,data.m);const lp=lifePath(data.d,data.m,data.y);const energy=energyScore(data.name,data.d,data.m,data.y);const nn=nameNumbers(data.name);const py=personalYear(data.d,data.m);return{name:data.name,dob:`${data.d}/${data.m}/${data.y}`,sign:s,life:lp.n,energy:energy,py:py.n,pyYear:py.year,expr:nn.expression,soul:nn.soul,pers:nn.personality,ts:Date.now()}}
function getHistory(){try{return JSON.parse(localStorage.getItem('divlife_history')||'[]')}catch(e){return[]}}
function saveHistory(list){localStorage.setItem('divlife_history',JSON.stringify(list))}
function addToHistory(r){const list=getHistory();list.unshift(r);if(list.length>20)list.pop();saveHistory(list);renderHistory()}
function renderHistory(){const list=getHistory();const container=qs('#historyList');const empty=qs('#historyEmpty');if(!container||!empty)return;container.innerHTML='';if(!list.length){empty.style.display='block';return}empty.style.display='none';list.forEach(r=>{const item=document.createElement('div');item.className='history-item';const info=document.createElement('div');info.innerHTML=`<strong>${r.name}</strong><div class="meta">${r.dob} • ${r.sign} • LP ${r.life} • ${r.energy}%</div>`;const actions=document.createElement('div');actions.className='actions';const btn=document.createElement('button');btn.className='btn small glow';btn.textContent=translations['history_view'][state.lang];btn.addEventListener('click',()=>{qs('#fullName').value=r.name;const [dd,mm,yy]=r.dob.split('/');qs('#dobDay').value=dd;qs('#dobMonth').value=mm;qs('#dobYear').value=yy;renderComputed();location.hash='#results';route()});actions.appendChild(btn);item.appendChild(info);item.appendChild(actions);container.appendChild(item)})}
function reduceKeepMaster(n){if([11,22,33].includes(n))return n;let a=n;while(a>9){a=sumDigits(a)}return a}
function letterValue(ch){const code=ch.toUpperCase().charCodeAt(0);if(code<65||code>90)return 0;return ((code-64-1)%9)+1}
function isVowel(ch){return/[AEIOUY]/i.test(ch)}
function nameNumbers(name){const clean=name.toUpperCase().replace(/[^A-Z]/g,'');let sumAll=0,sumV=0,sumC=0;for(let i=0;i<clean.length;i++){const v=letterValue(clean[i]);sumAll+=v;if(isVowel(clean[i]))sumV+=v;else sumC+=v}return{expression:reduceKeepMaster(sumAll),soul:reduceKeepMaster(sumV),personality:reduceKeepMaster(sumC)}}
function elementFromLifePath(n){if([1,3,9,11].includes(n))return 'Fire';if([5,7].includes(n))return 'Air';if([4,6,22].includes(n))return 'Earth';if([2,8,33].includes(n))return 'Water';return 'Air'}
function elementSynergy(e1,e2){if(e1===e2)return 92;if((['Fire','Air'].includes(e1)&&['Fire','Air'].includes(e2))||(['Earth','Water'].includes(e1)&&['Earth','Water'].includes(e2)))return 78;if((e1==='Fire'&&e2==='Earth')||(e1==='Earth'&&e2==='Fire')||(e1==='Air'&&e2==='Water')||(e1==='Water'&&e2==='Air'))return 64;return 52}
function chineseZodiac(y){const animals=['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];let idx=(Number(y)-1900)%12;if(idx<0)idx+=12;return animals[idx]}
function personalYear(d,m){const cy=new Date().getFullYear();const s=sumDigits(d)+sumDigits(m)+sumDigits(cy);if([11,22].includes(s))return{n:s,year:cy,steps:[`${d} + ${m} + ${cy} = ${s}`]};let a=s;const st=[`${d} + ${m} + ${cy} = ${s}`];while(a>9){const b=sumDigits(a);st.push(`${a} → ${b}`);a=b}return{n:a,year:cy,steps:st}}
const yearProfiles={
  1:{sw:["Mwaka wa kuanzisha na kuanza upya.","Weka malengo mapya na chukua hatua za kwanza."],en:["Year of initiation and fresh starts.","Set new goals and take first steps."]},
  2:{sw:["Mwaka wa ushirikiano na uvumilivu.","Jenga uhusiano na usikivu wa ndani."],en:["Year of partnership and patience.","Build relationships and inner listening."]},
  3:{sw:["Mwaka wa ubunifu na mawasiliano.","Ongeza uwasilishaji wa mawazo na sanaa."],en:["Year of creativity and communication.","Increase idea expression and arts." ]},
  4:{sw:["Mwaka wa muundo na kazi ya msingi.","Weka mfumo thabiti na ratiba."],en:["Year of structure and foundation work.","Set solid systems and routines."]},
  5:{sw:["Mwaka wa mabadiliko na uhuru.","Jaribu mambo mapya kwa uangalifu."],en:["Year of change and freedom.","Try new things with care."]},
  6:{sw:["Mwaka wa familia na huduma.","Dumisha uwiano wa majukumu na mapumziko."],en:["Year of family and service.","Balance duties and rest."]},
  7:{sw:["Mwaka wa uchunguzi wa ndani na hekima.","Tafakari na jifunze kwa kina."],en:["Year of inner inquiry and wisdom.","Reflect and study deeply."]},
  8:{sw:["Mwaka wa matokeo na uongozi wa nyenzo.","Panua biashara na maamuzi thabiti."],en:["Year of results and material leadership.","Expand business and firm decisions."]},
  9:{sw:["Mwaka wa kukamilisha na kuachilia.","Hitimisha miradi na toa huduma kwa wengi."],en:["Year of completion and release.","Finish projects and serve widely."]},
  11:{sw:["Mwaka wa mwanga wa kiroho na maono.","Fuata intuisia na onyesha msukumo."],en:["Year of spiritual light and vision.","Follow intuition and show inspiration."]},
  22:{sw:["Mwaka wa kujenga mifumo mikubwa.","Geuza maono kuwa matokeo ya kudumu."],en:["Year of building large systems.","Turn vision into lasting outcomes."]}
}
const luckyColorsByElement={en:{Fire:"Red, Gold",Earth:"Green, Brown",Air:"Blue, Silver",Water:"Teal, White"},sw:{Fire:"Nyekundu, Dhahabu",Earth:"Kijani, Kahawia",Air:"Bluu, Fedha",Water:"Samawati, Nyeupe"}}
const luckyDayByPlanet={en:{Sun:"Sunday",Moon:"Monday",Mars:"Tuesday",Mercury:"Wednesday",Jupiter:"Thursday",Venus:"Friday",Saturn:"Saturday"},sw:{Sun:"Jumapili",Moon:"Jumatatu",Mars:"Jumanne",Mercury:"Jumatano",Jupiter:"Alhamisi",Venus:"Ijumaa",Saturn:"Jumamosi"}}
const careerProfiles={
  1:{sw:["Uongozi na kuanzisha miradi.","Ubunifu wa dira ya timu.","Maamuzi ya haraka yenye maadili."],en:["Leadership and project initiation.","Design team vision.","Quick ethical decisions."]},
  2:{sw:["Upatanishi na huduma ya jamii.","Mashauri ya uhusiano.","Utunzaji wa wateja."],en:["Mediation and community service.","Relationship counseling.","Customer care."]},
  3:{sw:["Mawasiliano, sanaa, na uandishi.","Ubunifu wa maudhui.","Ushawishi wa kijamii."],en:["Communication, arts, writing.","Content creativity.","Social influence."]},
  4:{sw:["Uhandisi, uendeshaji, na muundo.","Usimamizi wa mifumo.","Ubora na viwango."],en:["Engineering, operations, structure.","System management.","Quality and standards."]},
  5:{sw:["Mauzo, safari, na uvumbuzi wa uzoefu.","Utafiti wa soko.","Majaribio ya bidhaa."],en:["Sales, travel, experiential innovation.","Market research.","Product experimentation."]},
  6:{sw:["Uuguzi, elimu, na huduma ya familia.","Ustawi wa jamii.","Uongozi wa nyumba."],en:["Nursing, education, family service.","Community wellness.","Home leadership."]},
  7:{sw:["Utafiti, data, na falsafa.","Usalama wa taarifa.","Uchambuzi wa mifumo."],en:["Research, data, philosophy.","Information security.","Systems analysis."]},
  8:{sw:["Usimamizi, fedha, na biashara.","Uongozi wa rasilimali.","Mikakati ya ukuaji."],en:["Management, finance, business.","Resource leadership.","Growth strategy."]},
  9:{sw:["Asasi za kiraia, afya, na utumishi.","Mawasiliano ya huruma.","Miradi ya ustawi wa dunia."],en:["NGO, health, service.","Compassionate communications.","Global wellness projects."]},
  11:{sw:["Uongozi wa kiroho na ubunifu wa maono.","Ushauri wa maisha.","Uandishi wa msukumo."],en:["Spiritual leadership and visionary creativity.","Life coaching.","Inspirational writing."]},
  22:{sw:["Usanifu, ujenzi wa mifumo, na PM.","Miundombinu ya muda mrefu.","Uongozi wa mradi mkubwa."],en:["Architecture, systems building, PM.","Long-term infrastructure.","Large project leadership."]},
  33:{sw:["Ufundishaji, uponyaji, na huduma ya jamii.","Programu za elimu.","Maendeleo ya ustawi."],en:["Teaching, healing, community service.","Education programs.","Wellness development."]}
}
const exprProfiles={
  1:{title:{sw:'Ujasiri wa Jina',en:'Name Courage'},desc:{sw:["Expression 1 inaonyesha uongozi wa kibinafsi na msukumo wa kuanzisha.","Jina lako lina sauti ya kujitegemea na kuleta mwelekeo kwa wengine.","Zingatia kushirikiana ili kuepuka kuonekana kama unajitenga."],en:["Expression 1 shows personal leadership and initiating drive.","Your name carries independence and gives direction to others.","Collaborate to avoid appearing too solitary."]}},
  2:{title:{sw:'Ulinganifu wa Jina',en:'Name Harmony'},desc:{sw:["Expression 2 inaleta ushirikiano, huruma, na amani.","Unavutia kushirikisha na kusikiliza; jina lina uvumilivu wa kijamii.","Linda mipaka yako ili usijisahau."],en:["Expression 2 brings partnership, empathy, and peace.","You invite collaboration and listening; the name holds social patience.","Protect your boundaries to avoid self-neglect."]}},
  3:{title:{sw:'Uwasilishaji wa Jina',en:'Name Expression'},desc:{sw:["Expression 3 ni ubunifu, usanii, na uwasilishaji wa mawazo.","Jina lako lina mvuto wa kijamii na ucheshi wa kiakili.","Ratibu umakini ili kuzuia kusambaratika."],en:["Expression 3 is creativity, artistry, and idea expression.","Your name carries social magnetism and witty intellect.","Organize focus to prevent scatter."]}},
  4:{title:{sw:'Muundo wa Jina',en:'Name Structure'},desc:{sw:["Expression 4 hujenga msingi thabiti na uadilifu wa kazi.","Jina lina nia ya utaratibu na uaminifu wa muda mrefu.","Ongeza kubadilika kidogo ili kuepuka ukakamavu."],en:["Expression 4 builds solid foundations and work integrity.","The name inclines to order and long-term reliability.","Add mild flexibility to avoid rigidity."]}},
  5:{title:{sw:'Uhuru wa Jina',en:'Name Freedom'},desc:{sw:["Expression 5 ni mabadiliko, kusafiri, na kujifunza kupitia uzoefu.","Jina lina nguvu ya kuchochea ujasiri wa kujaribu.","Weka mipaka salama dhidi ya hatari kupita."],en:["Expression 5 is change, travel, and experiential learning.","The name energizes courage to try new things.","Set safe limits against excess risk."]}},
  6:{title:{sw:'Huduma ya Jina',en:'Name Service'},desc:{sw:["Expression 6 ni familia, huduma, na uwajibikaji wenye upendo.","Jina lina ukarimu na matunzo ya amani ya nyumbani.","Gawanya majukumu ili kuepuka kuchoka."],en:["Expression 6 is family, service, and loving responsibility.","The name holds generosity and home peace care.","Delegate to avoid fatigue."]}},
  7:{title:{sw:'Utafiti wa Jina',en:'Name Inquiry'},desc:{sw:["Expression 7 ni uchunguzi wa ndani na hekima ya kina.","Jina linavuta kutafakari na utafiti wa kweli.","Dumisha mahusiano ya karibu ili usijitenge."],en:["Expression 7 is inner inquiry and deep wisdom.","The name invites contemplation and truth research.","Maintain close ties to avoid isolation."]}},
  8:{title:{sw:'Uongozi wa Jina',en:'Name Authority'},desc:{sw:["Expression 8 ni uongozi wa nyenzo na matokeo thabiti.","Jina lina msukumo wa biashara na usimamizi wa rasilimali.","Weka maadili thabiti dhidi ya kupenda mamlaka."],en:["Expression 8 is material leadership and steady results.","The name drives business and resource management.","Anchor ethics against love of power."]}},
  9:{title:{sw:'Huruma ya Jina',en:'Name Compassion'},desc:{sw:["Expression 9 ni huduma ya kilimwengu na uponyaji.","Jina lina wito wa kusaidia na kutoa faraja kwa wengi.","Jali nafsi yako ili uendelee kung'aa."],en:["Expression 9 is universal service and healing.","The name calls you to help and comfort many.","Care for yourself to sustain your shine."]}},
  11:{title:{sw:'Mwanga wa Jina',en:'Name Light'},desc:{sw:["Expression 11 ni intuisia kali na msukumo wa kiroho.","Jina lina aura ya msukumo kwa jamii.","Thabitiisha taratibu za utulivu ili kusawazisha nishati."],en:["Expression 11 is sharp intuition and spiritual inspiration.","The name carries an aura that uplifts communities.","Stabilize calming routines to balance energy."]}},
  22:{title:{sw:'Mjenzi wa Jina',en:'Name Master Builder'},desc:{sw:["Expression 22 hubadili maono kuwa mifumo ya kudumu.","Jina lina uwezo wa kupanga miradi mikubwa.","Gawanya hatua na timiza kwa mpangilio."],en:["Expression 22 turns vision into lasting systems.","The name can plan large impactful projects.","Split steps and execute methodically."]}},
  33:{title:{sw:'Mwalimu wa Jina',en:'Name Master Teacher'},desc:{sw:["Expression 33 ni huduma ya juu na ufundishaji wa upendo.","Jina lina rehema ya kuinua jamii.","Weka mipaka ili kuepuka kujitolea kupita."],en:["Expression 33 is high service and teaching of love.","The name has mercy that uplifts communities.","Set boundaries to avoid overgiving."]}}
}
const chineseProfiles={
  Rat:{desc:{sw:["Panya ni mwerevu, mwepesi, na mbunifu wa fursa.","Una uwezo wa kupanga mikakati kwa ufanisi.","Jihadhari na wasiwasi; panga mapumziko."],en:["Rat is clever, quick, and opportunity-minded.","You plan strategies effectively.","Guard against anxiety; schedule breaks."]}},
  Ox:{desc:{sw:["Ng'ombe ni thabiti, mvumilivu, na mwenye maadili ya kazi.","Wewe ni msingi wa timu na familia.","Epuka ukakamavu kwa kubadilika taratibu."],en:["Ox is steady, patient, and hard-working.","You anchor teams and family.","Avoid rigidity with gradual adaptation."]}},
  Tiger:{desc:{sw:["Tiger ni jasiri, mwepesi kuamua, na mlinzi.","Una msukumo wa uongozi wa haki.","Punguza pupa kwa tathmini ya hatari."],en:["Tiger is brave, decisive, and protective.","You lead with justice.","Reduce impulsiveness with risk review."]}},
  Rabbit:{desc:{sw:["Sungura ni mpole, mwenye amani, na mtunza uhusiano.","Una hisia nzuri na busara ya kijamii.","Dumisha mipaka ili kulinda nishati."],en:["Rabbit is gentle, peaceful, and relationship-tending.","You have good feelings and social wisdom.","Maintain boundaries to protect energy."]}},
  Dragon:{desc:{sw:["Joka ni wa maono, nguvu, na ushawishi.","Una mng'ao wa mafanikio na msukumo.","Fungua ushirikiano ili kudumisha uwiano."],en:["Dragon is visionary, powerful, and influential.","You shine with success and inspiration.","Open collaboration to sustain balance."]}},
  Snake:{desc:{sw:["Nyoka ni mwenye hekima, siri, na intuisia.","Una usikivu wa undani na ulinzi wa roho.","Epuka kutengwa kwa kuongeza mazungumzo."],en:["Snake is wise, private, and intuitive.","You sense details and spiritual protection.","Avoid isolation by increasing dialogue."]}},
  Horse:{desc:{sw:["Farasi ni huru, mwepesi, na msafiri wa uzoefu.","Una shauku ya kujifunza kwa kufanya.","Weka ratiba ili kusawazisha kasi."],en:["Horse is free, fast, and experiential traveler.","You love learning by doing.","Set routines to balance speed."]}},
  Goat:{desc:{sw:["Mbuzi ni mkarimu, msanii, na mpenda amani.","Una moyo wa kusaidia na urembo.","Tunza mipaka ili kulinda hisia."],en:["Goat is generous, artistic, and peace-loving.","You help and love beauty.","Keep boundaries to protect feelings."]}},
  Monkey:{desc:{sw:["Tumbili ni mbunifu, mwerevu, na mcheshi.","Una fikra za haraka na suluhisho za ajabu.","Punguza utani kupita wakati wa kazi."],en:["Monkey is inventive, clever, and playful.","You think fast and craft surprising solutions.","Reduce playfulness during focus work."]}},
  Rooster:{desc:{sw:["Jogoo ni makini, mtaratibu, na msema kweli.","Una nidhamu na uwazi wa mawasiliano.","Epuka ukosoaji mkali kwa rehema."],en:["Rooster is attentive, orderly, and truthful.","You have discipline and communication clarity.","Avoid harsh criticism with mercy."]}},
  Dog:{desc:{sw:["Mbwa ni mwaminifu, mlinzi, na mtoa msaada.","Una moyo wa uaminifu na haki.","Jihadhari na uchovu wa kuwajibika kupita."],en:["Dog is loyal, protective, and supportive.","You hold loyalty and justice.","Watch for duty burnout."]}},
  Pig:{desc:{sw:["Nguruwe ni mkarimu, mpenda faraja, na mwaminifu.","Una shukrani na moyo wa mafanikio ya utulivu.","Weka lengo ili kuepuka kupumzika kupita."],en:["Pig is generous, comfort-loving, and faithful.","You have gratitude and calm success.","Set goals to avoid over-relaxing."]}}
}
function renderComputed(){
  const name=escapeHTML(qs('#fullName').value.trim());
  const d=qs('#dobDay').value.trim();
  const m=qs('#dobMonth').value.trim();
  const y=qs('#dobYear').value.trim();
  if(!name||!d||!m||!y) return false;
  const valid=isValidDate(d,m,y);
  if(!valid){shakePanel('#home');toast(state.lang==='sw'?"Tarehe si sahihi":"Invalid date");return false}
  const sign=zodiacSign(d,m);
  const z=zodiacProfiles[sign];
  const meta=`${state.lang==='sw'?"Element":"Element"}: ${z.element[state.lang]} • ${state.lang==='sw'?"Sayari":"Planet"}: ${z.planet[state.lang]}`;
  qs('#zodiacName').textContent=state.lang==='sw'?sign:sign;
  qs('#zodiacMeta').textContent=meta;
  const strength=(hashValue(name+sign)%41)+55;
  updateGauge('zodiacGauge','zodiac',strength);
  const ztexts=qs('#zodiacTexts');
  ztexts.innerHTML='';
  z.desc[state.lang].forEach(t=>{const p=document.createElement('p');p.textContent=t;ztexts.appendChild(p)});
  qs('#lightPositive').style.opacity= strength>70?1:.4;
  qs('#lightNegative').style.opacity= strength<55?1:.4;
  const lp=lifePath(d,m,y);
  qs('#lifeNumber').textContent=lp.n;
  qs('#lifeSteps').textContent=lp.steps.join(' • ');
  const energy=energyScore(name,d,m,y);
  updateGauge('lifeGauge','life',energy);
  const ltexts=qs('#lifeTexts');
  ltexts.innerHTML='';
  const prof=lifeProfiles[lp.n];
  prof.desc[state.lang].forEach(t=>{const p=document.createElement('p');p.textContent=t;ltexts.appendChild(p)});
  const nn=nameNumbers(name);
  qs('#exprNum').textContent=nn.expression;
  qs('#soulNum').textContent=nn.soul;
  qs('#persNum').textContent=nn.personality;
  const nameVal=(hashValue(name)%51)+49;
  updateGauge('nameGauge','name',clamp(nameVal,0,100));
  const ntexts=qs('#nameTexts');
  ntexts.innerHTML='';
  const eprof=exprProfiles[nn.expression]||exprProfiles[reduceKeepMaster(nn.expression)];
  eprof.desc[state.lang].forEach(t=>{const p=document.createElement('p');p.textContent=t;ntexts.appendChild(p)});
  const ze=z.element.en;const le=elementFromLifePath(lp.n);
  const es=elementSynergy(ze,le);
  qs('#elementMeta').textContent=(state.lang==='sw'?`Nyota: ${z.element.sw} • Namba: ${elementNames.sw[le]}`:`Zodiac: ${ze} • Life: ${elementNames.en[le]}`);
  updateGauge('elementGauge','element',es);
  const etexts=qs('#elementTexts');etexts.innerHTML='';
  const et1=(state.lang==='sw'?`Uwiano wa elementi: ${es}%.`:`Element balance: ${es}%.`);
  const et2=(state.lang==='sw'? (es>80?"Nishati zako zinaungana kwa nguvu; songa na miradi mikubwa.": es>60?"Kuna muafaka wa kutosha; tumia mawasiliano na ratiba.":"Tofauti ya elementi; fanya mazoezi ya kusawazisha." ) : (es>80?"Energies unite strongly; pursue big projects.": es>60?"Acceptable harmony; use communication and routines.":"Element contrast; practice balancing.") );
  [et1,et2].forEach(t=>{const p=document.createElement('p');p.textContent=t;etexts.appendChild(p)});
  const cz=chineseZodiac(y);
  qs('#chineseName').textContent=state.lang==='sw'?cz:cz;
  qs('#chineseMeta').textContent=(state.lang==='sw'?`Mwaka: ${y}`:`Year: ${y}`);
  const fortune=(hashValue(name+y)%41)+55;
  updateGauge('chineseGauge','chinese',fortune);
  const ctexts=qs('#chineseTexts');ctexts.innerHTML='';
  (chineseProfiles[cz].desc[state.lang]).forEach(t=>{const p=document.createElement('p');p.textContent=t;ctexts.appendChild(p)});
  const py=personalYear(d,m);
  qs('#yearNumber').textContent=py.n;
  qs('#yearMeta').textContent=(state.lang==='sw'?`Mwaka: ${py.year}`:`Year: ${py.year}`)+' • '+py.steps.join(' • ');
  const yval=(hashValue(name+String(py.year))%41)+55;
  updateGauge('yearGauge','year',yval);
  const ytexts=qs('#yearTexts');ytexts.innerHTML='';
  (yearProfiles[py.n]?.[state.lang]||[]).forEach(t=>{const p=document.createElement('p');p.textContent=t;ytexts.appendChild(p)});
  const lnums=`${lp.n}, ${nn.expression}, ${nn.soul}`;
  const lcols=luckyColorsByElement[state.lang][le];
  const lday=luckyDayByPlanet[state.lang][z.planet.en];
  qs('#luckNumbers').textContent=lnums;
  qs('#luckColors').textContent=lcols;
  qs('#luckDay').textContent=lday;
  const luckVal=clamp(Math.round((energy+es+fortune)/3),0,100);
  updateGauge('luckGauge','luck',luckVal);
  const luckTexts=qs('#luckTexts');luckTexts.innerHTML='';
  const lt1=(state.lang==='sw'?`Namba: ${lnums} • Rangi: ${lcols} • Siku: ${lday}`:`Numbers: ${lnums} • Colors: ${lcols} • Day: ${lday}`);
  const lt2=(state.lang==='sw'?(luckVal>75?"Bahati ni juu; panga hatua kwenye siku yako ya bahati.":luckVal>55?"Bahati ya kati; tumia rangi zako mara kwa mara.":"Bahati ndogo; fuata ratiba na utulivu."):(luckVal>75?"High luck; schedule key moves on your lucky day.":luckVal>55?"Moderate luck; use your colors often.":"Lower luck; follow routines and calm."));
  [lt1,lt2].forEach(t=>{const p=document.createElement('p');p.textContent=t;luckTexts.appendChild(p)});
  const ctexts2=qs('#careerTexts');ctexts2.innerHTML='';
  (careerProfiles[lp.n]?.[state.lang]||[]).forEach(t=>{const p=document.createElement('p');p.textContent=t;ctexts2.appendChild(p)});
  return true;
}
function updateGauge(id,key,value){const canvas=qs(`#${id}`);if(!canvas)return;if(state.charts[key]){state.charts[key].data.datasets[0].data=[clamp(value,0,100),100-clamp(value,0,100)];state.charts[key].update();return}state.charts[key]=makeGauge(canvas,value)}
function shakePanel(sel){const el=qs(sel);el.style.transform='translateX(0)';el.style.transition='transform .15s';requestAnimationFrame(()=>{el.style.transform='translateX(6px)';setTimeout(()=>{el.style.transform='translateX(0)'},160)})}
function toast(t){const el=qs('#toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2000)}
function renderCompat(){const n1=escapeHTML(qs('#fullName').value.trim());const d1=qs('#dobDay').value.trim();const m1=qs('#dobMonth').value.trim();const y1=qs('#dobYear').value.trim();const n2=escapeHTML(qs('#fullName2').value.trim());const d2=qs('#dobDay2').value.trim();const m2=qs('#dobMonth2').value.trim();const y2=qs('#dobYear2').value.trim();if(!n1||!d1||!m1||!y1||!n2||!d2||!m2||!y2)return; if(!isValidDate(d1,m1,y1)||!isValidDate(d2,m2,y2)){toast(state.lang==='sw'?"Tarehe si sahihi":"Invalid date");return}
const s1=zodiacSign(d1,m1);const s2=zodiacSign(d2,m2);const e1=zodiacProfiles[s1].element.en;const e2=zodiacProfiles[s2].element.en;let base=100-Math.abs(lifePath(d1,m1,y1).n-lifePath(d2,m2,y2).n)/9*100;const elemBoost=(e1===e2)?15:(['Fire','Air'].includes(e1)&&['Fire','Air'].includes(e2))||(['Earth','Water'].includes(e1)&&['Earth','Water'].includes(e2))?8:0;let score=clamp(Math.round(base+elemBoost),0,100);updateGauge('compatGauge','compat',score);qs('#compatScoreText').textContent=(state.lang==='sw'?"Ulinganifu":"Compatibility")+`: ${score}%`;const ct=qs('#compatTexts');ct.innerHTML='';const t1=(state.lang==='sw'?`Nyota zako: ${s1} na ${s2}. Elementi: ${zodiacProfiles[s1].element.sw} na ${zodiacProfiles[s2].element.sw}.`:`Your signs: ${s1} and ${s2}. Elements: ${zodiacProfiles[s1].element.en} and ${zodiacProfiles[s2].element.en}.`);const t2=(state.lang==='sw'?`Alama ya namba: ${lifePath(d1,m1,y1).n} na ${lifePath(d2,m2,y2).n}.`:`Life path numbers: ${lifePath(d1,m1,y1).n} and ${lifePath(d2,m2,y2).n}.`);const t3=(state.lang==='sw'? (score>75?"Ulinganifu ni wa juu; wekezeni kwenye mawasiliano ya wazi.": score>50?"Ulinganifu wa kati; panga mawe ya hatua ya uhusiano.":"Lazima kuwe na juhudi; jengeni mipaka na kusikiliziana.") : (score>75?"High compatibility; invest in open communication.": score>50?"Moderate compatibility; set relationship milestones.":"Requires effort; build boundaries and active listening."));[t1,t2,t3].forEach(t=>{const p=document.createElement('p');p.textContent=t;ct.appendChild(p)})}
function route(){const hash=location.hash||'#home';qsa('.panel').forEach(p=>p.classList.remove('active'));const target=qs(hash);if(target)target.classList.add('active');qsa('.nav-link').forEach(a=>{a.classList.toggle('active',a.getAttribute('href')===hash)})}
function sendContact(){const name=escapeHTML(qs('#cName').value.trim());const email=escapeHTML(qs('#cEmail').value.trim());const msg=escapeHTML(qs('#cMsg').value.trim());if(!name||!email||!msg){toast(state.lang==='sw'?"Jaza kila sehemu":"Fill all fields");return}const ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);if(!ok){toast(state.lang==='sw'?"Barua pepe si sahihi":"Invalid email");return}qs('#contactStatus').textContent=state.lang==='sw'?"Imetumwa (local)":"Sent (local)";toast(state.lang==='sw'?"Ujumbe umetumwa":"Message sent")}
function init(){
  route();
  setLang('sw');
  qs('#langToggle').addEventListener('click',()=>setLang(state.lang==='sw'?'en':'sw'));
  ['#fullName','#dobDay','#dobMonth','#dobYear'].forEach(id=>qs(id).addEventListener('input',()=>{if(qs('#autoCalc').checked)renderComputed()}));
  qs('#diagnoseBtn').addEventListener('click',()=>{const rec=computeRecord();if(rec){renderComputed();addToHistory(rec);location.hash='#results';route()}});
  qs('#scanBtn').addEventListener('click',()=>{if(renderComputed()){location.hash='#results';route()}});
  ['#fullName2','#dobDay2','#dobMonth2','#dobYear2'].forEach(id=>qs(id).addEventListener('input',()=>{if(qs('#autoCalc').checked)renderCompat()}));
  qs('#compatBtn').addEventListener('click',renderCompat);
  qs('#contactSend').addEventListener('click',sendContact);
  window.addEventListener('hashchange',route);
  renderHistory();
}
document.addEventListener('DOMContentLoaded',init)
