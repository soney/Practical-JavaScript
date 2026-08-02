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
    // SOLUTION: allow analytics only when consent is 'full'
    const consentLevel = localStorage.getItem('user_consent_level');

    if (consentLevel === 'full') {
        initializeAnalytics();
    } else if (consentLevel === 'minimal') {
        console.warn("Analytics blocked: User opted for minimal storage only.");
    } else {
        console.warn("Analytics blocked: Awaiting user consent.");
    }
}

// Run the check immediately on script load
gatekeeper();