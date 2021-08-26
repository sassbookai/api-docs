// Use node-fetch to make the API call. Use your favorite package.
//
const fetch = require('node-fetch');

// Your API key. Ideally you would read it from the environment.
const API_KEY = "U2FsdGVkX597begNYxDhUMVkX+mTRGoPi+xxym6qu2bSFmR+p4DZfv30Df9o5gt9EHXbdGi7SASW9t72BNa8nillWQtYvaKvuLzzyeG/mOe7n9eET4Gs0BHWDLIL15PCIiYXe+BWDz+Xgi5NNDt+MmGEeshHneoG44TKQb385RUMY";

// The Sassbook API end point for text generation
const api_end_point = 'https://sassbook.com/api/ext/generate/v1';

// Prompt text to generate completion for (UTF-8)
const prompt = "The FDA must give authorization for the vaccines to be used in new ways outside the existing authorization.";

// Other API payload parameters. Can be omitted if default values are fine.
const priorText = ""; // As promptText is supplied, this must be left out or empty
const length = 90; // Defaults to 50, minimum 20, maximum capped at Premium plan limits
const numGens = 3; // Desired number of candidate generations for this call
const creativity = "var_high"; // Prefer more predictable, conservative, completions
const metaCode = ""; // Encoded genMetaCode from the previous generation or empty
const extraAnalytics = false; // Disable aggressive analytics behavior of the AI engine

// Prepare JSON data to post
const postData = {
  promptText: prompt,
  priorText: priorText,
  genLength: length,
  numCandidates: numGens,
  genCreativity: creativity,
  priorCode: metaCode,
  extraAnalytics: extraAnalytics,
  seed: 34028,
};


// Make the API call
fetch(api_end_point, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Accept": "application/json; charset=UTF-8",
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
    data.generations.forEach((element, index) => {
      console.log(`
      Candidate ${index + 1}:
      ------------
      ${element}
      
      `);
    });
    console.log(`Call completed in ${data.genTime} secs.`)
  }
  else {
    // Inspect any errors and correct client-side errors
    // ...
    console.log(`API returned error: Code: ${data.code}`);
    console.log(`Message: ${data.message}`);
  }
})
  .catch((error) => {
    // Exception thrown during API call
    console.error(`Error: ${error}`);
  });
