# Problem 2: A ShareDB Counter Server

Edit `Lesson 4.2/server.js`:

This server hosts a shared click counter as a ShareDB document. The Express setup and the WebSocket wiring (the `WebSocketServer`, the JSON stream, and `backend.listen(stream)`) are already written at the bottom of the file. Your job is the document itself, following the four `TODO` comments in `server.js`:

1. Connect to the backend and get the counter document. Server code talks to a ShareDB backend through a connection, just like a client would:

   ```js
   const connection = backend.connect();
   const doc = connection.get('examples', 'counter');
   ```

   These two lines replace the `const doc = null;` line. `'examples'` is the collection name and `'counter'` is the document ID; together they identify the document.

2. In `initCounter(callback)`, make sure the document exists. Fetch it first; a document that has never been created has `doc.type === null`:

   ```js
   doc.fetch((err) => {
     if (err) throw err;
     if (doc.type === null) {
       doc.create({ numClicks: 0 }, callback);
       return;
     }
     callback();
   });
   ```

3. In the `GET /doc` route, respond with the current document data: `res.json(doc.data);`

4. In the `POST /click` route, record one click by submitting a json0 operation that adds `1` to `numClicks`, then respond with the updated data:

   ```js
   doc.submitOp([{ p: ['numClicks'], na: 1 }], (err) => {
     if (err) {
       res.status(500).json({ message: err.message });
       return;
     }
     res.json(doc.data);
   });
   ```

Leave the provided `GET /` route and the server startup code at the bottom unchanged.

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node server.js` inside the `Lesson 4.2` folder. Then open a browser preview inside the Coursera lab and go to `localhost:3000/doc`. You should see `{"numClicks":0}`. Every ShareDB change flows through `submitOp`, so you can watch the counter move by requesting `/click` with a POST request; one quick way is a second terminal running `curl -X POST localhost:3000/click`, after which `/doc` shows the higher count.

## ShareDB documentation

- sharedb 5.2.2: [documentation](https://share.github.io/sharedb/), [Doc API: `fetch`, `create`, `submitOp`](https://share.github.io/sharedb/api/doc), [npm package](https://www.npmjs.com/package/sharedb/v/5.2.2), [github (tag v5.2.2)](https://github.com/share/sharedb/tree/v5.2.2)
- json0 OT type (the `na` action): [spec](https://github.com/ottypes/json0), [npm package](https://www.npmjs.com/package/ot-json0/v/1.1.0)

---

Course 3, Module 3 - practice assignment (ungraded): [Practice: Real-Time Synchronization](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/EGkKm/practice-real-time-synchronization) - `Lesson 4.2`

The files here are the starter you get in the course. The finished `server.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%203/Lesson%204/Lesson%204.2/solution); in the course codespace that folder is hidden so you can work the problem first.
