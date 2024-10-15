// import 'vite/dynamic-import-polyfill'; // for prod mode
import './_framework/css/index.css';
// import { createSearch } from './components/molecules/search/search.molecule';

const count_interval_seconds= 5;
const BUS_CAPACITY: {[key: string]: number} = {
    seats: 36,
    wheelchair: 2,
    standing: 64
}

function timeStringToUnix(time: string): number {
    // Split the "12:25" string into hours and minutes
    const [hours, minutes] = time.split(":").map(Number);

    // Get the current date and set the hours and minutes
    const now = new Date();
    now.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

    // Return the Unix time in milliseconds
    return now.getTime();
}

function unixToTimeString(unixTime: number): string {
    // Create a new Date object from the Unix time
    const date = new Date(unixTime);

    // Get hours and minutes from the Date object
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Return the time as a "hh:mm" string
    return `${hours}:${minutes}`;
}

function addMinutesToTime(time: string, minutesToAdd: number): string {
    // Convert the time string to Unix time (in milliseconds)
    const unixTime = timeStringToUnix(time);

    // Add the specified number of minutes (converted to milliseconds)
    const updatedUnixTime = unixTime + minutesToAdd * 60000;

    // Convert the updated Unix time back to a "hh:mm" string
    return unixToTimeString(updatedUnixTime);
}

// Example usage:
const time = "12:25";
const minutesToAdd = 45; // Change this value to any number of minutes you want to add

// const updatedTime = addMinutesToTime(time, minutesToAdd);
// console.log(`Updated Time: ${updatedTime}`); // Output will be in the "hh:mm" format


const url = `https://bahn-test-3687838850c6.herokuapp.com/`;
let statusElement = document.getElementById('status');
const updateStatus = (status: string) => {
    if(statusElement){
        statusElement.setAttribute('data-status', status);
        statusElement.innerHTML = status;
    }

}

const updateUI = (body: string) => {
    let json;
        try {
            json = JSON.parse(body);
            const result = document.querySelector('#result');
            const line = document.querySelector('#line');
            if(result && json && line){

                line.innerHTML = `
                <div class="d-inline-block">
                    <div class="hex-badge">
                        <span class="badge-number">${json.busLine}</span>
                    </div>
                </div>
                <div class="d-inline-block">
                 - ${json.route}
                </div>
                
                `;
                let rows = '';
                let  extraTime = 0;
                for(const item of json.stations) {

                    let status = 'full';
                    let i = 0;
                    let capacity: number = 0;
                    for(const seatTyoe in BUS_CAPACITY){
                        capacity += BUS_CAPACITY[seatTyoe];
                    }
                    console.log(capacity)
                    for(const passengerType in item.checkedPassengers){
                        i += item.checkedPassengers[passengerType];
                    }
                    const percentage = i / capacity * 100;
                    console.log('percentage')
                    console.log(percentage)
                    if(percentage > 90){
                        extraTime += 3;
                    } else if(percentage > 70){
                        extraTime += 2;
                    } else if(percentage > 50){
                        extraTime += 1;
                    }
                    if(item.checkedPassengers.wheelchair > 0){
                        extraTime += 2;
                    }
                    if(percentage >= 99){
                        status = 'full';
                    } else if(percentage >= 75){
                        status = 'high';
                    } else if(percentage >= 50){    
                        status = 'medium'
                    } else if(percentage >= 20){    
                        status = 'low'
                    } else {
                        status = 'none'
                    }
                    console.log(i)
                    // const allPassenger = item.checkedPassengers.map
                    let statusTDS = ``
                    switch(status){
                        case 'low':
                            statusTDS = `
                            <td class="low">&nbsp;</td>
                            <td class="low">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;
                            break;
                        case 'medium':
                            statusTDS = `
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="medium">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;
                            break;
                        case 'high':
                            statusTDS = `
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="high">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;
                            break;
                        case 'full':
                            statusTDS = `
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            <td class="full">&nbsp;</td>
                            `;
                            break;
                         
                        default:
                            statusTDS = `
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            <td class="none">&nbsp;</td>
                            `;

                    }
                    let additional = '';
                    if(extraTime > 0){
                        additional = `<span class="red">+ ${extraTime}</span>`;
                    } else {
                        additional = `<span class="green">- ${extraTime}</span>`;
                    }
                    rows += `<tr>
                    <td>
                        <img class="center" src="${prefix}/assets/haltestelle.svg" alt="haltestelle" width="20" height="20">
                    </td>
                    <td>${item.estimatedArrival}</td>
                    <td>${addMinutesToTime(item.estimatedArrival, extraTime)} ${additional}</td>
                    <td>${item.stationName}</td>
                    <td>
                        <img src="${prefix}/assets/elderly.svg" alt="elderly" width="20" height="20">
                        ${item.checkedPassengers.elderly}
                        <img src="${prefix}/assets/people.svg" alt="people" width="20" height="20">
                        ${item.checkedPassengers.normal}
                        <img src="${prefix}/assets/wheelchair.svg" alt="wheelchair" width="20" height="20">
                        <i class="bi bi-person-wheelchair"></i>
                        ${item.checkedPassengers.wheelchair}
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
                                            
                                            
                                            ${statusTDS}
                                            
                                            
                                        </tr>
                                    </tbody>    
                                </table>
                            </div>
                            
                            
                                
                            
                            
                        </td>
                    </tr>`;
                }
                console.log(json);
                result.innerHTML = `
                <table class="table table--timetablXe table-striped">
                <tbody>
                ${rows}
                </tbody>
                </tabl>
                
                `;
                updateStatus('ok');
                // if(statusElement) statusElement.innerHTML = 'ok';
            }
        } catch (error) {
            updateStatus('error');
            console.error('Error:', error);
            // if(statusElement) statusElement.innerHTML = 'error';
        }
}


const prefix = process.env.NODE_ENV === 'production' ? '/driver-dashboard' : '';
const options = {
//   method: 'GET',
//   headers: {
//     'DB-Client-Id': env.VITE_DB_CLIENT_ID, // Replace with your actual client ID
//     'DB-Api-Key': env.VITE_DB_SECRET, // Replace with your actual client secret
//     'Accept': 'application/xml'
//   }
};

      let fetchInterval: any;
      let countdownInterval: any;
      let countdown = count_interval_seconds; // Countdown starts from 5
      let fetchCount = 0; // Counter for the number of fetches
      
      function updateCounterDisplay() {
          const counterElement = document.getElementById('counter');
          if (counterElement) {
              counterElement.textContent = `Next update in: ${countdown} seconds | ${fetchCount}`;
          }
      }
      
      function fetchData() {
          console.log("Fetching data...");
          fetchCount++; // Increment the fetch count
          // Replace with your actual fetch request
          fetch(url)
              .then(response => response.json())
              .then(data => {
                  updateUI(JSON.stringify(data));
                  resetCountdown(); // Reset countdown after fetching
              })
              .catch(error => {
                  console.error('Error fetching data:', error)
                  updateStatus('error');
              } );
      }
      
      function startCountdown() {
        console.log('start countdown');

        
        fetchData();
          countdownInterval = setInterval(() => {
              countdown--;
              
              updateCounterDisplay();
      
              if (countdown <= 0) {
                  fetchData();
              }
          }, 1000); // Countdown updates every 1 second
      }
      
      function resetCountdown() {
          countdown = count_interval_seconds; // Reset countdown to 5 seconds
          updateCounterDisplay();
      }
      
      function stopFetching() {
          if (fetchInterval !== undefined) {
              clearInterval(fetchInterval);
          }
          if (countdownInterval !== undefined) {
              clearInterval(countdownInterval);
          }
          console.log("Stopped fetching and countdown.");
      }
      
      function startFetching() {
          resetCountdown(); // Initialize the countdown
          startCountdown(); // Start the countdown interval
      }
      
      updateStatus('loading');
      // Start fetching when the page is loaded
    //   if(statusElement) statusElement.innerHTML = '... loading';
      window.addEventListener('load', startFetching);
      
      // Stop fetching and countdown when the tab is closed or the page is unloaded
      window.addEventListener('beforeunload', stopFetching);
      
      // Optionally, stop fetching and countdown when the user navigates away from the tab
      document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
              stopFetching();
          } else if (document.visibilityState === 'visible') {
              startFetching();
          }
      });