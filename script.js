
function createEmoji() {
    const emoji = document.createElement("div");
    emoji.textContent = Math.random() > 0.5 ? "💞" : "🎈";
    emoji.classList.add("emoji");

    emoji.style.left = Math.random() * window.innerWidth + "px";

    document.getElementById("float-container").appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 5000);
}

setInterval(createEmoji , 500);

//preview message
function previewMessage() {
    const recipient = document.getElementById("recipient").value;
    const occasion = document.getElementById("occasion").value;
    const theme = document.getElementById("theme").value;
    const msg = document.getElementById("message").value ;
    // document.getElementById("preview").innerText = "preview:\n" + msg;

    let header =""
    if (recipient) {
  header += "<div style=' font-size:30px; color:red; height:12vh; padding:8px; font-weight:bold;'>Dear " 
          + recipient + "</div>";
}
    // if (recipient) header += "Specially To: " + recipient + "\n";
    if (occasion) header += "Happy❤️" + occasion + "<br>";
    if (theme) header += "Tone:" + theme + "<br>"; 

    document.getElementById("preview").innerHTML = header + "<br>" + (msg || "No message yet");
}

let generatedLink = ""; // global variable to hold the string link

function generateLink() {
    const sender = document.getElementById("sender").value;
    const recipient = document.getElementById("recipient").value;
    const occasion = document.getElementById("occasion").value;
    const theme = document.getElementById("theme").value;
    const msg = document.getElementById("message").value;

    if (!msg) {
        alert("please enter a message");
        return;
    }

    const data = { sender, recipient, occasion, theme, msg };
    const encoded = encodeURIComponent(JSON.stringify(data));
    const link = window.location.origin + window.location.pathname + "?data=" + encoded;

    // ✅ Save the string link globally
    generatedLink = link;

    // ✅ Display the link
    document.getElementById("link").innerHTML =
        `Share this link: <a href="${link}" target="_blank">${link}</a>`;

    // ✅ Show share buttons only after link is created
    document.getElementById("share-buttons").style.display = "block";
}

// WhatsApp share
// function shareWhatsapp() {
//     const url = "https://wa.me/?text=" + encodeURIComponent("Check out this message: " + generatedLink);
//     window.open(url, "_blank");
// }

// Copy link
function copyLink() {
    navigator.clipboard.writeText(generatedLink).then(() => {
        alert("Link copied to clipboard!");
    });
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    if (data) {
        try {
            const parsed = JSON.parse(decodeURIComponent(data));
            let header = "";
            if (parsed.sender) header += `From: ${parsed.sender}<br>`;
            if (parsed.recipient) header += `To: ${parsed.recipient}<br>`;
            if (parsed.occasion) header += `Occasion: ${parsed.occasion}<br>`;
            if (parsed.theme) header += `Theme: ${parsed.theme}<br>`;

            document.getElementById("preview").innerHTML = header + "<br>Message:<br>" + parsed.msg;
        } catch (e) {
            document.getElementById("preview").innerText = "Invalid message data";
        }
    }
};


//PAGE1 Script

// Show more / Show less toggle
document.querySelectorAll('.card').forEach(card => {
  const content = card.querySelector('.card-content');
  const toggle = card.querySelector('.show-toggle');

  if (content.scrollHeight > content.clientHeight) {
    let expanded = false;
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      if (expanded) {
        content.classList.add('expanded');
        toggle.textContent = 'Show less';
      } else {
        content.classList.remove('expanded');
        toggle.textContent = 'Show more';
      }
    });
  } else {
    toggle.style.display = 'none';
  }
});

// Copy button functionality
document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const message = card.querySelector('.card-content p').innerText;

    navigator.clipboard.writeText(message).then(() => {
      // Change button text to "Copied"
      btn.textContent = "Copied";

      // After 2 seconds, change back to "Copy"
      setTimeout(() => {
        btn.textContent = "Copy";
      }, 5000);
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  });
});

//Menu Bar
const menuIcons = document.getElementById("menu-icon");
const menu = document.getElementById("nav-links");

let isOpen = false;

menuIcons.addEventListener("click", () => {
  isOpen = !isOpen;
  if(isOpen){
    menu.classList.add("show");
    menuIcons.classList.remove("fa-bars");
    menuIcons.classList.add("fa-times");
  }else{
    menu.classList.remove("show");
    menuIcons.classList.remove("fa-times");
    menuIcons.classList.add("fa-bars")
  }
});



//SEARCH & FILTER SECTION
const searchBar = document.getElementById("searchbar")
const cards = document.querySelectorAll(".card")

searchBar.addEventListener("input", function () {
  const value = this.value.toLowerCase()

  cards.forEach(card => {
    const occasion = card.querySelector("h4").innerText.toLowerCase()
    const tone = card.querySelector("span").innerText.toLowerCase()
    const message = card.querySelector(".card-content p").innerText.toLowerCase()

    const fullText = occasion + " " + tone + " " + message

    if (fullText.includes(value)){
      card.style.display = "block"
    }else{
      card.style.display = "none"
    }
  })
});

function highLight(text, value){
  if(!value) return text;
  const regex = new RegExp(`(${value})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}
