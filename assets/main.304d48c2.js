const c="https://bahn-test-3687838850c6.herokuapp.com/",a={};fetch(c,a).then(e=>(console.log(e),e.text())).then(e=>{let t;try{t=JSON.parse(e);const r=document.querySelector("#result"),l=document.querySelector("#line");if(r&&t&&l){l.innerHTML=`${t.busLine} - ${t.route}`;let o="";for(const s of t.stations)o+=`<tr>
                    <td>
                        <img class="center" src="/assets/haltestelle.svg" alt="haltestelle" width="20" height="20">
                        </td>
                    <td>${s.estimatedArrival}</td>
                    <td>${s.stationName}</td>
                    <td>
                    
                    <img src="/assets/elderly.svg" alt="elderly" width="20" height="20">
                    ${s.checkedPassengers.elderly}
                    <img src="/assets/people.svg" alt="people" width="20" height="20">
                    ${s.checkedPassengers.normal}
                    <img src="/assets/wheelchair.svg" alt="wheelchair" width="20" height="20">
                    <i class="bi bi-person-wheelchair"></i>
                    ${s.checkedPassengers.wheelchair}
                    </td>
                    </tr>`;console.log(t),r.innerHTML=`
                <table class="table table--timetable">
                <tbody>
                ${o}
                </tbody>
                </tabl>
                
                `}}catch(r){console.error("Error:",r)}}).catch(e=>{console.error("Error:",e)});
//# sourceMappingURL=main.304d48c2.js.map
