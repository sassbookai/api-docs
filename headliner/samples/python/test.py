# coding: utf8
# Requires python3
import requests
import json, sys

# Replace with your API key from Sassbook AI.
API_KEY="U2FsdGVkX597begNYxDhUMVkX+mTRGoPi+xxym6qu2bSFmR+p4DZfv30Df9o5gt9EHXbdGi7SASW9t72BNa8nillWQtYvaKvuLzzyeG/mOe7n9eET4Gs0BHWDLIL15PCIiYXe+BWDz+Xgi5NNDt+MmGEeshHneoG44TKQb385RUMY"

authHeaderVal = f"Bearer {API_KEY}"
endPoint='https://sassbook.com/api/ext/headline/v1'

# Text to summarize (UTF-8)
inText = """Today there are a number of ways to setup your email server. Regardless of how, you will
have to create an SSL certificate for the domain you plan to host your email on. And a common and
convenient way of doing this, is through the instruction generator Certbot. A free and open-source (FOSS)
tool created by the Electronic Frontier Foundation (EFF).

"Certbot is a free, open source software tool for automatically using Let’s Encrypt certificates on
manually-administered websites to enable HTTPS. Certbot offers domain owners and website administrators a convenient way to move to HTTPS with easy-to-follow, interactive instructions based on your webserver and operating system." - EFF

One of my favourite features of Certbot has come from the convenience of automatically checking and
renewing my certificates for all the websites I host. Without having to worry whether or not I should log
on to my server and manually renew them. Allowing the ability to fetch my email's to read and reply with, from desktop or mobile. And not be told that my email server isn't trusted without an SSL certificate.

A problem I have found regarding the certificate renewals, however, comes from the way the IMAP server
(Dovecot in my case) doesn't reload.""";

postHeaders = {'Content-type': 'application/json; charset=UTF-8',
    'Accept': 'application/json', 'Authorization': authHeaderVal }

payload = { 'hlSrc': inText, 'target': 'short', 'ingenuity': 'I20', 'numHeadlines': 10,  'seed': 12345 }

try:
    # Make the API call
    response = requests.post(endPoint,
        data=json.dumps(payload),
        headers=postHeaders,
        timeout=30,
        allow_redirects=True)

    print("API call completed: ", response.ok)
    # Check the status code etc...
    respJson = response.json()
    if respJson.get('code'): # API returned error JSON
        print(f"API returned error code: {respJson['code']}")
        print(f"Error message: {respJson['message']}")
    else: # API returned result JSON
        print('Headlines:')
        print('--------')
        print(respJson['headlines'])
        # Print and inspect other properties here...
except Exception as e:
    print(f"An exception occurred while calling the API: {str(e)}")

sys.exit(0)
