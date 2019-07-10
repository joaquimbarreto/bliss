import React, { useState, useEffect } from "react";

const shareAPI =
  "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/share";

const Share = () => {
  const [sharing, setSharing] = useState(false);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleClick = () => {
    setSharing(!sharing);
  };

  const handleSubmit = () => {
    fetch(shareAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        destination_email: email,
        content_url: url
      })
    });
  };

  const handleChange = event => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <button onClick={handleClick}>Share</button>
      {sharing && (
        <form action="" method="get" onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Your Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-example">
            <input type="submit" value="Send!" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Share;
