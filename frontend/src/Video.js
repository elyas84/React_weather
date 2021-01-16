import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import Footer from "./Footer";

const apiKey = "7035e0e156e9b01f5949d3601ed6ac03";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

let data = {};
let kelvinToCelsuis = (kelvin) => {
  // 281,75K − 273.15 = 8,6°C

  return Math.round(kelvin - 273.15);
};

export default function Video() {
  /*** Dynamic time controller */
 
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);
  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setTimeout(updateTime, 1000);

  const [search, setSerach] = useState("");
  const [wdr, setWdr] = useState("");

  const waehterApi = async (city) => {
    try {
      let res = await fetch(baseUrl + city + "&appid=" + apiKey);
      data = await res.json();
      setWdr(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    waehterApi(search);
    setSerach("");
  };

  return (
    <>
      <div className="video_container">
        <div className="videoBox">
          <video autoPlay muted loop id="myVideo">
            <source src="videos/water.mp4" type="video/mp4"></source>
          </video>
        </div>
        <div className="content">
          <>
            {typeof wdr.main != "undefined" ? (
              <>
                <Form className="py-5 form" onSubmit={submitHandler}>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder="check for wather"
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSerach(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Row>
                </Form>
                <h1 className="text-white city">
                  {wdr.name}, {wdr.sys.country}
                </h1>
                <h3 className="text-white väder">{wdr.weather[0].main}</h3>
                <h3 className="text-white temp ">
                  {kelvinToCelsuis(wdr.main.temp)} °C
                </h3>
                <h5 className="text-white time1">{currentTime}</h5>
              </>
            ) : (
              <>
                <Form className="py-5 form" onSubmit={submitHandler}>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder="check for wather"
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSerach(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Row>
                </Form>
                <h3 className="text-white time">{currentTime}</h3>
              </>
            )}
          </>
        </div>

        <Footer />
      </div>
    </>
  );
}
