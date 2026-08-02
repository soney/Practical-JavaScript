/**
 * Fetches daily events from the University of Michigan API
 * and displays each event's title as a list item.
 */
function getUMichEvents() {
    const url = "https://events.umich.edu/day/json?v=2";

    // Step 1: Call fetch and capture the Response object
    return fetch(url)
        .then((response) => {
            // Convert the Response object to JSON
            return response.json();
        })
        .then((data) => {
            // Step 2: Receive the parsed data.
            // The U-M API returns an object keyed by date, so turn the
            // values of that object into an array of event objects.
            const eventsArray = Object.values(data);

            // Step 3: Show each event's title as a list item.
            const list = document.querySelector("#eventList");
            list.innerHTML = "";
            for (const eventInfo of eventsArray) {
                const li = document.createElement("li");
                li.textContent = eventInfo.title;
                list.append(li);
            }

            const loader = document.querySelector("#loadingMessage");
            if (loader) {
                loader.innerText = `Found ${eventsArray.length} events:`;
            }
        })
        .catch((error) => {
            // Step 4: Handle a failed request
            console.error("Failed to fetch events");

            const loader = document.querySelector("#loadingMessage");
            if (loader) {
                loader.innerText = "Failed to fetch events";
                loader.style.color = "red";
            }
        });
}
