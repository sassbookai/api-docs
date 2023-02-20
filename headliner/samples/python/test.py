# coding: utf8
# Requires python3
import requests
import json, sys

# Replace with your API key from Sassbook AI.
API_KEY="U2FsdGVkX597begNYxDhUMVkX+mTRGoPi+xxym6qu2bSFmR+p4DZfv30Df9o5gt9EHXbdGi7SASW9t72BNa8nillWQtYvaKvuLzzyeG/mOe7n9eET4Gs0BHWDLIL15PCIiYXe+BWDz+Xgi5NNDt+MmGEeshHneoG44TKQb385RUMY"
authHeaderVal = f"Bearer {API_KEY}"
endPoint='https://sassbook.com/api/ext/headline/v1'

# Text to summarize (UTF-8)
inText = "The FDA must give authorization for the vaccines to be used in new ways outside the existing authorization. All three Covid-19 vaccines being used in the US are given under emergency use authorization by the FDA, but full approval is pending for Pfizer's vaccine. After FDA grants approval or authorization, the US Centers for Disease Control and Prevention then advises on whether to actually use a vaccine as authorized by the FDA.";

postHeaders = {'Content-type': 'application/json; charset=UTF-8',
    'Accept': 'application/json', 'Authorization': authHeaderVal }

payload = { 'hlSrc': inText, 'target': 'short', 'ingenuity': 'I20', numHeadlines: 10,  seed: 12345 }

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
