
import sunrise from "../assets/sunrise.png"
import sunset from "../assets/sunset.png"
import { BsWind } from "react-icons/bs"
import { WiHumidity } from "react-icons/wi"
import { useEffect, useState } from "react"

const Location = ({ weather, pending }) => {

      const dateBuilder = (d) => {
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

            let day = days[d.getDay()]
            let date = d.getDate()
            let month = months[d.getMonth()]
            let year = d.getFullYear()

            return `${day} ${date} ${month} ${year}`
      }

      const msToTime = (ms, shift) => {

            var d = new Date(((ms + shift) * 1000));
            var hours = (d.getUTCHours() > 12) ? d.getUTCHours() - 12 : d.getUTCHours();
            var minutes = (d.getUTCMinutes() < 10) ? "0" + d.getUTCMinutes() : d.getUTCMinutes();
            var time = (d.getUTCHours() > 11) ? "PM" : "AM";
            return hours + ":" + minutes + " " + time
      }
      const [date_, setDate] = useState(new Date());
      const getTime = (shift) => {
            var date = (date_.getTime()) + (shift * 1000);
            var d = new Date(date);
            var hours = (d.getUTCHours() > 13) ? d.getUTCHours() - 12 : d.getUTCHours();
            var minutes = (d.getUTCMinutes() < 10) ? "0" + d.getUTCMinutes() : d.getUTCMinutes();
            var time = (d.getUTCHours() > 11) ? "PM" : "AM";
            return hours + ":" + minutes + " " + time
      }

      useEffect(() => {
            setInterval(() => {
                  setDate(new Date());
            }, 1000);
      }, [])


      return (
            <div className={(typeof weather.main != "undefined") ?
                  ((weather.main.temp > 10)
                        ? "uncool" : "cool") : "cool"}>

                  <div className="py-3">
                        {pending ? <p className="text-center fs-4 fw-bold">Loading...</p> :
                              (typeof weather.main != "undefined") ? (
                                    <div className="fw-bold">
                                          <div className="location mx-auto text-center">
                                                <h3 className="fw-bold">{weather.name}, {weather.sys.country}</h3>
                                          </div>

                                          <div className="date fst-italic fs-5 text-center">
                                                {dateBuilder(new Date())}
                                          </div>


                                          <div className="d-flex justify-content-between">

                                                <div className="text-center align-self-center">
                                                      <img src={sunrise} alt="" width="40%" />
                                                      <p>{msToTime(weather.sys.sunrise, weather.timezone)}</p>
                                                </div>

                                                <div className={(typeof weather.main != "undefined") ?
                                                      ((weather.main.temp > 10)
                                                            ? "temp bg-light px-5 py-3 rounded-3 my-4 mx-auto weather warm" : "temp bg-light px-5 py-3 rounded-3 my-4 mx-auto weather cold text-secondary") : "weather cold"}>
                                                      <div className="time">
                                                            <p className="fs-1 text-center fw-bold">
                                                                  <span className="fs-3 fw-normal">As of </span>{" " + getTime(weather.timezone)}
                                                            </p>
                                                      </div>
                                                      {Math.round(weather.main.temp)}°C
                                                      <span className="text-end">
                                                            <p className="fs-4 text-light">Feels Like: {Math.round(weather.main.feels_like)}°C</p>
                                                      </span>
                                                </div>

                                                <div className="text-center align-self-center">
                                                      <img src={sunset} alt="" width="40%" />
                                                      <p>{msToTime(weather.sys.sunset, weather.timezone)}</p>
                                                </div>

                                          </div>

                                          <div className="text-center d-flex justify-content-center">

                                                <div>
                                                      <p className="fs-1 text-center mb-0">
                                                            {weather.weather[0].main}
                                                      </p>



                                                      <p className="fs-5 text-white-50 text-center mt-0">
                                                            {weather.weather[0].description}
                                                      </p>

                                                </div>

                                                <div className="align-self-center ms-3">
                                                      <img src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"} alt="" width="120%" />
                                                </div>
                                          </div>

                                          <div className="text-center mt-5">
                                                <div className="fs-5 d-flex justify-content-evenly">
                                                      <div className="text-start"><WiHumidity size="30" /> Humidity : {weather.main.humidity}%</div>

                                                      <div className="text-end"><BsWind /> Wind : {Math.round(weather.wind.speed * 3.6) + " "}km/h</div>

                                                </div>
                                          </div>



                                    </div>
                              ) : ((typeof weather != undefined) ? (<div className="text-center fs-1">{weather.message} <br /> <span className="text-black-50 fs-3">Please try again</span></div>) : (""))}
                  </div>

            </div>
      );
}

export default Location;