// import 'vite/dynamic-import-polyfill'; // for prod mode
import './_framework/css/index.css';
// import { createSearch } from './components/molecules/search/search.molecule';


const url = `https://bahn-test-3687838850c6.herokuapp.com/`;

const options = {
//   method: 'GET',
//   headers: {
//     'DB-Client-Id': env.VITE_DB_CLIENT_ID, // Replace with your actual client ID
//     'DB-Api-Key': env.VITE_DB_SECRET, // Replace with your actual client secret
//     'Accept': 'application/xml'
//   }
};

fetch(url, options)
      .then(response => {

        console.log(response)
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        return response.text(); // Or use response.json() if the response is JSON
      })
      .then(body => {
        // console.log(body);
        let json;
        try {
            json = JSON.parse(body);
            const result = document.querySelector('#result');
            const line = document.querySelector('#line');
            if(result && json && line){

                line.innerHTML = `${json.busLine} - ${json.route}`;
                let rows = '';
                for(const item of json.stations) {
                    rows += `<tr>
                    <td>
                        <img class="center" src="/assets/haltestelle.svg" alt="haltestelle" width="20" height="20">
                        </td>
                    <td>${item.estimatedArrival}</td>
                    <td>${item.stationName}</td>
                    <td>
                    
                    <img src="/assets/elderly.svg" alt="elderly" width="20" height="20">
                    ${item.checkedPassengers.elderly}
                    <img src="/assets/people.svg" alt="people" width="20" height="20">
                    ${item.checkedPassengers.normal}
                    <img src="/assets/wheelchair.svg" alt="wheelchair" width="20" height="20">
                    <i class="bi bi-person-wheelchair"></i>
                    ${item.checkedPassengers.wheelchair}
                    </td>
                    </tr>`;
                }
                console.log(json);
                result.innerHTML = `
                <table class="table table--timetable">
                <tbody>
                ${rows}
                </tbody>
                </tabl>
                
                `;
            }
        } catch (error) {
            console.error('Error:', error);
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });