
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
function triggerImageUpload(){
  document.getElementById("imageInput").click();
}

let selectedImageBase64 = "";  

const imageInputEl = document.getElementById("imageInput");

if (imageInputEl) {
    imageInputEl.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            selectedImageBase64 = e.target.result;  // store image

            // ✅ SHOW IMAGE IN UI
            const previewImg = document.getElementById("previewImage");
            const placeholder = document.getElementById("uploadPlaceholder");

            previewImg.src = selectedImageBase64;
            previewImg.style.display = "block";

            // ✅ HIDE PLACEHOLDER
            placeholder.style.display = "none";
        };
        reader.readAsDataURL(file);
    });
}

 //PREVIEW MESSAGE
function previewMessage() {
    const sender = document.getElementById("sender")?.value || "";
    const recipient = document.getElementById("recipient")?.value || "";
    const occasion = document.getElementById("occasion")?.value || "";
    const theme = document.getElementById("theme")?.value || "";
    const msg = document.getElementById("message")?.value || "";

    let cardHTML = "";

    if(selectedImageBase64){
        cardHTML += `
          <div class="card-image">
            <img src="${selectedImageBase64}">
          </div>
        `;
    }

    cardHTML += `
      <div class="card-text">
        ${sender ? `<h4>From: ${sender}</h4>` : ""}
        ${recipient ? `<h2>To: ${recipient}</h2>` : ""}
        ${occasion ? `<h4>Happy ${occasion}</h4>` : ""}
        ${theme ? `<span class="tone">${theme}</span>` : ""}
        <p>${msg || "No message yet"}</p>
      </div>

      <div class="brand">LoveStack 💖</div>
      </div>
    `;

    document.getElementById("preview").innerHTML = cardHTML;
}


//GENERATE SHARE LINK
let generatedLink = "";

function openPreview() {
    const sender = document.getElementById("sender")?.value || "";
    const recipient = document.getElementById("recipient")?.value || "";
    const occasion = document.getElementById("occasion")?.value || "";
    const theme = document.getElementById("theme")?.value || "";
    const msg = document.getElementById("message")?.value || "";

    if (!msg) {
        alert("please enter a message");
        return;
    }

    //DATA OBJECT (UPDATED)
    const data = { 
        sender, 
        recipient, 
        occasion, 
        theme, 
        msg,
        image: selectedImageBase64 || "",
        // frame: selectedFrame || "",
        // layout: selectedLayout || "",
        // time: Date.now() 
    };

    // const encoded = encodeURIComponent(JSON.stringify(data));
    sessionStorage.setItem("lovestack_preview", JSON.stringify(data));

    window.open("preview.html", "_blank");
    // function openPreview(){
    //   savedPreview();
    //   window.open("preview.html", "_blank");
    // }

    // window.open(`./preview.html?data=${encoded}`, "_blank");
    // const link = window.location.origin + window.location.pathname + "?data=" + encoded;

    generatedLink = link;

    document.getElementById("link").innerHTML =
        `Share this link: <a href="${link}" target="_blank">${link}</a>`;

    document.getElementById("share-buttons").style.display = "block";
}


//COPY LINK
function copyLink() {
    navigator.clipboard.writeText(generatedLink).then(() => {
        alert("Link copied to clipboard!");
    });
}


//LOAD PREVIEW FROM SHARED LINK
window.addEventListener("DOMContentLoaded", () => {
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

            let imageHTML = "";

            if (parsed.image) {
                imageHTML = `<img src="${parsed.image}" 
                                style="max-width:100%; border-radius:14px; margin:15px 0;">`;
            }

            document.getElementById("preview").innerHTML = 
                header + imageHTML + "<br>Message:<br>" + parsed.msg;

        } catch (e) {
            document.getElementById("preview").innerText = "Invalid message data";
        }
    }
});




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




