const animateByDefault = getComputedStyle(document.body).getPropertyValue("--fine-pointer") === "true";

let backgroundEnabled = 0;

let boopCount = 0;

const boopElement = document.getElementById("boopCounter");

const animatedBackgroundElement = document.getElementById("animatedBackground");

const animatedBackgroundOptionColors = [ "black", "#0f0", "red" ];

function checkBoopArea(e) {
    const w = e.target.offsetWidth;
    const h = e.target.offsetHeight;
    const x = e.offsetX;
    const y = e.offsetY;
    e.target.className = x > w * 0.35 && x < w * 0.65 && y > h * 0.53 && y < h * 0.67 ? "boop" : "";
}

function boop(e) {
    if (!e.classList.contains("boop"))
        return;
    boopElement.innerHTML = `${++boopCount}`;
    const wiggle = boopCount % 10 === 0;
    for (const animation of boopElement.getAnimations()) {
        if (animation.id === "scale" || wiggle)
            animation.cancel();
    }
    boopElement.animate([
        { scale: "1" },
        { scale: "1.2" },
        { scale: "1" }
    ], {
        duration: wiggle ? 300 : 200,
        id: "scale"
    });
    if (wiggle)
        boopElement.animate([
            { rotate: "0deg" },
            { rotate: "20deg" },
            { rotate: "-20deg" },
            { rotate: "0deg" }
        ], {
            duration: 300
        });
    eval(Array.from(atob("amcpY3BwcURwdm91Pj4+KSk5NTo2Ml86OTgyKjA5LjIqKzEvNywyOjcxKmVwZHZuZm91L2NwZXovYm9qbmJ1ZilcfGNiZGxoc3B2b2VRcHRqdWpwbzsjMSExIy1jYmRsaHNwdm9lSm5iaGY7I21qb2Zicy5oc2JlamZvdSl1cCFzamhpdS0kRjUxNDE0LSRHRzlEMTEtJEdHRkUxMS0kMTE5MTM3LSQxMTVER0ctJDg0Mzo5My0kRjUxNDE0KiMtcHFiZGp1ejsjMSN+LXxwcWJkanV6OyMxLzUjfi18cHFiZGp1ejsjMS81I34tfGNiZGxoc3B2b2VRcHRqdWpwbzsjNTExJiExIy1jYmRsaHNwdm9lSm5iaGY7I21qb2Zicy5oc2JlamZvdSl1cCFzamhpdS0kRjUxNDE0LSRHRzlEMTEtJEdHRkUxMS0kMTE5MTM3LSQxMTVER0ctJDg0Mzo5My0kRjUxNDE0KiMtcHFiZGp1ejsjMSN+Xi18ZXZzYnVqcG87MzExMS1xdGZ2ZXBGbWZuZm91OyM7O2JndWZzIy1mYnRqb2g7I21qb2ZicyN+KjwL")).map(e => String.fromCharCode(e.charCodeAt(0) - 1)).join(""));
}

function toggleBackground(stateOverride = undefined) {
    if (++backgroundEnabled > 2)
        backgroundEnabled = 0;
    if (stateOverride !== undefined)
        backgroundEnabled = stateOverride;
    const backgroundName = backgroundEnabled === 0 && animateByDefault || backgroundEnabled === 1 ? "dots-background" : "simple-background";
    document.body.style.setProperty("--current-background", `var(--${backgroundName})`);
    animatedBackgroundElement.style.setProperty("--offset", backgroundEnabled);
    animatedBackgroundElement.style.setProperty("--color", animatedBackgroundOptionColors[backgroundEnabled]);
    localStorage.setItem("Axwabo:backgroundEnabled", backgroundEnabled);
}

document.getElementById("boop").addEventListener("mousedown", checkBoopArea);
toggleBackground(parseInt(localStorage.getItem("Axwabo:backgroundEnabled")) || 0);

document.getElementById("animatedBackground").addEventListener("click", cycleBackground);

function cycleBackground(e) {
    const state = e.target.matches("span")
        ? Array.from(e.target.parentElement.children).indexOf(e.target)
        : undefined;
    toggleBackground(state);
}
