// Use node-fetch to make the API call. Use your favorite package.
//
const fetch = require('node-fetch');

// Your API key. Ideally you would read it from the environment
const API_KEY = "U2FsdGVkX597begNYxDhUMVkX+mTRGoPi+xxym6qu2bSFmR+p4DZfv30Df9o5gt9EHXbdGi7SASW9t72BNa8nillWQtYvaKvuLzzyeG/mOe7n9eET4Gs0BHWDLIL15PCIiYXe+BWDz+Xgi5NNDt+MmGEeshHneoG44TKQb385RUMY";

// The Sassbook API end point for summarization
const api_end_point = 'https://sassbook.com/api/ext/summarize/v1';

// Text to summarize (UTF-8)
const inText = "The FDA must give authorization for the vaccines to be used in new ways outside the existing authorization. All three Covid-19 vaccines being used in the US are given under emergency use authorization by the FDA, but full approval is pending for Pfizer's vaccine. After FDA grants approval or authorization, the US Centers for Disease Control and Prevention then advises on whether to actually use a vaccine as authorized by the FDA.";

// Prepare JSON data to post
const postData = {
  sumSrc: inText,
  target: 'small',
  method: 'extractive',


};


// Make the API call
fetch(api_end_point, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': `Bearer ${API_KEY}`,
  },
  redirect: 'follow',
  body: JSON.stringify(postData),
}).then(response => {
  console.log(`API call succeeded: ${response.ok}`);
  return response.json();
}).then(data => {
  //console.log('API response data:', data);
  if (!data.code) {
    console.log(`
    Summary:
    ----------
    ${data.summary}`);
  }
  else {
    // Handle error code, especially 204 when using hash
    // ...
    console.log(`API returned error: Code: ${data.code}`);
    console.log(`Message: ${data.message}`);
  }
})
  .catch((error) => {
    // Exception thrown during API call
    console.error('Error:', error);
  });
