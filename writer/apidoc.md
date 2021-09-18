**Sassbook AI Writer API**
----
[Sassbook AI Writer API](https://sassbook.com//ai-text-generator-api
"Sassbook AI Content Generator API is the most advanced API for automatic text generation using modern AI.") (the AI content generator API) enables developers to access
  similar functionality as that available with the [Sassbook AI Writer web application](https://sassbook.com/ai-writer "AI text content generator for rapid content generation using modern AI"). The API provides a controllable interface to state-of-the-art AI content generation for customers needing automation of their workflows.
  
* **Endpoint**

  __`/api/ext/generate/v1`__
  
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
    
    
    
    __`promptText=[string]`__
    
    Prompt text to be completed. Must be plain text,  utf-8 encoded. The
    generated completion will include `promptText`.
    
    Must be empty if generating a continuation, from `priorText` See **priorText**.

    The maximum number of allowed words for `promptText` is **128**. A minimum of 15-30 words is
    recommended.
    
    __`priorText=[string]`__
    
    Seed text to be continued from the end of it. Must be plain text, utf-8
    encoded.Usually the result from the previous completion request, but can
    be any block of text. Must be empty if `promptText` is set. See
    **promptText**.

    So, an API call supplies a valid seed text either in `promptText` or in 
    `priorText`, but not both. Otherwise, the call ends with a 422 error.

    The maximum number of allowed words for `priorText` is **500**.
  
    __`genLength=[number]`__ `optional`

    The desired length in words (more precisely, tokens) for completions and
    continuations. However, length of actual generations could be lower than
    specified. Default is **50**.

    The maximum length of generations returned per call is tied to the
    [Premium Sassbook AI plan](https://sassbook.com/pricing 
    "AI content generator and AI text summary generator subscription plans"),
    which is currently hundred(100).
 
    The [Sassbook AI Developer API plan](https://sassbook.com/developer-api
    "AI text content generator and AI text summarizer developer API plan") also has the same limit. 
    
    __`genCreativity=[string]`__ `optional`
        
    This parameter influences the style of generated text. Possible values are:

    (`var_low`, `var_,medium`, `var_high`). The default fallback value is `var_medium`.
    
    `var_low` tends to generate more predictable, conservative text best suited to
    factual content. `var_high` produces more imaginative content, more beneficial
    for fiction or to generate ideas. `var_medium` is sort of in the middle.
    
    __`numCandidates=[number]`__ `optional`
        
    This is the desired number of candidate generations to return. Defaults
    to 1. The maximum number of generations returned per call is tied to the
    [Premium Sassbook AI plan](https://sassbook.com/pricing 
    "AI content generator and AI text summarizer subscription plans"), which
    is currently six(**6**).
 
    The [Sassbook AI Developer API plan](https://sassbook.com/developer-api
    "AI content generator and AI text summarizer developer API plan") also
    has the same limit. 
    
    __`priorCode=[string]`__ `optional`

    This code represents certain inferences about your previous generation,
    whether completion or continuation and is returned from the previous call
    response (`genMetaCode`). The code is in encoded form.

    This code is intended to be used for related generations but could be used
    for new completions in related contexts. Depending on your application
    domain, you may choose to use it or not, subject to its observed impact on
    the quality of generations. **See `extraAnalytics`**.

    __`extraAnalytics=[boolean]`__ `optional`

    Sassbook AI's analytics engine performs additional AI analytics on the input
     data to further improve quality of generations. This is enabled by default
    (`true`). Supply `false` to disable part of it in case it works better for
    some of your application scenarios.

    __`seed=[number]`__ `optional`
    The number (integer) supplied for this parameter causes your generations to
    potentially vary, everything else remaining the same. Conversely,
    generations can be made repeatable if you supply the same seed, though not
    guaranteed.

    The seed is typically set as integer in the range 0-1000000.

* **Success Response:**
  
  In general, usual HTTP status codes ae returned with their regular meaning. On success
  (status code 200), a JSON object such as below is returned:
  
    ```
    {
      generations: [<array of candidate generations of length genLength>],
      genMetaCode: <Code returned by the API, see 'priorCode' API parameter, if any>,
      genMessage: <an informational message from the API>,
      genDbId: <an internal reference to the API call that can be used to analyze issues>,
      genTime: <The time spent on the generate API call>,
    }
    ```
 
* **Error Response:**

  Any errors are also returned as objects, with a code and a message. The code is usually
  an HTTP status code. Such as:
  
  ```
  {
    code: 403,
    message: Authorization failed
  }
  ```
    
    Other possible error codes are 500, 502, 422, and 429 among other common
    ones. 429 is encountered when a rate limit is exceeded. The message will
    have more details. For input violations, 422 usually result.

* **Sample Call:**

  The API can be called asynchronously. For example, in JavaScript, a promise is returned, which can be awaited on and JSON data can be extracted from the response as usual.
  
  Here is a bash snippet illustrating the call, which you can easily translate into your favorite programming language.
  
  ```
    API_KEY="...."
    text="..."
    
    curl -i -X POST  -H "Content-Type: application/json; charset=UTF-8" \
    -H Accept: 'application/json; charset=UTF-8', \
    -H "Authorization: Bearer $API_KEY" \
    -d '{ "promptText": "'"$text"'", "priorText": "", "genLength": 90, "numCandidates": 3, "genCreativity": "var_low",  "priorCode": "", "seed": 1234 }' \
  https://sassbook.com/api/ext/generate/v1
   
    ```

The [samples](./samples) directory has minimal examples in JavaScript and Python (3).

* **Notes:**

1. Sassbook AI webapp subscription users are entitled to monthly API credits as subscription benefits. They can request an API key from the Account page.

2. Sassbook AI developer API (metered) subscription users can request an API key from the Account page.
