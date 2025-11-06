
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetURL = req.query.target;

  if (!targetURL) {
    return res.status(400).json({ message: 'Error: "target" query parameter is missing.' });
  }

  try {
    const apiResponse = await fetch(targetURL);
    if (!apiResponse.ok) {
      throw new Error(`API server responded with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching from target API', error: error.message });
  }
};



