console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMsg = document.querySelector('#error');
const forecast_current_loc = document.querySelector('#forecast_current_loc');
// const forecast_current_icon = document.querySelector('#forecast_current_icon');
const forecast_current_temp = document.querySelector('#forecast_current_temp');
const forecast_current_range = document.querySelector('#forecast_current_range');
const forecast_current_summary = document.querySelector('#forecast_current_summary');
const forecast_current_precipIntensity = document.querySelector('#forecast_current_precipIntensity');
const forecast_current_dewPoint = document.querySelector('#forecast_current_dewPoint');
const forecast_current_humidity = document.querySelector('#forecast_current_humidity');
const forecast_current_pressure = document.querySelector('#forecast_current_pressure');
const forecast_current_windSpeed = document.querySelector('#forecast_current_windSpeed');
const forecast_current_windGust = document.querySelector('#forecast_current_windGust');
const forecast_current_uvIndex = document.querySelector('#forecast_current_uvIndex');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    errorMsg.textContent = 'Loading...';
    forecast_current_loc.textContent = '';
    // forecast_current_icon.textContent = '';
    forecast_current_temp.textContent = '';
    forecast_current_range.textContent = '';
    forecast_current_summary.textContent = '';
    forecast_current_precipIntensity.textContent = '';
    forecast_current_dewPoint.textContent = '';
    forecast_current_humidity.textContent = '';
    forecast_current_pressure.textContent = '';
    forecast_current_windSpeed.textContent = '';
    forecast_current_windGust.textContent = '';
    forecast_current_uvIndex.textContent = '';
    fetch('/api?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                errorMsg.textContent = data.error
            }else {
                console.log(data);
                errorMsg.textContent = '';

                forecast_current_loc.textContent = data.location;
                // forecast_current_icon.textContent = data.forecastData.icon;
                forecast_current_temp.textContent = Math.round(data.forecastData.temperature) + '°';
                forecast_current_range.textContent = Math.round(data.forecastData.temperatureHigh) +
                                                    '° High/Low: ' +
                                                    Math.round(data.forecastData.temperatureLow) +
                                                    '°';
                forecast_current_summary.textContent = data.forecastData.today.summary;
                forecast_current_precipIntensity.textContent = 'Chance of rain: ' + data.forecastData.precipProbability + '%';
                forecast_current_dewPoint.textContent = 'DewPoint: ' + Math.round(data.forecastData.dewPoint)+ '°';
                forecast_current_humidity.textContent = 'Humidity: ' + data.forecastData.humidity + '%';
                forecast_current_pressure.textContent = 'Pressure: ' + data.forecastData.pressure;
                forecast_current_windSpeed.textContent = 'Windspeed: ' + data.forecastData.windSpeed + ' MPH';
                forecast_current_windGust.textContent = 'Wind Gust: ' + data.forecastData.windGust  + ' MPH';
                forecast_current_uvIndex.textContent = 'UV Index: ' + data.forecastData.uvIndex;
            }
        });
    });
});

(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 70)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
