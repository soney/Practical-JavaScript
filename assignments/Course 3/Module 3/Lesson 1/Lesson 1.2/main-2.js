// EDIT THIS FILE: implement gatekeeper() below. initializeAnalytics() is provided.

/**
 * Mock function representing a 3rd-party analytics suite.
 * In a real app, this would load an external script or send a network request.
 */
function initializeAnalytics() {
    console.log("Analytics Initialized: Data is now being sent to the server.");
    // Example: gtag('config', 'UA-XXXXX-Y');
}

/**
 * gatekeeper
 * Checks for user consent before allowing tracking scripts to run.
 */
function gatekeeper() {
    // TODO: read 'user_consent_level' from localStorage. If it is 'full', call
    //       initializeAnalytics(); if it is 'minimal' or missing, log the matching
    //       "Analytics blocked" warning (see problem description).
}

// Run the check immediately on script load
gatekeeper();