// Use node-fetch to make the API call. Use your favorite package.
//
import fetch from 'node-fetch';

// Your API key. Ideally you would read it from the environment
const API_KEY = "U2FsdGVkX597begNYxDhUMVkX+mTRGoPi+xxym6qu2bSFmR+p4DZfv30Df9o5gt9EHXbdGi7SASW9t72BNa8nillWQtYvaKvuLzzyeG/mOe7n9eET4Gs0BHWDLIL15PCIiYXe+BWDz+Xgi5NNDt+MmGEeshHneoG44TKQb385RUMY";

// The Sassbook API end point for headline generation
const api_end_point = 'https://sassbook.com/api/ext/headline/v1';

// Text to generate headline for (UTF-8)
const inText = `Today there are a number of ways to setup your email server. Regardless of how, you will have to create an SSL certificate for the domain you plan to host your email on. And a common and convenient way of doing this, is through the instruction generator Certbot. A free and open-source (FOSS) tool created by the Electronic Frontier Foundation (EFF).

"Certbot is a free, open source software tool for automatically using Let’s Encrypt certificates on manually-administered websites to enable HTTPS. Certbot offers domain owners and website administrators a convenient way to move to HTTPS with easy-to-follow, interactive instructions based on your webserver and operating system." - EFF

One of my favourite features of Certbot has come from the convenience of automatically checking and renewing my certificates for all the websites I host. Without having to worry whether or not I should log on to my server and manually renew them. Allowing the ability to fetch my email's to read and reply with, from desktop or mobile. And not be told that my email server isn't trusted without an SSL certificate.

A problem I have found regarding the certificate renewals, however, comes from the way the IMAP server (Dovecot in my case) doesn't reload.`;

// Prepare JSON data to post
const postData = {
  hlSrc: inText,
  target: 'short',
  ingenuity: 'I20',
  numHeadlines: 10,
  seed: 1234,
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
    Headlines:
    ----------
    ${data.headlines}`);
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
