const w={seats:36,wheelchair:2,standing:64};function _(t){const[e,s]=t.split(":").map(Number),n=new Date;return n.setHours(e,s,0,0),n.getTime()}function E(t){const e=new Date(t),s=e.getHours().toString().padStart(2,"0"),n=e.getMinutes().toString().padStart(2,"0");return`${s}:${n}`}function C(t,e){const n=_(t)+e*6e4;return E(n)}const I="https://bahn-test-3687838850c6.herokuapp.com/";let f=document.getElementById("status");const r=t=>{f&&(f.setAttribute("data-status",t),f.innerHTML=t)},L=t=>{let e;try{e=JSON.parse(t);const s=document.querySelector("#result"),n=document.querySelector("#line");if(s&&e&&n){n.innerHTML=`
                <div class="d-inline-block">
                    <div class="hex-badge">
                        <span class="badge-number">${e.busLine}</span>
                    </div>
                </div>
                <div class="d-inline-block">
                 - ${e.route}
                </div>
                
                `;let v="",a=0;for(const d of e.stations){let i="full",h=0,b=0;for(const g in w)b+=w[g];console.log(b);for(const g in d.checkedPassengers)h+=d.checkedPassengers[g];const l=h/b*100;console.log("percentage"),console.log(l),l>90?a+=3:l>70?a+=2:l>50&&(a+=1),d.checkedPassengers.wheelchair>0&&(a+=2),l>=99?i="full":l>=75?i="high":l>=50?i="medium":l>=20?i="low":i="none",console.log(h);let o="";switch(i){case"low":o=`
                            <td class="low">&nbsp;</td>
                            <td class="low">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"medium":o=`
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"high":o=`
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"full":o=`
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            `;break;default:o=`
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `}let p="";a>0?p=`<span class="red">+ ${a}</span>`:p=`<span class="green">- ${a}</span>`,v+=`<tr>
                    <td>
                        <img class="center" src="${c}/assets/haltestelle.svg" alt="haltestelle" width="20" height="20">
                    </td>
                    <td>${d.estimatedArrival}</td>
                    <td>${C(d.estimatedArrival,a)} ${p}</td>
                    <td>${d.stationName}</td>
                    <td>
                        <img src="${c}/assets/elderly.svg" alt="elderly" width="20" height="20">
                        ${d.checkedPassengers.elderly}
                        <img src="${c}/assets/people.svg" alt="people" width="20" height="20">
                        ${d.checkedPassengers.normal}
                        <img src="${c}/assets/wheelchair.svg" alt="wheelchair" width="20" height="20">
                        <i class="bi bi-person-wheelchair"></i>
                        ${d.checkedPassengers.wheelchair}
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
                                            
                                            
                                            ${o}
                                            
                                            
                                        </tr>
                                    </tbody>    
                                </table>
                            </div>
                            
                            
                                
                            
                            
                        </td>
                    </tr>`}console.log(e),s.innerHTML=`
                <table class="table table--timetablXe table-striped">
                <tbody>
                ${v}
                </tbody>
                </tabl>
                
                `,r("ok")}}catch(s){r("error"),console.error("Error:",s)}},c="/driver-dashboard";let m,u=5,$=0;function T(){const t=document.getElementById("counter");t&&(t.textContent=`Next update in: ${u} seconds | ${$}`)}function y(){console.log("Fetching data..."),$++,fetch(I).then(t=>t.json()).then(t=>{L(JSON.stringify(t)),S()}).catch(t=>{console.error("Error fetching data:",t),r("error")})}function P(){console.log("start countdown"),y(),m=setInterval(()=>{u--,T(),u<=0&&y()},1e3)}function S(){u=5,T()}function k(){m!==void 0&&clearInterval(m),console.log("Stopped fetching and countdown.")}function x(){S(),P()}r("loading");window.addEventListener("load",x);window.addEventListener("beforeunload",k);document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?k():document.visibilityState==="visible"&&x()});
//# sourceMappingURL=main.f625f9ae.js.map
