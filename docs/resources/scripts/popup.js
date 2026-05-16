// References
const popupWin = document.getElementById("popupWindow");
const popupClose = document.getElementById("popupCloseBtn");
const popupTitleBar = document.getElementById("popupTitleBar");
const popupOpen = document.getElementById("openPosts");
const popupContent = document.getElementById("popupContent");
const popupHome = document.getElementById("popupHome");
const popupIframe = document.getElementById("popupIframe");
const popupBack = document.getElementById("popupBack");

const isThin = window.matchMedia("(max-width: 1130px)").matches;
const closeButton =document.getElementById("popupCloseBtn");

// Make the window visible
popupOpen.addEventListener("click", (e) =>
{
    e.preventDefault(); 
    popupWin.classList.add("open");
});

// Close the window
popupClose.onclick = () =>
{
    popupWin.classList.remove("open");

    setTimeout(() =>
    {
        popupIframe.style.display = "none";
        popupIframe.src = "";
        popupBack.style.display = "none";
        popupHome.style.display = "block";
    }, 500);
};

// Make the window draggable
let offsetX = 0, offsetY = 0, isDown = false;
popupTitleBar.addEventListener("mousedown", function(e)
{
    if (e.target === popupClose || popupClose.contains(e.target)) return;
    isDown = true;
    offsetX = e.clientX - popupWin.offsetLeft;
    offsetY = e.clientY - popupWin.offsetTop;
    e.preventDefault();
});
document.addEventListener("mousemove", function(e)
{
    if (!isDown) return;
    popupWin.style.left = (e.clientX - offsetX) + "px";
    popupWin.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => { isDown = false; });

// Does the browser support MDL2 Assets? This creates a fallback in case it doesn't.
// Not using the BIG-Icons font here because Unicode already has a standard character that looks VERY similar, ✕.

// This function detects if the specified character exists in the font the device is using.
function fontSupportsCharacter(font, character) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = `100px ${font}, monospace`;
    const widthWithFont = ctx.measureText(character).width;
    ctx.font = "100px monospace";
    const widthWithoutFont = ctx.measureText(character).width;
    return widthWithFont !== widthWithoutFont;
}

// Actually change the glyph based on its availability
if (fontSupportsCharacter("Segoe MDL2 Assets", ""))
{
    closeButton.textContent = "";
    closeButton.style.fontFamily = '"Segoe MDL2 Assets", sans-serif';
}
else
{
    closeButton.textContent = "✕";
    closeButton.style.fontFamily = '"Arial", sans-serif';
}

// Load posts into the popup
function loadPost(url) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            popupIframe.srcdoc = ""; // Reset the iframe
            popupIframe.style.display = "block"; // Make it visible
        
            const iframeDoc = popupIframe.contentDocument || popupIframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write('<!DOCTYPE html><html lang="en"><head><title>Post</title>');
            
            iframeDoc.write(`<base href="${window.location.origin}/">`);
            
            // Keep fonts/icons
            const allStyles = document.querySelectorAll('style');
            allStyles.forEach(style => {
                const content = style.textContent;
                if (content.includes('@font-face')) {
                    const fontStyle = document.createElement('style');
                    fontStyle.textContent = content;
                    iframeDoc.head.appendChild(fontStyle);
                }
            });
        
            // This goddamn CSS istg
            /* It needs to be seperate so that the rules for
                thin screens apply to the popup iframe. don't ask why,
                just be thankful it works. */
            /* Anyway, this "line" writes CSS to the iframe so that I
                don't need to do it for every post. */
            iframeDoc.write(`
                <style>
                    html, body {
                        margin: 0;
                        padding: 15px;
                        font-family: "Segoe UI", sans-serif;
                        background: inherit !important;
                        line-height: 1.5;
                    }
                
                    a {
                        color: #0066cc !important;
                        text-decoration: none;
                    }
                    a:hover {
                        color: #0055aa !important;
                    }
                
                    @media (max-width: 1130px) {
                        a {
                            color: #60a5fa !important;
                        }
                        a:hover {
                            color: #93c5fd !important;
                        }
                    }
                </style>
            `);
            
            iframeDoc.write('</head><body>');
            iframeDoc.write(html);
            
            /* Override anything that still tells the text to be white
                on widescreen. (yes this code is messy shut up) */
            const isThin = window.matchMedia("(max-width: 1130px)").matches;
            const targetColor = isThin ? 'white' : 'black';
            
            const textElements = iframeDoc.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, li, strong, em, a');
            textElements.forEach(el => {
                el.style.color = targetColor;
            });
        
            // Same thing as above basically
            iframeDoc.body.style.color = targetColor;
        
            iframeDoc.write('</body></html>'); // Finish writing html
            iframeDoc.close();
        
            iframeDoc.defaultView.scrollTo(0, 0);
        })
        .catch(err => console.error("Error loading post:", err));
}

// Handle clicks, open links
popupContent.addEventListener("click", function(e)
{
    const link = e.target.closest(".popup-link");
    if (!link)
    {
        return;
    }
    e.preventDefault();
    popupHome.style.display = "none";
    popupIframe.style.display = "block";
    popupBack.style.display = "block";
    const url = link.getAttribute("href");
    loadPost(url);
});

// Close the post
popupBack.addEventListener("click", () =>
{
    popupIframe.style.display = "none";
    popupIframe.src = "";
    popupBack.style.display = "none";
    popupHome.style.display = "block";
});

// Function to change button type based on screen size
function selectButtonType(thin)
{
    popupBack.classList.remove("button", "button2", "button3");

    if (thin)
    {
        popupBack.classList.add("button", "button2");
        popupBack.style.height = "32px";
        popupBack.style.fontFamily = `"Segoe UI", sans-serif`;
        popupBack.style.fontWeight = "300";
    }
    else
    {
        popupBack.classList.add("button3");
        popupBack.style.height = "25.5px";
        popupBack.style.fontFamily = `"Segoe UI", sans-serif`;
        popupBack.style.fontWeight = "300";
    }
}

// Make popup text color adaptive on resize
window.addEventListener('resize', () => {
    if (!popupIframe.contentDocument) return;  // iframe not open/loaded yet

    const iframeDoc = popupIframe.contentDocument;
    const isThin = window.matchMedia("(max-width: 1130px)").matches;
    const targetColor = isThin ? 'white' : 'black';

    if (iframeDoc.body) {
        iframeDoc.body.style.color = targetColor;
    }

    const textElements = iframeDoc.querySelectorAll('h1, h2, h3, p, span, div, li, strong, em, a');
    textElements.forEach(el => {
        el.style.color = targetColor;
    });

    selectButtonType(isThin);
});

selectButtonType(isThin);