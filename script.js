window.scrollTo(0,0);

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('https://ipapi.co/json');
        if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
            document.getElementById("err").style.height = "20vh";
            document.getElementById("err").innerHTML = `
                <a id='locale' href='./index.html'>en</a> |
                <a id='locale' href='./ja.html'>ja</a>`;
        } else {
            const data = await response.json();
            console.log("Country: " + data.country);
            if (data.country == "JP" & !window.location.toString().includes("ja")) {
                window.location.replace("./ja.html");
            } else if (data.country != "JP" && window.location.toString().includes("ja")) {
                window.location.replace("./index.html");
            };
        }
    } catch (error) {
        console.error(error);
        document.getElementById("err").style.height = "10vh";
        document.getElementById("title").style.height="80vh";
        document.getElementById("err").innerHTML = `
            <a id='locale' href='./index.html'>en</a> |
            <a id='locale' href='./ja.html'>ja</a>`;
    }
});
// Progress bar element
var progressBar = document.getElementById('progress-bar');

// Select all elements except images
var allElements = document.querySelectorAll('body *:not(img)'); // Exclude images from the progress count
var totalElements = allElements.length;
var elementsLoaded = 0;
var hasscrolled = false;
// Function to smoothly animate progress bar width
function animateProgressBar(progressPercent) {
    anime({
        targets: progressBar,
        width: progressPercent + '%',
        duration: 800,
        easing: 'easeInOutQuad'
    });
}

// Function to update progress and animate it
function updateProgress() {
    elementsLoaded++;
    var progressPercent = (elementsLoaded / totalElements) * 100;
    animateProgressBar(progressPercent);

    // Hide overlay when progress reaches 100%
    if (progressPercent >= 100) {
        setTimeout(function () {
            anime({
                targets: '#overlay',
                opacity: [1, 0],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: function () {
                    document.body.style.overflow = "auto";
                    document.getElementById('overlay').style.display = 'none';
                    var textWrapper = document.getElementById("hero");
                    textWrapper.style.visibility = "visible";
                    textWrapper.innerHTML = textWrapper.innerHTML.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
                    anime({
                        targets: '.letter',
                        translateY: [-100, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        duration: 1200,
                        delay: anime.stagger(80),
                        complete: function () {
                            anime({
                                targets: '#triangle',
                                opacity: [0, 1],
                                easing: 'easeOutQuad',
                                duration: 500,
                            })
                        }
                    })
                }
            });
        }, 800); // Wait a little before fading out the overlay
    }
}

// Listen for DOMContentLoaded and start the progress bar
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('scroll', () => {
        if (!hasscrolled) {
            hasscrolled = true;
            anime({
                targets: triangle,
                opacity: 0,
                duration: 500,
                easing: 'easeInOutQuad'
            })
        }
    });
    // Use a forEach loop to load elements with a delay
    allElements.forEach(function (el, index) {
        setTimeout(function () {
            updateProgress();
        }, index * 50); // Stagger each element loading with 50ms delay
    });
});