exports.handler = async (event, context) => {
  const key = event.queryStringParameters.key;

  // List of valid license keys (You can move this to a database later)
  const validKeys = ["DREAM-DEMO-2026", "DREAM-PREMIUM-XYZ", "ADMIN-DREAM-99"];

  if (validKeys.includes(key)) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        // The "Secret Sauce" - Missing math for the filter
        config: [0.7, 1.2, 0.39, 0.9, 1.1, 0.6, 1.3, 0.8],
        // The professional Uchimura tonemapping constants
        reconstruct: [-0.950, -0.150, 0.5, -0.25, 0.0, -0.015, -0.15],
        tonemap: 1,
        tonemap_mode: 1,
        message: "License verified. Spectral Calibration Synchronized."
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  } else {
    return {
      statusCode: 200, // Still return 200 so the script can parse the 'valid: false'
      body: JSON.stringify({
        valid: false,
        message: "Invalid license key."
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
};
