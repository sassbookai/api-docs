**Sassbook AI Summarizer API**
----
  The API enables developers to access similar functionality as that available
   with the [AI text summary generator web application](https://sassbook.com/ai-summarizer
   "AI summary generator supporting both extractive and abstractive summarization").
  [The text summarization API](https://sassbook.com/ai-text-summarizer-api
"Sassbook AI Text summarizer API is the most advanced API automatic text summarization.") provides a controllable interface to state-of-the-art text summarization for customers needing full automation of their workflows.
  
* **Endpoint**

  __`/api/ext/summarize/v1`__
  
  The base URL is https://sassbook.com.

* **Method:**
  
  
  __`POST`__
  
*  **Authorization required**  

  
   Yes
  
*  **Header**


  
    ```
    {
      Content-type: 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      Authorization: 'Bearer <API Key>'
    }
    ```

*  **URL Params**

    None


* **Data Params**

  
    All data posted to the endpoint should be in JSON format, utf-8 encoded.
    
    
    
    __`sumSrc=[string]`__
    
    Text to be summarized. Must be plain text,  utf-8 encoded.
    
    Must be empty if a hash value from a previous call is supplied. See **srcHash**.
    
    
    __`srcHash=[string]`__
    
    A hash value returned from a previously post. Must be empty if `sumSrc` is set.
    
    
    If you make multiple API calls with the same original text, but with different
    settings, it is more efficient to just use the hash for subsequent calls. You
    can also save computing costs if you wish to repeat a previous call. Note 
    that this is not guaranteed to work if the call is made much later.
    
    If the source text is unavailable, the call fails with error code 204.
    
    One or the other of `sumSrc` and `srcHash` is always required.
  
  
    __`method=[string]`__
        
    The summarization algorithm variant. Possible values are: `abstractive` and `extractive`.
    Could be shortened to `abs` and `ext` respectively. Default is `abstractive`.
    
    
    `target=[string]`
        
    The target size of summarization. This could be expressed in two ways:
    
    1. Simple, named, size measures. Supported values are: `small`, `best`, `verbose`
    2. Specific sizes in terms of the number of words expressed as a percentage 
    or actual number of words. Supported values are: `words`, `percent`.
    
    In (2), actual number of words or target percentage size of summary must be 
    specified separately in `targetWords` and `targetPercent` respectively.
    
    
    __`targetWords=[number]`__
        
    This is the desired number of words in the summary when the `target` is specified
    as `words`. Note that the actual number of words may differ considerably depending
    on the original text and method of summarization.
    
    __`targetPercent=[number]`__
        
    This is the desired size/length of summary when the `target` is specified
    as `percent`. Note that the actual length as a percentage of original text
    could differ considerably depending on the original text and method of summarization.

* **Success Response:**
  
  In general, usual HTTP status codes ae returned with their regular meaning. On success
  (status code 200), a JSON object such as below is returned:
  
    ```
    {
      summary: <computed summary text>,
      sumSrcHash: <hash of source text>,
      sumSrcWords: <number of words in source text>,
      sumSummaryWords: <number of words in summary text>,
      sumMessage: <an informational message from the API >,
      sumDbId: <an internal reference to the API call that can be used to analyze issues>
    }
    ```
    

  * **Code:** 204 <br />
    This happens when you supply a hash, but the API is unable to locate the original
    source text. You should check for this code and call again with the original text.
 
* **Error Response:**

  Any errors are also returned as objects, with a code and a message. The code is usually
  an HTTP status code. Such as:
  
  ```
  {
    code: 403,
    message: Authorization failed
  }
  ```
    
    Other possible error codes are 500, 502, and 429 among other common ones. 429 is encountered
    when a rate limit is exceeded. The message will have more details.


* **Sample Call:**

  The API can be called asynchronously. For example, in JavaScript, a promise is returned, which 
  can be awaited on and JSON data can be extracted from the response as usual.
  
  Here is a bash snippet illustrating the call, which you can easily translate into your favorite
  programming language.
  
  ```
    API_KEY="...."
    text="..."
    
    curl -i -X POST  -H "Content-Type: application/json; charset=UTF-8" \
    -H Accept: 'application/json; charset=UTF-8', \
    -H "Authorization: Bearer $API_KEY" \
    -d '{"sumSrc": "'"$text"'", "target": "words", "method": "abstractive", "targetPercent": 10, "targetWords": 80}' \
    https://sassbook.com/api/ext/summarize/v1
   
    ```
    Note: In the example above , although `targetPercent` is supplied, it will be ignored because
    `target` is specified as `words` and `targetWords` will be honored.
    
    The [samples](./samples) directory has minimal examples in JavaScript and Python (3).
    
  * **Notes:**

    1. The API currently favors summarization in the range of 5-40%, so internal adjustments are in place
    to limit larger values that cause summarization to lose its value.
    
    2. The actual length of summary is likely to be closer to specified for
    large documents.
    For small documents, the AI doesn't have much room, so the summary length
    can be quite different.
