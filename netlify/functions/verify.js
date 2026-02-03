const axios = require('axios'); // You may need to add axios to your package.json or use fetch

exports.handler = async (event, context) => {
  const key = event.queryStringParameters.key;
  
  // Your EXISTING license server URL
  const EXISTING_SERVER_URL = "https://v61.netlify.app/.netlify/functions/verify";

  try {
    // 1. Ask your OLD server if the key is valid
    const response = await axios.get(`${EXISTING_SERVER_URL}?key=${key}`);
    const data = response.data;

    if (data && data.valid === true) {
      // 2. Key is VALID! Now we attach the "Ghost Math" security keys
      return {
        statusCode: 200,
        body: JSON.stringify({
          valid: true,
          // Attach the "Secret Sauce" math that only this server knows
          config: [0.7, 1.2, 0.39, 0.9, 1.1, 0.6, 1.3, 0.8],
          reconstruct: [-0.950, -0.150, 0.5, -0.25, 0.0, -0.015, -0.15],
          tonemap: 1,
          tonemap_mode: 1,
          message: "License verified via Legacy System. Spectral Calibration Synchronized."
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
    } else {
      // 3. Old server says INVALID
      return {
        statusCode: 200,
        body: JSON.stringify({
          valid: false,
          message: "Invalid license key (Rejected by Legacy System)."
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
    }
  } catch (error) {
    // Error connecting to old server
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not connect to Legacy License System." }),
      headers: { "Access-Control-Allow-Origin": "*" }
    };
  }
};
