import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi"

const Header = ({ api, query, weather, pending }) => {

      const [searched, SetSearched] = useState("")

      useEffect(() => {

            const interval = setInterval(() => {
                  fetch(`${api.base}weather?q=${query[0]}&units=metric&APPID=${api.key}`)
                        .then(res => {
                              if (res.status === 404) throw new Error("City Not Found")
                              return res.json()
                        })
                        .then(result => {
                              weather[1](result);
                              pending[1](false);
                        })
                        .catch(err => {
                              weather[1](err);
                        })
            }, 5000);

            return () => {
                  pending[1](true)
                  clearInterval(interval)
            }
      }, [query[0]])

      const handleSubmit = (e) => {
            e.preventDefault()
            query[1](searched)
            SetSearched("")
      }

      return (
            <div className="mt-3 mb-1">

                  <div className="text-white-50 text-center">
                        <h1 className="">Weather <span className="text-light fw-bolder">Forecast</span></h1>

                        <form className="" onSubmit={handleSubmit}>
                              <input type="text" placeholder="Enter a city..." className="search-bar rounded-pill shadow p-3 mb-5 bg-dark rounded text-white p-3 w-50" onChange={e => SetSearched(e.target.value)} value={searched} />
                              <button className="btn btn-body" type="button">
                                    <BiSearchAlt size="50" color="grey" />
                              </button>
                        </form>

                  </div>

            </div>

      );
}

export default Header;