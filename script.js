const launchDate = new Date("2025-03-01T00:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) return;

    document.getElementById("days").innerText =
        Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText =
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText =
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText =
        Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);
