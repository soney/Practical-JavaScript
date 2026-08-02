# Problem 2: Request Streams for POST Bodies

Edit `Lesson 2.2/main.js`:

**Topic:** Server-side request processing and streams.

**Objective:** Learn how Node.js handles incoming POST request data in chunks and how to manually reconstruct the full request body.

When a client sends data to a Node.js server, the request body does not always arrive all at once. Instead, it is streamed in smaller chunks. Your task is to capture and assemble these chunks into a complete message.

## How request streams work

The request object (`req`) is a readable *stream*. Instead of handing you the body directly, it emits events as data flows in, and you subscribe to those events with `req.on(eventName, callback)`. Two events matter here:

- `'data'` fires once for every chunk that arrives. Its callback receives that chunk as an argument. Chunks are `Buffer` objects, so call `chunk.toString()` to read one as text (appending a chunk onto a string also converts it for you).
- `'end'` fires a single time, after the final chunk. The body is only complete at this point, so you must build and send your response inside the `'end'` handler, not after it.

## Requirements

**Only read the body for `POST` requests.** As in the previous problem, check `req.method`. If it is not `'POST'`, respond with a `405` status code (Method Not Allowed) and a short message, and do not read the stream.

For a `POST` request:

1. **Store incoming data**
    - Before attaching any listeners, initialize an empty string (or array) to hold the incoming chunks.

2. **Listen for incoming chunks**
    - Attach a `'data'` listener and append each chunk to your accumulator.

3. **Finalize the request**
    - Attach an `'end'` listener. Once it fires:
        - Combine the collected data into the complete request body.
        - Log the full body to the console.
        - Send a `200` response in the exact format `Data Received: <full request body>` (do not include the surrounding quotation marks in the response). For example, a request body of `hello` must produce the response body `Data Received: hello`.

## Overall shape

Your handler should look roughly like this. Fill in the commented lines:

```js
if (req.method === 'POST') {
  let body = '';

  req.on('data', (chunk) => {
    // append this chunk to body
  });

  req.on('end', () => {
    // body is complete here: log it, then send "Data Received: <body>"
  });
} else {
  // respond with a 405 status and a short message
}
```

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Request Types](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/2qUuv/practice-request-types) - `Lesson 2.2`

The files here are the starter you get in the course. [`solution/main.js`](solution/main.js) is the finished `main.js`; copy it over the starter to run the completed assignment.
