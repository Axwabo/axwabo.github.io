let boopCount = 0;

const boopElement = document.getElementById("boopCounter");

function checkBoopArea(e) {
    if (e.target.matches(":active"))
        return;
    const w = e.target.offsetWidth;
    const h = e.target.offsetHeight;
    const x = e.offsetX;
    const y = e.offsetY;
    e.target.className = x > w * 0.36 && x < w * 0.64 && y > h * 0.58 && y < h * 0.63 ? "boop" : "";
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
}

document.getElementById("boop").addEventListener("mousemove", checkBoopArea);
