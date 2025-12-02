//removes the elements
function RemoveAISummary() {
    const summary = document.getElementById("expandable-metadata")
    const carousel = document.getElementById("teaser-carousel")
    if (summary) {
        summary.remove()
        console.log("Removed expandable-metadata element:", summary)
    } else {
        console.log("expandable-metadata NOT found")
    }
    if (carousel) {
        carousel.remove()
        console.log("Removed teaser-carousel element:", carousel)
    } else {
        console.log("teaser-carousel NOT found")
    }
}

//initial attempt on document load
if (document.readyState === "complete") {
    RemoveAISummary()
} else {
    window.addEventListener("load", () => RemoveAISummary(), { once: true })
}

//handle youtube SPA navigation changes
(function() {
    const originalPushState = history.pushState  //saves original push state
    history.pushState = function () {            //overrides the browser pushState function with one that does the same and removes the summary
        originalPushState.apply(this, arguments) //passes the original push state
        setTimeout(() => {                       //removes the summary after 0.5s
            RemoveAISummary()
        }, 500)
    }
    
    //also removes the summary but this time on popstate call (history.back, .forward, etc)
    window.addEventListener("popstate", () => {
        setTimeout(() => {
            RemoveAISummary()
        }, 500)
    })
})

//observes DOM mutations in case of summary reinsertion (when clicking on recommended videos)
const observer = new MutationObserver(() => {
    RemoveAISummary()
})
observer.observe(document.body, { childList: true, subtree: true })
