import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const [shortUrl, setShortUrl] = useState("");

  const [longurl, setLongurl] = useState("");

  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const Navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://url-shortner-backend-vrcq.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 401 || !data) {
      Navigate("*");
    } else {
      console.log("user verify");
      setLoginData(data);
      Navigate("/dashboard");
    }
  };

  let handleChange = (event) => {
    setLongurl(event.target.value);
  };

  let shrink = async () => {
    const res = await fetch("https://url-shortner-backend-vrcq.onrender.com/shortUrls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longurl,
      }),
    });
    const result = await res.json();
    console.log(result);
  };

  let geturls = async () => {
    try {
      const res = await fetch(`https://url-shortner-backend-vrcq.onrender.com/geturls`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);

      if (result.status === 401 || !result) {
        console.log(`data not found`);
      } else {
        setShortUrl(result.shortUrls);
        console.log(shortUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    setTimeout(() => {
      DashboardValid();

      setData(true);
    }, 1000);
  }, []);
  geturls();

  return (
    <>
      {data ? (
        <div className="container">
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="./profile.png"
              style={{ width: "50px", marginTop: 20 }}
              alt=""
            />
            <h4>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h4>
          </div> */}

          <h1 className="margin-top">URL Shrinker</h1>
          <form className="my-4 form-inline">
            <label for="fullUrl" className="sr-only">
              Url
            </label>
            <input
              required
              placeholder="Please paste your Url here..."
              type="url"
              name="fullUrl"
              id="fullUrl"
              className="form-control col mr-2"
              value={longurl}
              onChange={handleChange}
            ></input>
            <button className="btn btn-success" onClick={shrink}>
              Shrink
            </button>
          </form>
          <div className="fullwidth">
          <table className="table table-hover table-striped table-responsive w-100 col">
            <thead>
              <tr>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {shortUrl.map((url, index) => (
                <tr>
                  <td>
                  
                    <a href={url.full}>{url.full}</a>
                  </td>
                  <td>
                  
                    <a href={url.short}>{url.short}</a>
                  </td>
                  <td>{url.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default Dashboard;
