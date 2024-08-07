let boopCount = 0;

const boopElement = document.getElementById("boopCounter");

function boop() {
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
