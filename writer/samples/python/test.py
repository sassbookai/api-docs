# coding: utf8
# Requires python3
import requests
import json
import sys

# Replace by your API key from Sassbook AI, usually read from the environment
API_KEY = "U2FsdGVkX597begNYxDhUMVkX+mTRGoPi+xxym6qu2bSFmR+p4DZfv30Df9o5gt9EHXbdGi7SASW9t72BNa8nillWQtYvaKvuLzzyeG/mOe7n9eET4Gs0BHWDLIL15PCIiYXe+BWDz+Xgi5NNDt+MmGEeshHneoG44TKQb385RUMY"
endPoint = "https://sassbook.com/api/ext/generate/v1"

# Text to summarize (UTF-8)
prompt = "The FDA must give authorization for the vaccines to be used in new ways outside the existing authorization."

postHeaders = {
    "Content-type": "application/json; charset=UTF-8",
    "Accept": "application/json; charset=UTF-8",
    "Authorization": f"Bearer {API_KEY}"
}

# Other API payload parameters. Can be omitted if default values are fine.
priorText = ""  # As promptText is supplied, this must be left out or empty
length = 90  # Defaults to 50, minimum 20, maximum capped at Premium plan limits
numGens = 3  # Desired number of candidate generations for this call
creativity = "var_low"  # Prefer more predictable, conservative, completions
metaCode = ""  # Encoded genMetaCode from the previous generation or empty
extraAnalytics = False  # Disable aggressive analytics behavior of the AI engine

payload = {
    "promptText": prompt,
    "priorText": priorText,
    "genLength": length,
    "numCandidates": numGens,
    "genCreativity": creativity,
    "priorCode": metaCode,
    "extraAnalytics": extraAnalytics,
}

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
    if respJson.get('code'):  # API returned error JSON
        print(f"API returned error code: {respJson['code']}")
        print(f"Error message: {respJson['message']}")
    else:  # API returned result JSON
        for idx, gen in enumerate(respJson.get("generations")):
            print(f"Candidate {idx+1}:")
            print('------------')
            print(gen + "\n")
        # Print and inspect other properties here...
        print(f"Call completed in {respJson.get('genTime')} secs.")
except Exception as e:
    print(f"An exception occurred while calling the API: {str(e)}")

sys.exit(0)
