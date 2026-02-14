
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
    if (occasion) header += "occasion:" + occasion + "\n";
    if (theme) header += "theme:" + theme + "\n"; 

    document.getElementById("preview").innerHTML = header + "\n" + (msg || "No message yet");
}


function generateLink() {
    const recipient = document.getElementById("recipient").value;
    const occasion = document.getElementById("occasion").value;
    const theme = document.getElementById("theme").value;
    const msg = document.getElementById("message").value;
    if (!msg) {
        alert("please enter a message");
        return;
    }

    const data = {
        recipient,
        occasion,
        theme,
        msg
    };

    const encoded = encodeURIComponent(JSON.stringify(data));
    const Link = window.location.origin + window.location.pathname +  "?data=" + encoded;

    document.getElementById("link").innerHTML =
    "share this link: <a href='" + Link + "'target='_blank'>" + Link + "</a>";
}

window.onload = () =>{
    const params = new URLSearchParams(Window.location.search);
    const data = params.get("data")
    if(data){
        try{
            const parsed = JSON.parse(decodeURIComponent(data));
            let header = "";
            if (parsed.recipient) header += "To: " + parsed.recipient + "\n";
            if (parsed.occasion) header += "occasion: " + parsed.occasion + "\n";
            if (parsed.theme) header += "theme: " + parsed.theme + "\n";
            document.getElementById("preview").innerText = header + "\nMessage:\n" + parsed.msg
        } catch (e){
            document.getElementById("preview").innerText = " Invalid message data";
        }
    }
};


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