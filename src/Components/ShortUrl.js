import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ShortUrl() {
  const Navigate = useNavigate();
  const para = window.location.pathname;

  console.log(para);

  //   console.log(window.location.pathname);

  let redirect = async () => {
    try {
      const res = await fetch(`${para}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);

      if (result.status === 401 || !result) {
        console.log(`page not found`);
        Navigate("*");
      } else {
        console.log("redirecting...");
        window.location.replace(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  redirect();

  return (
    <>

    </>
  );
}

export default ShortUrl;
