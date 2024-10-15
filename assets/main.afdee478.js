const m={seats:36,wheelchair:2,standing:64},S="https://bahn-test-3687838850c6.herokuapp.com/";let b=document.getElementById("status");const c=t=>{b&&(b.setAttribute("data-status",t),b.innerHTML=t)},E=t=>{let s;try{s=JSON.parse(t);const a=document.querySelector("#result"),g=document.querySelector("#line");if(a&&s&&g){g.innerHTML=`
                <div class="d-inline-block">
                    <div class="hex-badge">
                        <span class="badge-number">${s.busLine}</span>
                    </div>
                </div>
                <div class="d-inline-block">
                 - ${s.route}
                </div>
                
                `;let f="";for(const e of s.stations){let n="full",r=0,h=0;for(const u in m)h+=m[u];console.log(h);for(const u in e.checkedPassengers)r+=e.checkedPassengers[u];const l=r/h*100;console.log("percentage"),console.log(l),l>=99?n="full":l>=75?n="high":l>=50?n="medium":l>=20?n="low":n="none",console.log(r);let d="";switch(n){case"low":d=`
                            <td class="low">&nbsp;</td>
                            <td class="low">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"medium":d=`
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"high":d=`
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;break;case"full":d=`
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            `;break;default:d=`
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `}f+=`<tr>
                    <td>
                        <img class="center" src="${o}/assets/haltestelle.svg" alt="haltestelle" width="20" height="20">
                    </td>
                    <td>${e.estimatedArrival}</td>
                    <td>${e.stationName}</td>
                    <td>
                        <img src="${o}/assets/elderly.svg" alt="elderly" width="20" height="20">
                        ${e.checkedPassengers.elderly}
                        <img src="${o}/assets/people.svg" alt="people" width="20" height="20">
                        ${e.checkedPassengers.normal}
                        <img src="${o}/assets/wheelchair.svg" alt="wheelchair" width="20" height="20">
                        <i class="bi bi-person-wheelchair"></i>
                        ${e.checkedPassengers.wheelchair}
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
                                            
                                            
                                            ${d}
                                            
                                            
                                        </tr>
                                    </tbody>    
                                </table>
                            </div>
                            
                            
                                
                            
                            
                        </td>
                    </tr>`}console.log(s),a.innerHTML=`
                <table class="table table--timetablXe table-striped">
                <tbody>
                ${f}
                </tbody>
                </tabl>
                
                `,c("ok")}}catch(a){c("error"),console.error("Error:",a)}},o="/driver-dashboard";let p,i=300,w=0;function y(){const t=document.getElementById("counter");t&&(t.textContent=`Next update in: ${i} seconds | ${w}`)}function v(){console.log("Fetching data..."),w++,fetch(S).then(t=>t.json()).then(t=>{E(JSON.stringify(t)),$()}).catch(t=>{console.error("Error fetching data:",t),c("error")})}function C(){console.log("start countdown"),v(),p=setInterval(()=>{i--,y(),i<=0&&v()},1e3)}function $(){i=300,y()}function k(){p!==void 0&&clearInterval(p),console.log("Stopped fetching and countdown.")}function _(){$(),C()}c("loading");window.addEventListener("load",_);window.addEventListener("beforeunload",k);document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?k():document.visibilityState==="visible"&&_()});
//# sourceMappingURL=main.afdee478.js.map
