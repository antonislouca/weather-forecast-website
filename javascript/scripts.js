


function EmptyorSpaces(str) {
    return str.trim().length === 0 || str === null;
}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

function clear_current_weather() {
    //current weather clean
    elem = document.querySelector('#weather-img');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#temp-title');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#temp');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#temp-min');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#temp-max');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#pressure-val');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#humidity-val');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#wind-val');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#cloud-val');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#sunrise-val');
    elem.innerHTML = 'N.A.';
    elem = document.querySelector('#sunset-val');
    elem.innerHTML = 'N.A.';
}
function clear_forecast() {
    //weather forecast clean
    for (let index = 0; index < 8; index++) {
        elem = document.querySelector('#time-r' + index);
        elem.innerHTML = 'N.A.';

        elem = document.querySelector('#weather-img-r' + index);
        elem.innerHTML = 'N.A.';

        elem = document.querySelector('#temp-r' + index);
        elem.innerHTML = 'N.A.';

        elem = document.querySelector('#cloud-cover-r' + index);
        elem.innerHTML = 'N.A.';
    }
}

function clear_pollution() {
    for (let index = 0; index < 10; index++) {


        elem = document.querySelector('#DTc' + index);
        elem.innerHTML = 'N.A.';

        elem = document.querySelector('#AQc' + index);
        elem.innerHTML = 'N.A.';
        elem.setAttribute('style', get_color("0"));


        elem = document.querySelector('#COc' + index);
        elem.innerHTML = 'N.A.';
        elem.setAttribute('style', get_color("0"));

        elem = document.querySelector('#NOc' + index);
        elem.innerHTML = 'N.A.';
        elem.setAttribute('style', get_color("0"));

        elem = document.querySelector('#NO2c' + index);
        elem.innerHTML = 'N.A.';
        elem.setAttribute('style', get_color("0"));

        elem = document.querySelector('#O3c' + index);
        elem.innerHTML = 'N.A.';
        elem.setAttribute('style', get_color("0"));


        elem = document.querySelector('#SO2c' + index);
        elem.innerHTML = 'N.A.';
        elem.setAttribute('style', get_color("0"));


        elem = document.querySelector('#NH3c' + index);
        elem.innerHTML = 'N.A.';
        elem.setAttribute('style', get_color("0"));

    }
}

function reset_tabs() {
    document.getElementById('rnow').classList.add('active');
    document.getElementById('rnow').classList.add('show');
    document.getElementById('rnow-tab').classList.add('active');

    document.getElementById('twenty4').classList.remove('show');
    document.getElementById('twenty4').classList.remove('active');
    document.getElementById('twenty4-tab').classList.remove('active');

    document.getElementById('polution-section').classList.remove('show');
    document.getElementById('polution-section').classList.remove('active');
    document.getElementById('polution-tab').classList.remove('active');
}

function clearClicked(event) {

    // console.log("clear clicked");
    //clear all result are, text fields, reset temperature option to celcious
    //lear validations
    //remove weather map layers and map and hide results section
    let elem = document.querySelector('#results-container');
    elem.classList.add('d-none');
    form.classList.remove('was-validated');
    form.classList.add('needs-validation');

    unit = 'metric';
    temp_symbol = ' °C';
    pressure_symbol = ' hPa';
    windspeed_symbol = ' meters/sec';
    forecastJson = null;//!

    clear_current_weather();
    clear_forecast();
    clear_pollution();
    reset_tabs();
}


function logClicked(event) {

    // console.log("log clicked");


    log_listener.onreadystatechange = function () {
        // Only run if the request is complete
        if (log_listener.readyState !== 4)
            return;
        // Process our return data
        if (log_listener.status >= 200 && log_listener.status < 300) {
            fill_log_modal(log_listener.responseText);
        } else {
            console.log('error', log_listener);
        }
    };
    const username = 'alouka04';
    log_listener.open('GET', 'php_scripts/get_from_db.php?username=' + username);
    log_listener.send();
}

function fill_log_modal(log_DB_response) {
    // console.log("log response: \n", log_DB_response);

    let json_response = JSON.parse(log_DB_response);
    // console.log("json:", json_response);

    //initilaize everything to N.A.
    for (let i = 0; i < 5; i++) {
        let elem = document.querySelector('#log_r' + i + 'c0');
        elem.textContent = "N.A.";

        elem = document.querySelector('#log_r' + i + 'c1');
        elem.textContent = "N.A.";

        elem = document.querySelector('#log_r' + i + 'c2');
        elem.textContent = "N.A.";


        elem = document.querySelector('#log_r' + i + 'c3');
        elem.textContent = "N.A.";
    }

    //SET VALUES TO AS MANY CELLS AS WE CAN
    for (let i = 0; i < json_response.length; i++) {
        //in php return only 4 to see hwo to handle it
        let obj = json_response[i];

        let time = new Date(obj['timestamp'] * 1000);
        //add a zero if hours or minutes are not two digit
        let hours = ((time.getHours() < 10) ? '0' : '') + time.getHours()
        let minutes = ((time.getMinutes() < 10) ? '0' : '') + time.getMinutes();

        let elem = document.querySelector('#log_r' + i + 'c0');

        elem.textContent = ((time.getDate() < 10) ? '0' : '') + time.getDate() + " " + months[time.getMonth()]
            + " " + time.getUTCFullYear() + " " + hours + ":" + minutes;

        elem = document.querySelector('#log_r' + i + 'c1');
        elem.textContent = obj['address'];

        elem = document.querySelector('#log_r' + i + 'c2');
        elem.textContent = obj['region'];

        elem = document.querySelector('#log_r' + i + 'c3');
        elem.textContent = obj['city'];

    }
}

//@ function for submitting form
function submitClicked(event) {
    event.preventDefault();
    // console.log("submit clicked");

    const address = document.querySelector('#addressInput').value;
    const city = document.querySelector('#cityInput').value;
    const region = document.querySelector('#regionInput').value;

    //check form validation
    if (this.checkValidity() === true) {

        // if validations are correct
        //perform AJAX call to nominatim and extract lat and lon

        set_metric();
        console.log(address, region, city);

        reset_tabs();
        let query_str = 'https://nominatim.openstreetmap.org/search?q=' +
            address + "," + region + "," + city + "&format=json";
        // console.log(query_str);
        httpNom_request.open('GET', query_str);
        httpNom_request.send();

    } else {

        event.preventDefault();
        event.stopPropagation();
        this.classList.add('was-validated');
        this.classList.remove('needs-validation');
        return;
    }
}

function make_open_weathermap_requests(lat, lon) {

    //perform AJAX call for current weather 
    console.log("weather map request", lat, lon);


    let pol_query_str = "https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=" + lat +
        "&lon=" + lon + "&units=" + unit + "&appid=c7729db7d89276916d02fa2d7dbbac8b";

    // console.log("polution request", pol_query_str);

    http_air_pollution_forecast.open('GET', pol_query_str);
    http_air_pollution_forecast.send();

    let query_str = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat +
        "&lon=" + lon + "&units=" + unit + "&APPID=c7729db7d89276916d02fa2d7dbbac8b";

    // console.log("current weather", query_str);

    httpcurrent_weather.open('GET', query_str);
    httpcurrent_weather.send();

    //perform  AJAX call for forecast request
    query_str = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +
        "&lon=" + lon + "&units=" + unit + "&APPID=c7729db7d89276916d02fa2d7dbbac8b";

    // console.log("forecast request", query_str);

    http_24hour_forecast.open('GET', query_str);
    http_24hour_forecast.send();
}

function handle_nominatim_response(http_nom_obj) {
    // Only run if the request is complete
    if (http_nom_obj.readyState !== 4) return;
    // Process our return data
    if (http_nom_obj.status >= 200 && http_nom_obj.status < 300) {
        // What to do when the request is successful
        let json_obj = JSON.parse(http_nom_obj.responseText);
        if (json_obj.length === 0) {
            alert('No result for that location.');
            let elem = document.querySelector('#results-container');
            elem.classList.add('d-none'); //hide results 
            return;
        }


        // console.log(json_obj);
        //handle the response
        let lat = parseFloat(json_obj[0].lat);
        let lon = parseFloat(json_obj[0].lon);
        make_open_weathermap_requests(lat, lon);
        //if program reaches this point its considered a successful request. thus 
        //we add it to database
        post_to_DB();
        // let elem = document.querySelector('#results-container');
        // elem.classList.remove('d-none');
    } else {
        // What to do when the request has failed
        console.log('error', http_nom_obj);
    }
}

//this function will send the data to the DB
function post_to_DB() {
    const address = document.querySelector('#addressInput').value;
    const city = document.querySelector('#cityInput').value;
    const region = document.querySelector('#regionInput').value;

    // console.log("adding to DB:", address, region, city);

    http_post_todb.onreadystatechange = function () {
        if (http_post_todb.readyState !== 4) return;
        if (http_post_todb.status >= 200 && http_post_todb.status < 300) {
            console.log(http_post_todb.responseText);
        } else {
            console.log('error', http_post_todb);
        }
    };

    http_post_todb.open('POST', 'php_scripts/post_to_db.php');
    http_post_todb.setRequestHeader("Content-Type", "application/json");
    let data = {};
    data.username = "alouka04";
    data.address = address;
    data.region = region;
    data.city = city;
    console.log(data);
    http_post_todb.send(JSON.stringify(data));
}

function current_weather_extract_fill(current_weather_obj) {
    //extraction of data
    let description = current_weather_obj['weather'][0].description;
    let icon = current_weather_obj['weather'][0].icon;
    let temp = current_weather_obj['main'].temp;
    let pressure = current_weather_obj['main'].pressure;
    let humidity = current_weather_obj['main'].humidity;
    let temp_min = current_weather_obj['main'].temp_min;
    let temp_max = current_weather_obj['main'].temp_max;
    let speed = current_weather_obj['wind'].speed;
    let all = current_weather_obj['clouds'].all;
    let country = current_weather_obj['sys'].country;
    let sunrise = current_weather_obj['sys'].sunrise;
    let sunset = current_weather_obj['sys'].sunset;
    let name = clearClicked = current_weather_obj.name;
    // console.log(description, " ", icon, " ", temp, " ", pressure, " ", humidity, " "
    //     , " ", temp_min, " ", temp_max, " ", speed, " ", all, " ", country, " ", sunrise, " ",
    //     sunset, " ", name);

    //setting data to document
    let elem = document.querySelector('#weather-img');

    if (is_defined(icon, icon) === 'N.A.') { //IF ICON IS Undefined set standard picture
        elem.src = "images/default-image.png";
    } else {
        elem.src = "https://openweathermap.org/img/w/" + icon + ".png";
    }


    elem = document.querySelector('#temp-title');
    elem.textContent = is_defined(description, description) + " in " + is_defined(name, name);

    elem = document.querySelector('#temp');
    elem.textContent = is_defined(temp, (temp + temp_symbol));

    elem = document.querySelector('#temp-min');
    elem.textContent = is_defined(temp_min, ("L: " + temp_min + temp_symbol));

    elem = document.querySelector('#temp-max');
    elem.textContent = is_defined(temp_max, ("H: " + temp_max + temp_symbol));

    //body stats
    elem = document.querySelector('#pressure-val');
    elem.textContent = is_defined(pressure, (pressure + pressure_symbol));

    elem = document.querySelector('#humidity-val');
    elem.textContent = is_defined(humidity, (humidity + " %"));

    elem = document.querySelector('#wind-val');
    elem.textContent = is_defined(speed, (speed + windspeed_symbol));

    elem = document.querySelector('#cloud-val');
    elem.textContent = is_defined(all, (all + " %"));

    let date = new Date(sunrise * 1000);
    elem = document.querySelector('#sunrise-val');

    //add a zero if hours or minutes are not two digit
    elem.textContent = is_defined(sunrise,
        (
            ((date.getHours() < 10) ? '0' : '') + date.getHours() + ":" +
            ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
        )
    );

    date = new Date(sunset * 1000);
    elem = document.querySelector('#sunset-val');

    //add a zero if hours or minutes are not two digit
    elem.textContent = is_defined(sunset,
        (
            ((date.getHours() < 10) ? '0' : '') + date.getHours() +
            ":" + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
        )
    );
}

function add_map(current_weather_obj) {
    let elem = document.querySelector('#map');
    if (elem.childNodes.length !== 0) { //content is not empty, we empty the map
        elem.innerHTML = '';
    }

    let lon = current_weather_obj['coord'].lon;
    let lat = current_weather_obj['coord'].lat;
    // console.log("map", lat, lon);

    let map = new ol.Map({ // a map object is created
        target: 'map', // the id of the div in html to contain the map
        layers: [ // list of layers available in the map
            new ol.layer.Tile({ // first and only layer is the OpenStreetMap tiled layer
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({ // view allows to specify center, resolution, rotation of the map
            center: ol.proj.fromLonLat([lon, lat]), // center of the map
            zoom: 5 // zoom level (0 = zoomed out)
        })
    });

    //add precipitation layer
    map.addLayer(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://tile.openweathermap.org/map/' + 'precipitation_new' + '/{z}/{x}/{y}' + '.png?appid=c7729db7d89276916d02fa2d7dbbac8b',
        })
    }));

    //add temperature layer
    map.addLayer(new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://tile.openweathermap.org/map/' + 'temp_new' + '/{z}/{x}/{y}' + '.png?appid=c7729db7d89276916d02fa2d7dbbac8b',
        })
    }));
    map.updateSize();
}

function is_defined(variable, output) {
    if (variable === undefined) {
        return 'N.A.';
    } else {
        return output;
    }
}

function handle_polution_response(http_polution_forecast_obj) {
    // Only run if the request is complete
    if (http_polution_forecast_obj.readyState !== 4) return;
    // Process our return data
    if (http_polution_forecast_obj.status >= 200 && http_polution_forecast_obj.status < 300) {
        // What to do when the request is successful

        let json_obj = JSON.parse(http_polution_forecast_obj.responseText);
        // console.log("pollution", json_obj);
        //handle the response
        polution_extract_fill(json_obj);
    } else {
        // What to do when the request has failed
        console.log('error', http_polution_forecast_obj);
    }
}

function polution_extract_fill(pol_json) {
    let list = pol_json['list'];
    let index_time = 0;
    for (let index = 0; index < 10; index++) {
        let dt = list[index_time].dt;
        let aqi = list[index_time]['main'].aqi;
        let co = list[index_time]['components'].co;
        let no = list[index_time]['components'].no;
        let no2 = list[index_time]['components'].no2;
        let o3 = list[index_time]['components'].o3;
        let so2 = list[index_time]['components'].so2;
        let nh3 = list[index_time]['components'].nh3;

        let time = new Date(dt * 1000);
        let hours = ((time.getHours() < 10) ? '0' : '') + time.getHours()
        let minutes = ((time.getMinutes() < 10) ? '0' : '') + time.getMinutes();

        let cell_color = get_color(aqi);

        elem = document.querySelector('#DTc' + index);
        elem.textContent = is_defined(dt, formatDate(time) + " at " + hours + ":" + minutes);
        elem.setAttribute('style', cell_color);

        elem = document.querySelector('#AQc' + index);
        elem.textContent = get_airquality(aqi);
        elem.setAttribute('style', cell_color);


        elem = document.querySelector('#COc' + index);
        elem.textContent = is_defined(co, (co + " μg/m3"));
        elem.setAttribute('style', cell_color);

        elem = document.querySelector('#NOc' + index);
        elem.textContent = is_defined(no, (no + " μg/m3"));
        elem.setAttribute('style', cell_color);

        elem = document.querySelector('#NO2c' + index);
        elem.textContent = is_defined(no2, (no2 + " μg/m3"));

        elem.setAttribute('style', cell_color);

        elem = document.querySelector('#O3c' + index);
        elem.textContent = is_defined(o3, (o3 + " μg/m3"));
        elem.setAttribute('style', cell_color);

        elem = document.querySelector('#SO2c' + index);
        elem.textContent = is_defined(so2, (so2 + " μg/m3"));
        elem.setAttribute('style', cell_color);

        elem = document.querySelector('#NH3c' + index);
        elem.textContent = is_defined(nh3, (nh3 + " μg/m3"));
        elem.setAttribute('style', cell_color);
        index_time += 2;
    }
}

function get_color(aqi) {
    switch (parseInt(aqi)) {
        case 1:
            return "color: #87bc45;";
            break;
        case 2:
            return "color: #acb334;";
            break;
        case 3:
            return "color: #fab733;";
            break;
        case 4:
            return "color: #ff8e15;";
            break;
        case 5:
            return "color: #ff0d0d;";
            break;
        default:
            return "color: black;";
    }
}

function get_airquality(aqi) {
    switch (parseInt(aqi)) {
        case 1:
            return "Good";
            break;
        case 2:
            return "Fair";
            break;
        case 3:
            return "Moderate";
            break;
        case 4:
            return "Poor";
            break;
        case 5:
            return "Very Poor";
            break;
        default:
            return "N.A.";
    }
}

function handle_current_weather_response(http_current_weather_obj) {
    // Only run if the request is complete
    if (http_current_weather_obj.readyState !== 4) return;
    // Process our return data
    if (http_current_weather_obj.status >= 200 && http_current_weather_obj.status < 300) {
        // What to do when the request is successful

        let json_obj = JSON.parse(http_current_weather_obj.responseText);
        // console.log(json_obj);
        //handle the response
        current_weather_extract_fill(json_obj);
        let elem = document.querySelector('#results-container');
        elem.classList.remove('d-none');
        add_map(json_obj);
    } else {
        // What to do when the request has failed
        console.log('error', http_current_weather_obj);
    }
}

function forecast_extract_fill(twenty4hour_forecast_obj) {
    for (let index = 0; index < 8; index++) {
        //extract data 
        let dt = twenty4hour_forecast_obj['list'][index].dt;
        let temp = twenty4hour_forecast_obj['list'][index]['main'].temp;
        let pressure = twenty4hour_forecast_obj['list'][index]['main'].pressure;
        let humidity = twenty4hour_forecast_obj['list'][index]['main'].humidity;
        let main = twenty4hour_forecast_obj['list'][index]['weather'][0].main;
        let description = twenty4hour_forecast_obj['list'][index]['weather'][0].description;
        let icon = twenty4hour_forecast_obj['list'][index]['weather'][0].icon;
        let all = twenty4hour_forecast_obj['list'][index]['clouds'].all;
        let speed = twenty4hour_forecast_obj['list'][index]['wind'].speed;
        let name = twenty4hour_forecast_obj['city'].name;

        // console.log(dt, " ", temp, " ", pressure, " ", humidity, " ", main, " ", description,
        //     " ", icon, " ", all, " ", speed, " ", name);

        //fill html sections with data
        let elem = document.querySelector('#time-r' + index);
        let time = new Date(dt * 1000);
        //add a zero if hours or minutes are not two digit
        elem.textContent = is_defined(dt,
            (
                ((time.getHours() < 10) ? '0' : '') + time.getHours() +
                ":" + ((time.getMinutes() < 10) ? '0' : '') + time.getMinutes()
            )
        );

        elem = document.querySelector('#weather-img-r' + index);
        if (is_defined(icon, icon) === 'N.A.') { //if icon undefined set to default image else use icon image
            elem.src = "images/default-image.png";
        } else {
            elem.src = "https://openweathermap.org/img/w/" + icon + ".png";
        }


        elem = document.querySelector('#temp-r' + index);
        elem.textContent = is_defined(temp, (temp + temp_symbol));

        elem = document.querySelector('#cloud-cover-r' + index);
        elem.textContent = is_defined(all, (all + " %"));
    }
}



function handle_forecast_response(http_24hour_forecast_obj) {
    // Only run if the request is complete
    if (http_24hour_forecast_obj.readyState !== 4) return;
    // Process our return data
    if (http_24hour_forecast_obj.status >= 200 && http_24hour_forecast_obj.status < 300) {
        // What to do when the request is successful
        forecastJson = JSON.parse(http_24hour_forecast_obj.responseText);
        // console.log(forecastJson);
        //handle the response
        forecast_extract_fill(forecastJson);
    } else {
        // What to do when the request has failed
        console.log('error', http_24hour_forecast_obj);
    }
}

function fill_modal(event) {
    let twenty4hour_forecast_obj = JSON.parse(http_24hour_forecast.responseText);
    //console.log(this.id);
    let index = parseInt(this.id.charAt(this.id.length - 1));

    //console.log(this.id, index);

    let dt = twenty4hour_forecast_obj['list'][index].dt;
    let pressure = twenty4hour_forecast_obj['list'][index]['main'].pressure;
    let humidity = twenty4hour_forecast_obj['list'][index]['main'].humidity;
    let main = twenty4hour_forecast_obj['list'][index]['weather'][0].main;
    let description = twenty4hour_forecast_obj['list'][index]['weather'][0].description;
    let icon = twenty4hour_forecast_obj['list'][index]['weather'][0].icon;
    let speed = twenty4hour_forecast_obj['list'][index]['wind'].speed;
    let name = twenty4hour_forecast_obj['city'].name;

    let time = new Date(dt * 1000);
    //add a zero if hours or minutes are not two digit
    let hours = ((time.getHours() < 10) ? '0' : '') + time.getHours()
    let minutes = ((time.getMinutes() < 10) ? '0' : '') + time.getMinutes();
    let elem = document.querySelector('#twenty-hours-title-r0');

    elem.textContent = is_defined(dt,
        (
            "Weather in " + name + " on " +
            ((time.getDate() < 10) ? '0' : '') + time.getDate() + " " + months[time.getMonth()] + " " +
            time.getUTCFullYear() + " " + hours + ":" + minutes
        )
    );

    elem = document.querySelector('#modal-img-r0');

    if (is_defined(icon, icon) === 'N.A.') { //if icon undefined set to default image else use icon image
        elem.src = "images/default-image.png";
    } else {
        elem.src = "https://openweathermap.org/img/w/" + icon + ".png";
    }


    elem = document.querySelector('#status-r0');
    elem.textContent = is_defined(main, main) + " (" + is_defined(description, description) + ")";

    elem = document.querySelector('#h-value-vmodal-r0');
    elem.textContent = is_defined(humidity, (humidity + " %"));

    elem = document.querySelector('#p-value-vmodal-r0');
    elem.textContent = is_defined(pressure, (pressure + pressure_symbol));

    elem = document.querySelector('#w-value-vmodal-r0');
    elem.textContent = is_defined(speed, (speed + windspeed_symbol));
}

function set_metric() {
    unit = '';
    temp_symbol = '';
    pressure_symbol = '';
    windspeed_symbol = '';
    if (document.querySelector('#radiofa').checked) {
        unit = 'imperial';
        temp_symbol = ' °F';
        pressure_symbol = ' Mb';
        windspeed_symbol = ' miles/hour';
    } else {
        unit = 'metric';
        temp_symbol = ' °C';
        pressure_symbol = ' hPa';
        windspeed_symbol = ' meters/sec';
    }

}



//@MAIN SECTION
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//@http AJAX variables
const httpNom_request = new XMLHttpRequest();
const httpcurrent_weather = new XMLHttpRequest();
const http_24hour_forecast = new XMLHttpRequest();
const http_post_todb = new XMLHttpRequest();
const log_listener = new XMLHttpRequest(); //set up log listener
const http_air_pollution_forecast = new XMLHttpRequest();


let unit = '';
let temp_symbol = '';
let pressure_symbol = '';
let windspeed_symbol = '';
let forecastJson = null;//!

//@listeners
//ADD SUBMIT listener
let form = document.getElementById('inputform');
form.addEventListener("submit", submitClicked);

//add log listener
let log_btn = document.getElementById('log-btn');
log_btn.addEventListener("click", logClicked);

//add reset listener
let reset_btn = document.getElementById('clear-btn');
reset_btn.addEventListener("click", clearClicked);

//add btnviewr0 listener
let btnviewr0 = document.getElementById('btn-view-r0');
btnviewr0.addEventListener("click", fill_modal);
//add btnviewr1 listener
let btnviewr1 = document.getElementById('btn-view-r1');
btnviewr1.addEventListener("click", fill_modal);
//add btnviewr2 listener
let btnviewr2 = document.getElementById('btn-view-r2');
btnviewr2.addEventListener("click", fill_modal);
//add btnviewr3 listener
let btnviewr3 = document.getElementById('btn-view-r3');
btnviewr3.addEventListener("click", fill_modal);
//add btnviewr4 listener
let btnviewr4 = document.getElementById('btn-view-r4');
btnviewr4.addEventListener("click", fill_modal);
//add btnviewr5 listener
let btnviewr5 = document.getElementById('btn-view-r5');
btnviewr5.addEventListener("click", fill_modal);
//add btnviewr6 listener
let btnviewr6 = document.getElementById('btn-view-r6');
btnviewr6.addEventListener("click", fill_modal);
//add btnviewr7 listener
let btnviewr7 = document.getElementById('btn-view-r7');
btnviewr7.addEventListener("click", fill_modal);

//@ response event handlers
httpNom_request.onreadystatechange = function () { handle_nominatim_response(this); }
httpcurrent_weather.onreadystatechange = function () { handle_current_weather_response(this); }
http_24hour_forecast.onreadystatechange = function () { handle_forecast_response(this); }
http_air_pollution_forecast.onreadystatechange = function () { handle_polution_response(this); }
