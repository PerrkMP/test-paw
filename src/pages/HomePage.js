import React, { useState, useEffect } from "react";
import sendNotification, { showNotification } from "../service/notification";
import handleVibrate from "../service/vibrate";

const HomePage = () => {
  const [otp, setOTP] = useState();

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOTP(otp.code);
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.log(err);
        });
    }
  }, []);

  const handleNotification = () => {
    //from browser
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        sendNotification(
          "Test text",
          "Test Notification"
        );
      }
    });
    // from PWA
    showNotification("Test Notification");
  };

  return (
    <div className="App">
      <h2>Brazino PWA</h2>
      <button className="btn" onClick={handleNotification}>
        Send Custom notification (PWA)
      </button>
      <button disabled className="btn" onClick={handleVibrate}>
        Reading Otp ( only in chrome android )
      </button>
    </div>
  );
};

export default HomePage;
