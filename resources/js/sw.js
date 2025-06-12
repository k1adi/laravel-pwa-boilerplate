import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        const updateSW = registerSW({
            onNeedRefresh() {
                // Show a notification to the user that there's an update available
                console.log('New content is available; please refresh.');
            },
            onOfflineReady() {
                // Show a notification that the app is ready for offline use
                console.log('App is ready for offline use.');
            },
            // Enable immediate claiming to ensure the service worker
            // takes control of the page immediately
            immediate: true
        });
    }
}