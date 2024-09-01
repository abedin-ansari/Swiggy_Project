const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    console.error("No URL provided");
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch data: ${response.statusText}`);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(data);
    } else {
      const data = await response.text();
      res.setHeader("Content-Type", contentType || "text/plain");
      res.status(200).send(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const fetch = require("node-fetch");

// module.exports = async (req, res) => {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ error: "Missing URL parameter" });
//   }

//   // Handle CORS preflight requests
//   if (req.method === "OPTIONS") {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization"
//     );
//     return res.status(200).end();
//   }

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }

//     const data = await response.text(); // or response.json() if the response is JSON

//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization"
//     );
//     res.setHeader("Content-Type", response.headers.get("content-type"));

//     res.status(200).send(data);
//   } catch (error) {
//     // Return JSON error message
//     res
//       .status(500)
//       .json({ error: "Failed to fetch data", message: error.message });
//   }
// };
