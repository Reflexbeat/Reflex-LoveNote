
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


//Funtion to Auto-Capitalize
// function autoCapitalize(element){
//   return element.replace(/\b\w/g, function(char){
//     return char.toUpperCase();
//   });
// }

// function capitalization(text) {
//   text.addEventListener("input", function() {
//     this.value = autoCapitalize(this.value)
//   });
// }

// capitalization(document.getElementById("sender"));
// capitalization(document.getElementById("recipient"));
// capitalization(document.getElementById("message"));


//SEARCH & FILTER SECTION
const searchBar = document.getElementById("searchbar")
const cards = document.querySelectorAll(".card");

searchBar.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  cards.forEach(card => {
    const occasion = card.querySelector("h4").innerText.toLowerCase();
    const tone = card.querySelector("span").innerText.toLowerCase();
    const message = card.querySelector(".card-content p").innerText.toLowerCase();

    const fullText = occasion + " " + tone + " " + message;

    if (fullText.includes(value)){
      card.style.display = "block";
    }else{
      card.style.display = "none";
    }
  });
});

function highLight(text, value){
  if(!value) return text;
  const regex = new RegExp(`(${value})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}


// document.addEventListener("DOMContentLoaded", function () {
//   const occasionSelect = document.getElementById("occasionfilter");
//   const toneSelect = document.getElementById("tonefilter");
//   const cards = document.querySelectorAll(".card");

//   function filterCards() {
//     const selectedOccasion = occasionSelect.value;
//     const selectedTone = toneSelect.value;

//     cards.forEach(card => {
//       const cardOccasion = card.getAttribute("data-occasion");
//       const cardTone = card.getAttribute("data-tone");

//       const occasionMatch = (selectedOccasion === "all" || cardOccasion === selectedOccasion);
//       const toneMatch = (selectedTone === "all" || cardTone === selectedTone);

//       if (occasionMatch && toneMatch) {
//         card.style.display = "block"; // Show card
//       } else {
//         card.style.display = "none"; // Hide card
//       }
//     });
//   }

//   // Attach event listeners
//   occasionSelect.addEventListener("change", filterCards);
//   toneSelect.addEventListener("change", filterCards);

//   filterCards();
//   // console.log(filterCards)
// });


// script.js
// const filterSelect = document.getElementById("occasionfilter");
// const cards = document.querySelectorAll(".card");

// filterSelect.addEventListener("change", () => {
//   const selected = filterSelect.value.toLowerCase();

//   cards.forEach(card => {
//     const occasion = card.getAttribute("data-occasion").toLowerCase();
//     const tone = card.getAttribute("data-tone").toLowerCase();

//     if (selected === "" || occasion === selected || tone === selected) {
//       card.style.display = "block";
//     } else {
//       card.style.display = "none";
//     }
//   });
// });

  

// const searchInput = document.getElementById("search");
// const occasionfilter = document.getElementById("occasionfilter");
// const tonefilter = document.getElementById("tonefilter");
// const cards = document.querySelectorAll(".card");

// function filterTemplates(){
//   const searchValue = searchInput.value.toLowerCase();
//   const occasionValue = occasionfilter.value.toLowerCase();
//   const toneValue = tonefilter.value.toLowerCase();

//   cards.forEach(card => {
//     const text = card.querySelector(".card-content p").innerText.toLowerCase();
//     const occasion = card.dataset.occasion.toLowerCase();
//     const tone = card.dataset.tone.toLowerCase();

//     const matchesSearch = text.includes(searchValue);
//     const matchesOccasion = occasionValue === "all" || occasion === occasionValue;
//     const matchesTone = toneValue === "all" || tone === toneValue;

//     if(matchesSearch && matchesOccasion && matchesTone){
//       card.style.display = "block";
//     }else{
//       card.style.display = "none";
//     }
//   });
// }

// searchInput.addEventListener("input", filterTemplates);
// occasionfilter.addEventListener("change", filterTemplates);
// tonefilter.addEventListener("change", filterTemplates);

// function searchContent(){
//   filterTemplates();
// }



// const toggle = document.getElementById("menu-bar");
// const navLinks = document.getElementById("nav-links");
// const menuIcon = document.getElementById("menu-icon");

// toggle.addEventListener("click", () => {
//   navLinks.classList.toggle("show");

//   // Swap icon between hamburger and close
//   if (menuIcon.classList.contains("fa-bars")) {
//     menuIcon.className = "far fa-times"; // close icon
//   } else {
//     menuIcon.className = "fas fa-bars"; // hamburger icon
//   }
// });



// const toggle = document.getElementById("menu-bar");
// const navLinks = document.getElementById("nav-links")

// toggle.addEventListener("click", () => {
//   navLinks.classList.toggle("show");
// });


// document.querySelectorAll(".copy-btn").forEach(btn => {
//   btn.addEventListener('click', () => {
//     // Find the parent card
//     const card = btn.closest('.card');
//     // Get the message text inside this card
//     const message = card.querySelector('.card-content p').innerText;

//     // Copy to clipboard
//     navigator.clipboard.writeText(message).then(() => {
//       const toast = document.getElementById('toast');
//       toast.classList.add('show');
//       setTimeout(() => {
//         toast.classList.remove('show');
//       }, 2000); // hide after 2 seconds
//     }).catch(err => {
//       console.error("Failed to copy: ", err);
//     });
//   });
// });


// document.querySelectorAll(".copy-btn").forEach(btn => {
//   btn.addEventListener('click', () => {
//     const message = btn.closest('.card-content').querySelector('p').innerText;
//     navigator.clipboard.writeText(message).then(() => {
//       const toast = document.getElementById('toast');
//       toast.classList.add('show');
//       setTimeout(() => {
//         toast.classList.remove('show');
//       }, 2000); // hide after 2 seconds
//     }).catch(err => {
//       console.error("Failed to copy: ", err);
//     });
//   });
// });



// function copyMessage(btn) {
//   const card = btn.closest(".card");
//   const message = card.querySelector(".card-content").innerText;

//   navigator.clipboard.writeText(message).then(() => {
//     showToast("Message copied to clipboard!");
//   });
// }
// // Toggle show more / show less
// function toggleMessage(btn) {
//   const card = btn.closest(".card");
//   const content = card.querySelector(".card-content");

//   if (content.classList.contains("expanded")) {
//     content.classList.remove("expanded");
//     btn.innerText = "Show more";
//   } else {
//     content.classList.add("expanded");
//     btn.innerText = "Show less";
//   }
// }

// // Show toast notification
// function showToast(text) {
//   const toast = document.createElement("div");
//   toast.className = "toast";
//   toast.innerText = text;
//   document.body.appendChild(toast);

//   setTimeout(() => toast.classList.add("show"), 100);
//   setTimeout(() => {
//     toast.classList.remove("show");
//     setTimeout(() => toast.remove(), 300);
//   }, 2000);
// }

// // Automatically hide "Show more" if not needed
// window.onload = () => {
//   document.querySelectorAll(".card").forEach(card => {
//     const content = card.querySelector(".card-content");
//     const toggleBtn = card.querySelector(".toggle-btn");

//     if (content.scrollHeight <= content.clientHeight) {
//       toggleBtn.style.display = "none"; // hide button if text fits
//     }
//   });
// };



// Copy message text
// function copyMessage(btn) {
//   const card = btn.closest(".card");
//   const message = card.querySelector(".card-content").innerText;

//   navigator.clipboard.writeText(message).then(() => {
//     alert("copied!");
//   });
// }

// // Toggle show more / show less
// function toggleMessage(btn) {
//   const card = btn.closest(".card");
//   const content = card.querySelector(".card-content");

//   if (content.classList.contains("expanded")) {
//     content.classList.remove("expanded");
//     btn.innerText = "Show more";
//   } else {
//     content.classList.add("expanded");
//     btn.innerText = "Show less";
//   }
// }



// let generatedLink = "";

// function generateLink() {
//     const sender = document.getElementById("sender").value;
//     const recipient = document.getElementById("recipient").value;
//     const occasion = document.getElementById("occasion").value;
//     const theme = document.getElementById("theme").value;
//     const msg = document.getElementById("message").value;
//     if (!msg) {
//         alert("please enter a message");
//         return;
//     }

//     const data = {
//         sender,
//         recipient,
//         occasion,
//         theme,
//         msg
//     };

//     const encoded = encodeURIComponent(JSON.stringify(data));
//     const link = window.location.origin + window.location.pathname +  "?data=" + encoded;

//     document.getElementById("link").innerHTML =
//     `Share this link: <a href="${link}" target="_blank">${link}</a>`;
// }
// // Show share buttom
// document.getElementById("share-buttons").style.display = "block";

// //Save link globally
// window.generatedLink = link;

// //whatsapp
// function shareWhatsapp(){
//     const url = "https://wa.me/?text=" + encodeURIComponent("Check out this message:" + window.generatedLink);
//     window.open(url, "_blank");
// }

// //copy
// function copyLink(){
//     navigator.clipboard.writeText(window.generatedLink).then(() => {
//         alert("Link copied to clipboard!")
//     });
// }

// window.onload = () =>{
//     const params = new URLSearchParams(window.location.search);
//     const data = params.get("data")
//     if(data){
//         try{
//             const parsed = JSON.parse(decodeURIComponent(data));
//             let header = "";
//             if (parsed.sender) header += `From: ${parsed.sender}<br>`;
//             if (parsed.recipient) header += `To: ${parsed.recipient}<br>`;
//             if (parsed.occasion) header += `Occasion: ${parsed.occasion}<br>`;
//             if (parsed.theme) header += `Theme: ${parsed.theme}<br>`;

//             // if (parsed.recipient) header += "To: " + parsed.recipient + "\n";
//             // if (parsed.occasion) header += "occasion: " + parsed.occasion + "\n";
//             // if (parsed.theme) header += "theme: " + parsed.theme + "\n";

//             document.getElementById("preview").innerHTML = header + "<br>Message:<br>" + parsed.msg;
//         } catch (e){
//             document.getElementById("preview").innerText = " Invalid message data";
//         }
//     }
// };


// window.onload = () => {};
// const emojis = ["❤️", "🎈", "💘", "💞", "🎉", "💓", "💝"];
// const container = document.getElementById("#float-container");

// function createFloatingItems(){
//     const item = document.createElement("div");
//     item.classList.add(".floating-item");

//     // Random emojis
//     item.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
//     //Raandom position
//     item.style.left = Math.random() * 100 + "vw";

//     //Random size
//     const size = Math.random() * 20 + 20;
//     item.style.fontSize = size + "px";

//     //Random Animation Speed
//     const duration = Math.random() * 5 + 5;
//     item.style.animationDuration = duration + "s";

//     container.appendChild(item);

//     setTimeout(() => {
//         item.remove();
//     }, duration * 1000);
// }
// setInterval(createFloatingItems, 500);