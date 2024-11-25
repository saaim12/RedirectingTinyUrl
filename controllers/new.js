import fetch from 'node-fetch';

const fetching=async function fetchApiData(url,callback) {
   
        
       
  try {
    // Fetch the content of the long URL
    const response = await axios.get(long_url, { responseType: 'stream' });

    // Set headers and forward the response
    res.set(response.headers);
    response.data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching the long URL content' });
  }
      
}





export default fetching;