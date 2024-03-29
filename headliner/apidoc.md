**Sassbook AI Headline Generator API**
----
  The title generator API enables developers to access similar functionality as that available
   with the [AI title generator web application](https://sassbook.com/ai-headline-generator
   "AI headline generator for automatic title, headline, or tagline generation with AI").
  [The headline generation API](https://sassbook.com/ai-headline-generator-api
"Sassbook AI Headline Generator API is the most advanced API for automatic headline generation.") provides
a controllable interface to state-of-the-art title generation for customers needing
full automation of their workflows.
  
* **Endpoint**

  __`/api/ext/headline/v1`__
  
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
    
    
    
    __`hlSrc=[string]`__
    
    Text for which headline needs to be generated. Must be plain text, utf-8 encoded.
    
    Must be empty if a hash value from a previous call is supplied. See **srcHash**.
    
    _The number of words in `hlSrc` must not exceed 800. See notes at the bottom of this page for more details._
        
    __`srcHash=[string]`__
    
    A hash value returned from a previously post. Must be empty if `hlSrc` is set.
    
    If you make multiple API calls with the same original text, but with different
    settings, it is more efficient to just use the hash for subsequent calls. You
    can also save computing costs if you wish to repeat a previous call. Note 
    that this is not guaranteed to work if the call is made much later.
    
    If the source text is unavailable, the call fails with error code 204.
    
    One or the other of `hlSrc` and `srcHash` is always required.
  
  
    __`ingenuity=[string]`__
        
    The desired ingenuity or creativity level of generated headlines. Possible values are: `I10, I20, I30, or I40`.
    The smaller the suffix number, the more conservative the headline is. At the highest `ingenuity` setting,
    the generation is most adventurous.
    
    The default is `I20` if no value is specified.
    
    
    __`target=[string]`__
        
    The target length of generated headlines. Four 'named' length values are currently supported. Note that
    this is a suggestion and not all generated headlines will necessarily honor the length.
    
    From shortest to longest, they are:
    
    `xshort`, `short`, `medium`, `long`, `xlong`
    
    The default is `short` if no value is specified.
        
    __`numHeadlines=[number]`__
        
    This is the desired number of headlines to be generated for this call. Supported values are in the range
    1-10. Default is 2.
    
    __`seed=[number]`__
        
    A number between 1 and 1000,000. For different values of this number, a different set of headlines
    is generally delivered. This is another way to get a diverse set of headlines for the same text.
    
    Default is randomly generated by the API.

* **Success Response:**
  
  In general, usual HTTP status codes ae returned with their regular meaning. On success
  (status code 200), a JSON object such as below is returned:
  
    ```
    {
      headlines: <array of headlines consisting of numHeadline headlines>,
      hlSrcHash: <hash of source text, hlSrc>,
      hlSrcWords: <number of words in source text, hlSrc>,
      hlHeadlineWords: <number of words in generated headline set>,
      hlMessage: <an informational message from the API in some cases>,
      hlDbId: <an internal reference to the API call that can be used to analyze issues>
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
    
    Other possible error codes are 500, 502, and 429, 422 among other common ones. 429 is encountered
    when a rate limit is exceeded. The message will have more details. 422 is returned when there are
    issues with your input.


* **Sample Call:**

  The API can be called asynchronously. For example, in JavaScript, a promise is returned, which 
  can be awaited on, and JSON data can be extracted from the response as usual.
  
  Here is a bash snippet illustrating the call, which you can easily translate into your favorite
  programming language.
  
  ```
    API_KEY="...."
    text="..."
    
    curl -i -X POST  -H "Content-Type: application/json; charset=UTF-8" \
    -H "Accept: application/json; charset=UTF-8" \
    -H "Authorization: Bearer $API_KEY" \
    -d '{"hlSrc": "'"$text"'", "target": "short", "ingenuity": "I10", "numHeadlines": 10, "seed": 12345}' \
    https://sassbook.com/api/ext/headline/v1
   
    ```
    
    The [samples](./samples) directory has minimal examples in JavaScript and Python (3).
    
  * **Notes:**

    * If you have longer documents, use the Summarizer API to bring down the word count below 800. In
    practice, an abstract might work better for this use case.
    
    * For very large documents, using a two-step summarization workflow that involves
    first using the extractive summarization mode followed by the abstractive mode
    will speed up the process.
    
    
