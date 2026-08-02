(function () {
  const realFetch = window.fetch.bind(window);
  let cachePromise;

  function getUrlString(url) {
    if (typeof url === "string") {
      return url;
    }

    if (url && typeof url.url === "string") {
      return url.url;
    }

    return String(url);
  }

  function wait(delay) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, delay);
    });
  }

  async function getFetchCache() {
    if (!cachePromise) {
      cachePromise = realFetch("fetch-cache.json")
        .then((response) => {
          if (!response.ok) {
            return {};
          }

          return response.json();
        })
        .catch(() => {
          return {};
        });
    }

    return cachePromise;
  }

  async function createCachedResponse(entry) {
    if (entry && entry.networkError) {
      throw new TypeError("Failed to fetch");
    }

    const hasBody =
      entry &&
      typeof entry === "object" &&
      Object.prototype.hasOwnProperty.call(entry, "body");

    if (entry && entry.delay) {
      await wait(entry.delay);
    }

    const body = hasBody ? entry.body : entry;
    const status = hasBody && entry.status ? entry.status : 200;
    const headers = Object.assign(
      { "Content-Type": "application/json" },
      hasBody && entry.headers ? entry.headers : {},
    );

    return new Response(JSON.stringify(body), { status, headers });
  }

  window.fetch = async function cachedFetch(url, options) {
    const cache = await getFetchCache();
    const key = getUrlString(url);

    if (Object.prototype.hasOwnProperty.call(cache, key)) {
      return createCachedResponse(cache[key]);
    }

    return realFetch(url, options);
  };
})();
