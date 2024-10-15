const w={seats:36,wheelchair:2,standing:64};function _(t){const e=t.match(/\d*\:\d/);if(console.log("isSimple"),console.log(e),e){const[s,d]=t.split(":").map(Number),c=new Date;return c.setHours(s,d,0,0),c.getTime()}else return new Date(t).getTime()}function E(t){const e=new Date(t),s=e.getHours().toString().padStart(2,"0"),d=e.getMinutes().toString().padStart(2,"0");return`${s}:${d}`}function C(t,e){const d=_(t)+e*6e4;return E(d)}const I="https://bahn-test-3687838850c6.herokuapp.com/";let m=document.getElementById("status");const u=t=>{m&&(m.setAttribute("data-status",t),m.innerHTML=t)},L=t=>{let e;try{e=JSON.parse(t);const s=document.querySelector("#result"),d=document.querySelector("#line");if(s&&e&&d){d.innerHTML=`
                <div class="d-inline-block">
                    <div class="hex-badge">
                        <span class="badge-number">${e.busLine}</span>
                    </div>
                </div>
                <div class="d-inline-block">
                 - ${e.route}
                </div>
                
                `;let c="",l=0;for(const n of e.stations){let o="full",p=0,b=0;for(const f in w)b+=w[f];console.log(b);for(const f in n.checkedPassengers)p+=n.checkedPassengers[f];const a=p/b*100;console.log("percentage"),console.log(a),a>90?l+=3:a>70?l+=2:a>50&&(l+=1),n.checkedPassengers.wheelchair>0&&(l+=2),a>=99?o="full":a>=75?o="high":a>=50?o="medium":a>=20?o="low":o="none",console.log(p);let i="";switch(o){case"low":i=`
                            <td class="low">&nbsp;</td>
                            <td class="low">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"medium":i=`
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"high":i=`
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"full":i=`
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            `;break;default:i=`
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `}let g="";l>0?g=`<span class="red">+ ${l}</span>`:g=`<span class="green">- ${l}</span>`,c+=`<tr>
                    <td>
                        <img class="center" src="${r}/assets/haltestelle.svg" alt="haltestelle" width="20" height="20">
                    </td>
                    <td>${n.estimatedArrival}</td>
                    <td>${C(n.estimatedArrival,l)} ${g}</td>
                    <td>${n.stationName}</td>
                    <td>
                        <img src="${r}/assets/elderly.svg" alt="elderly" width="20" height="20">
                        ${n.checkedPassengers.elderly}
                        <img src="${r}/assets/people.svg" alt="people" width="20" height="20">
                        ${n.checkedPassengers.normal}
                        <img src="${r}/assets/wheelchair.svg" alt="wheelchair" width="20" height="20">
                        <i class="bi bi-person-wheelchair"></i>
                        ${n.checkedPassengers.wheelchair}
                    </td>
                    <td>
                            <div class="activity__table">
        
                                <table class=" fixed-height-table activity__stream">
                                    <thead>
                                        <tr>
                                            
                                            <td>0%</td>
                                            
                                            <td>25%</td>
                                            
                                            <td>50%</td>
                                            
                                            <td>75%</td>
                                            <td>100%</td>
                                            
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            
                                            
                                            ${i}
                                            
                                            
                                        </tr>
                                    </tbody>    
                                </table>
                            </div>
                            
                            
                                
                            
                            
                        </td>
                    </tr>`}console.log(e),s.innerHTML=`
                <table class="table table--timetablXe table-striped">
                <tbody>
                ${c}
                </tbody>
                </tabl>
                
                `,u("ok")}}catch(s){u("error"),console.error("Error:",s)}},r="/driver-dashboard";let v,h=5,$=0;function S(){const t=document.getElementById("counter");t&&(t.textContent=`Next update in: ${h} seconds | ${$}`)}function y(){console.log("Fetching data..."),$++,fetch(I).then(t=>t.json()).then(t=>{L(JSON.stringify(t)),T()}).catch(t=>{console.error("Error fetching data:",t),u("error")})}function P(){console.log("start countdown"),y(),v=setInterval(()=>{h--,S(),h<=0&&y()},1e3)}function T(){h=5,S()}function k(){v!==void 0&&clearInterval(v),console.log("Stopped fetching and countdown.")}function x(){T(),P()}u("loading");window.addEventListener("load",x);window.addEventListener("beforeunload",k);document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?k():document.visibilityState==="visible"&&x()});
//# sourceMappingURL=main.c62ab82e.js.map
