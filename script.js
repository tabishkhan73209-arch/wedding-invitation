/* =========================================================
   WEDDING CONFIGURATION
   ================================================

   IMPORTANT:
   Baad mein almost saari information yahin se change hogi.
========================================================= */

const CONFIG = {

    groom: {

        name: "Md. Faizan Ali",

        parents:
            "Son of Md. Budruzzaman",
    },


    bride: {

        name: "Shazia",

        parents:
            "Daughter of Md. Ehsanul Haque",
    },


    wedding: {

        /* Local browser time */
        date:
            "2026-11-05T07:00:00",

        dateText:
            "November 05, 2026",

        day:
            "Thursday",

        time:
            "07:00 PM"
    },


    events: {

        guestArrival:
            "Nov 05, 2026, 07:00 PM",

        },

        haldi: {

            date:
                "Nov 03, 2026, 07:00 PM",

            venue:
                "At Bride's House"
        },

        nikah: {

            date:
                "Nov 05, 2026, 7:30 PM",

            venue:
                "Grand Orchid"
        }
    },


    venue: {

        name:
            "Grand Orchid",

        address:
            "Khagaul Road, Opp. Indian Oil Petrol Pump, Phulwari Sharif, Patna-801505",

        mapQuery:
            "Grand Orchid",

        mapUrl:
            "https://maps.app.goo.gl/JnGDTPj5QQEUCsCM9"
    },


/* =========================================================
   HELPERS
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = value;
    }
}


/* =========================================================
   POPULATE CONTENT
========================================================= */

function populateWeddingDetails() {

    /* Groom */

    setText(
        "groomNameHero",
        CONFIG.groom.name
    );

    setText(
        "groomParentsHero",
        CONFIG.groom.parents
    );

    setText(
        "groomQualification",
        `${CONFIG.groom.qualification}\n${CONFIG.groom.profession}`
    );


    /* Bride */

    setText(
        "brideNameHero",
        CONFIG.bride.name
    );

    setText(
        "brideParentsHero",
        CONFIG.bride.parents
    );

    setText(
        "brideQualification",
        `${CONFIG.bride.qualification}\n${CONFIG.bride.profession}`
    );


    /* Names */

    setText(
        "welcomeNames",
        `${CONFIG.groom.name} & ${CONFIG.bride.name}`
    );


    /* Wedding date */

    setText(
        "weddingDateText",
        CONFIG.wedding.dateText
    );

    setText(
        "weddingDayText",
        CONFIG.wedding.day
    );

    setText(
        "weddingTimeText",
        CONFIG.wedding.time
    );


    /* Timeline */

    setText(
        "guestArrivalTime",
        CONFIG.events.guestArrival
    );

    setText(
        "ceremonyTime",
        CONFIG.events.ceremony
    );

    setText(
        "receptionTime",
        CONFIG.events.reception
    );


    /* Pre wedding */

    setText(
        "mehendiDate",
        CONFIG.events.mehendi.date
    );

    setText(
        "mehendiVenue",
        CONFIG.events.mehendi.venue
    );

    setText(
        "haldiDate",
        CONFIG.events.haldi.date
    );

    setText(
        "haldiVenue",
        CONFIG.events.haldi.venue
    );

    setText(
        "nikahDate",
        CONFIG.events.nikah.date
    );

    setText(
        "nikahVenue",
        CONFIG.events.nikah.venue
    );


    /* Venue */

    setText(
        "venueName",
        CONFIG.venue.name
    );

    setText(
        "venueAddress",
        CONFIG.venue.address
    );


    /* Transportation */

    setText(
        "pickupPoint",
        CONFIG.transportation.pickupPoint
    );


    /* Map */

    const mapFrame =
        document.getElementById("mapFrame");

    if (mapFrame) {

        mapFrame.src =
            `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.venue.mapQuery)}&output=embed`;
    }


    const mapButton =
        document.getElementById("mapButton");

    if (mapButton) {

        mapButton.href =
            CONFIG.venue.mapUrl;
    }


    /* Title */

    document.title =
        `${CONFIG.groom.name} & ${CONFIG.bride.name} | Wedding Invitation`;
}


/* =========================================================
   OPEN DOOR
========================================================= */

const doorScreen =
    document.getElementById("doorScreen");

const openInvitation =
    document.getElementById("openInvitation");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


let doorOpened = false;


function openWeddingInvitation() {

    if (doorOpened) return;

    doorOpened = true;

    doorScreen.classList.add("opening");

    /* Start music after user interaction */
    if (weddingMusic) {

        weddingMusic
            .play()
            .then(() => {

                musicButton.classList.add("playing");

            })
            .catch(() => {

                /* Browser may block audio */
            });
    }


    setTimeout(() => {

        doorScreen.classList.add("opened");

        document.body.classList.add("is-open");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        revealInitialElements();

    }, 1350);


    setTimeout(() => {

        doorScreen.style.display = "none";

    }, 2200);
}


openInvitation.addEventListener(
    "click",
    openWeddingInvitation
);


/* Also allow tapping door itself */

doorScreen.addEventListener(
    "click",
    (event) => {

        if (
            event.target === doorScreen ||
            event.target.closest(".door-frame")
        ) {

            openWeddingInvitation();
        }
    }
);


/* =========================================================
   MUSIC
========================================================= */

let musicPlaying = false;


musicButton.addEventListener(
    "click",
    async () => {

        if (!weddingMusic) return;


        if (musicPlaying) {

            weddingMusic.pause();

            musicPlaying = false;

            musicButton.classList.remove(
                "playing"
            );

            musicButton.textContent = "♪";

        } else {

            try {

                await weddingMusic.play();

                musicPlaying = true;

                musicButton.classList.add(
                    "playing"
                );

                musicButton.textContent = "♫";

            } catch (error) {

                console.log(
                    "Music could not start:",
                    error
                );
            }
        }
    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                }
            );

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(element);

    }
);


/* Initial hero elements */

function revealInitialElements() {

    document
        .querySelectorAll(
            ".hero .reveal"
        )
        .forEach(
            (element, index) => {

                setTimeout(
                    () => {

                        element.classList.add(
                            "visible"
                        );

                    },
                    400 + index * 130
                );
            }
        );
}


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingTarget =
    new Date(
        CONFIG.wedding.date
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingTarget - now;


    if (difference <= 0) {

        setText("days", "00");
        setText("hours", "00");
        setText("minutes", "00");
        setText("seconds", "00");

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60))
            /
            1000
        );


    setText(
        "days",
        String(days).padStart(2, "0")
    );

    setText(
        "hours",
        String(hours).padStart(2, "0")
    );

    setText(
        "minutes",
        String(minutes).padStart(2, "0")
    );

    setText(
        "seconds",
        String(seconds).padStart(2, "0")
    );
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   SCRATCH CARD
========================================================= */

const scratchCanvas =
    document.getElementById(
        "scratchCanvas"
    );

const scratchCard =
    document.getElementById(
        "scratchCard"
    );


let scratchContext;

let isScratching = false;

let scratchedPixels = 0;


function setupScratchCard() {

    if (
        !scratchCanvas ||
        !scratchCard
    ) return;


    const rect =
        scratchCard.getBoundingClientRect();

    const ratio =
        Math.max(
            window.devicePixelRatio || 1,
            1
        );


    scratchCanvas.width =
        rect.width * ratio;

    scratchCanvas.height =
        rect.height * ratio;


    scratchCanvas.style.width =
        `${rect.width}px`;

    scratchCanvas.style.height =
        `${rect.height}px`;


    scratchContext =
        scratchCanvas.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );


    scratchContext.scale(
        ratio,
        ratio
    );


    /* Scratch surface */

    const gradient =
        scratchContext.createLinearGradient(
            0,
            0,
            rect.width,
            rect.height
        );


    gradient.addColorStop(
        0,
        "#b98972"
    );

    gradient.addColorStop(
        .45,
        "#d5b29f"
    );

    gradient.addColorStop(
        1,
        "#9e6652"
    );


    scratchContext.fillStyle =
        gradient;

    scratchContext.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    /* Decorative dots */

    for (
        let i = 0;
        i < 120;
        i++
    ) {

        const x =
            Math.random() *
            rect.width;

        const y =
            Math.random() *
            rect.height;

        scratchContext.beginPath();

        scratchContext.arc(
            x,
            y,
            Math.random() * 2 + 1,
            0,
            Math.PI * 2
        );

        scratchContext.fillStyle =
            "rgba(255,255,255,.25)";

        scratchContext.fill();
    }


    scratchContext.fillStyle =
        "rgba(255,255,255,.18)";

    scratchContext.font =
        "28px Georgia";

    scratchContext.textAlign =
        "center";

    scratchContext.fillText(
        "Scratch Here ✨",
        rect.width / 2,
        rect.height / 2
    );
}


function scratchAt(
    clientX,
    clientY
) {

    if (!scratchContext) return;


    const rect =
        scratchCanvas.getBoundingClientRect();


    const x =
        clientX - rect.left;

    const y =
        clientY - rect.top;


    scratchContext.save();


    scratchContext.globalCompositeOperation =
        "destination-out";


    scratchContext.beginPath();

    scratchContext.arc(
        x,
        y,
        32,
        0,
        Math.PI * 2
    );

    scratchContext.fill();


    scratchContext.restore();


    checkScratchProgress();
}


function checkScratchProgress() {

    const rect =
        scratchCanvas.getBoundingClientRect();

    const ratio =
        Math.max(
            window.devicePixelRatio || 1,
            1
        );


    const width =
        Math.floor(
            scratchCanvas.width / ratio
        );

    const height =
        Math.floor(
            scratchCanvas.height / ratio
        );


    const sampleCanvas =
        document.createElement(
            "canvas"
        );


    sampleCanvas.width =
        Math.max(
            1,
            Math.floor(width / 8)
        );

    sampleCanvas.height =
        Math.max(
            1,
            Math.floor(height / 8)
        );


    const sampleContext =
        sampleCanvas.getContext("2d");


    sampleContext.drawImage(
        scratchCanvas,
        0,
        0,
        sampleCanvas.width,
        sampleCanvas.height
    );


    const imageData =
        sampleContext.getImageData(
            0,
            0,
            sampleCanvas.width,
            sampleCanvas.height
        );


    let transparent = 0;

    for (
        let i = 3;
        i < imageData.data.length;
        i += 4
    ) {

        if (
            imageData.data[i] < 100
        ) {

            transparent++;
        }
    }


    const total =
        imageData.data.length / 4;

    const percentage =
        transparent / total;


    if (percentage > .48) {

        scratchCanvas.style.transition =
            "opacity .8s ease";

        scratchCanvas.style.opacity =
            "0";

        setTimeout(() => {

            scratchCanvas.style.pointerEvents =
                "none";

        }, 800);
    }
}


/* Mouse */

scratchCanvas?.addEventListener(
    "pointerdown",
    (event) => {

        isScratching = true;

        scratchCanvas.setPointerCapture(
            event.pointerId
        );

        scratchAt(
            event.clientX,
            event.clientY
        );
    }
);


scratchCanvas?.addEventListener(
    "pointermove",
    (event) => {

        if (!isScratching) return;

        scratchAt(
            event.clientX,
            event.clientY
        );
    }
);


scratchCanvas?.addEventListener(
    "pointerup",
    () => {

        isScratching = false;

    }
);


scratchCanvas?.addEventListener(
    "pointercancel",
    () => {

        isScratching = false;

    }
);


window.addEventListener(
    "load",
    setupScratchCard
);


window.addEventListener(
    "resize",
    () => {

        setupScratchCard();

    }
);


/* =========================================================
   SAVE THE DATE / ICS
========================================================= */

const saveDateButton =
    document.getElementById(
        "saveDateButton"
    );


function formatICSDate(
    dateString
) {

    const date =
        new Date(dateString);


    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            date.getSeconds()
        ).padStart(2, "0"
        );


    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}


saveDateButton?.addEventListener(
    "click",
    () => {

        const start =
            formatICSDate(
                CONFIG.wedding.date
            );


        const endDate =
            new Date(
                new Date(
                    CONFIG.wedding.date
                ).getTime()
                +
                2 * 60 * 60 * 1000
            );


        const end =
            formatICSDate(
                endDate
            );


        const title =
            `${CONFIG.groom.name} & ${CONFIG.bride.name} - Wedding`;


        const location =
            CONFIG.venue.name +
            ", " +
            CONFIG.venue.address;


        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Wedding Invitation//EN",
            "BEGIN:VEVENT",
            `DTSTART:${start}`,
            `DTEND:${end}`,
            `SUMMARY:${title}`,
            `LOCATION:${location}`,
            `DESCRIPTION:Wedding ceremony of ${CONFIG.groom.name} and ${CONFIG.bride.name}`,
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");


        const blob =
            new Blob(
                [ics],
                {
                    type:
                        "text/calendar;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            `${CONFIG.groom.name}-${CONFIG.bride.name}-Wedding.ics`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);
    }
);


/* =========================================================
   RSVP
========================================================= */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const rsvpSuccess =
    document.getElementById(
        "rsvpSuccess"
    );


rsvpForm?.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            document.getElementById(
                "guestName"
            ).value.trim();


        const attendance =
            document.getElementById(
                "attendance"
            ).value;


        if (
            !name ||
            !attendance
        ) {

            return;
        }


        /*
         * FRONT-END DEMO
         *
         * Later yahan aap:
         *
         * - Formspree
         * - Google Sheets
         * - Firebase
         * - Supabase
         * - custom PHP/API
         *
         * connect kar sakte ho.
         */


        rsvpForm.style.display =
            "none";


        rsvpSuccess.classList.add(
            "show"
        );


        rsvpSuccess.textContent =
            `Thank you ${name}. Your response has been received. ♥`;
    }
);


/* =========================================================
   INITIALIZE
========================================================= */

populateWeddingDetails();