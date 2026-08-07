# Problem 2: localStorage for a Consent Gatekeeper

Edit `Lesson 1.2/main-2.js` and `Lesson 1.2/index.html`:

- `Lesson 1.2/main-2.js`: implement the consent gatekeeper logic.
- `Lesson 1.2/index.html`: make sure the page includes an `Accept All Cookies` button if it is missing.

Prevent analytics tracking scripts from running until the user has granted the appropriate level of consent.

Your application contains a function named: `initializeAnalytics()`

This function sends user data to a third-party analytics service. To comply with privacy regulations, analytics should only run after explicit user consent has been recorded.

Create a client-side logic gate that checks the user's stored consent preference.

1. Check Stored Consent
    - Read the value of the following key from `localStorage`: `user_consent_level`

2. Allow Analytics
    - If the value is `'full'`, call `initializeAnalytics()`.
    - The existing `initializeAnalytics()` function logs a message that includes `Analytics Initialized`.

3. Block Analytics
    - If the value is:
        - `'minimal'`
        - missing
        - or undefined

log a warning to the console.

Use these exact warning messages:

- Missing consent: `Analytics blocked: Awaiting user consent.`
- Minimal consent: `Analytics blocked: User opted for minimal storage only.`

4. Add the Accept Button Behavior
    - When the user clicks `Accept All Cookies`, set `localStorage.user_consent_level` to `full`.

---

Course 3, Module 3 - practice assignment (ungraded): [Practice: Client-Side Storage](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/STvSE/practice-client-side-storage) - `Lesson 1.2`

The files here are the starter you get in the course. The finished `index.html` and `main-2.js` are in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%203/Lesson%201/Lesson%201.2/solution); in the course codespace that folder is hidden so you can work the problem first.
