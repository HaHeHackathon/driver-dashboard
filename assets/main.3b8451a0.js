const c="https://bahn-test-3687838850c6.herokuapp.com/",l="/driver-dashboard",i={};fetch(c,i).then(e=>(console.log(e),e.text())).then(e=>{let t;try{t=JSON.parse(e);const r=document.querySelector("#result"),o=document.querySelector("#line");if(r&&t&&o){o.innerHTML=`${t.busLine} - ${t.route}`;let a="";for(const s of t.stations)a+=`<tr>
                    <td>
                        <img class="center" src="${l}/assets/haltestelle.svg" alt="haltestelle" width="20" height="20">
                        </td>
                    <td>${s.estimatedArrival}</td>
                    <td>${s.stationName}</td>
                    <td>
                    
                    <img src="${l}/assets/elderly.svg" alt="elderly" width="20" height="20">
                    ${s.checkedPassengers.elderly}
                    <img src="${l}/assets/people.svg" alt="people" width="20" height="20">
                    ${s.checkedPassengers.normal}
                    <img src="${l}/assets/wheelchair.svg" alt="wheelchair" width="20" height="20">
                    <i class="bi bi-person-wheelchair"></i>
                    ${s.checkedPassengers.wheelchair}
                    </td>
                    </tr>`;console.log(t),r.innerHTML=`
                <table class="table table--timetable">
                <tbody>
                ${a}
                </tbody>
                </tabl>
                
                `}}catch(r){console.error("Error:",r)}}).catch(e=>{console.error("Error:",e)});
//# sourceMappingURL=main.3b8451a0.js.map
