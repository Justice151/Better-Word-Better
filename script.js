document.addEventListener("DOMContentLoaded", function() {
    var editor = document.getElementById("editor");

    // Save text to localStorage when user stops typing
    editor.addEventListener("input", function() {
        saveToLocalStorage(editor.innerHTML);
    });

    // Load text from localStorage when the page loads
    var savedText = localStorage.getItem("text");
    if (savedText) {
        editor.innerHTML = savedText;
    }

    // Save button functionality
    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", function() {
        saveToLocalStorage(editor.innerHTML);
        alert("Document saved to local storage!");
    });

    // Toggle style buttons
    var boldBtn = document.getElementById("boldBtn");
    var italicBtn = document.getElementById("italicBtn");
    var underlineBtn = document.getElementById("underlineBtn");

    var isBold = false;
    var isItalic = false;
    var isUnderline = false;

    boldBtn.addEventListener("click", function() {
        isBold = !isBold;
        document.execCommand("bold");
        boldBtn.classList.toggle("active", isBold);
    });

    italicBtn.addEventListener("click", function() {
        isItalic = !isItalic;
        document.execCommand("italic");
        italicBtn.classList.toggle("active", isItalic);
    });

    underlineBtn.addEventListener("click", function() {
        isUnderline = !isUnderline;
        document.execCommand("underline");
        underlineBtn.classList.toggle("active", isUnderline);
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault(); // Prevent the default browser save action
            saveToLocalStorage(editor.innerHTML);
            alert("Document saved to local storage!");
        }
        else if (event.ctrlKey && event.key === "b") {
            isBold = !isBold;
            document.execCommand("bold");
            boldBtn.classList.toggle("active", isBold);
        }
        else if (event.ctrlKey && event.key === "i") {
            isItalic = !isItalic;
            document.execCommand("italic");
            italicBtn.classList.toggle("active", isItalic);
        }
        else if (event.ctrlKey && event.key === "u") {
            isUnderline = !isUnderline;
            document.execCommand("underline");
            underlineBtn.classList.toggle("active", isUnderline);
        }
    });

    function saveToLocalStorage(text) {
        localStorage.setItem("text", text);
    }

    // Background color change based on scroll position
    window.addEventListener("scroll", function() {
        var scrollPercent = (document.documentElement.scrollTop + window.innerHeight) / document.documentElement.scrollHeight;
        var color = interpolateColor("#007bff", "#ffffff", scrollPercent);
        document.body.style.backgroundColor = color;
    });

    function interpolateColor(color1, color2, percent) {
        var r1 = parseInt(color1.substring(1, 3), 16);
        var g1 = parseInt(color1.substring(3, 5), 16);
        var b1 = parseInt(color1.substring(5, 7), 16);

        var r2 = parseInt(color2.substring(1, 3), 16);
        var g2 = parseInt(color2.substring(3, 5), 16);
        var b2 = parseInt(color2.substring(5, 7), 16);

        var r = Math.round(r1 + (r2 - r1) * percent);
        var g = Math.round(g1 + (g2 - g1) * percent);
        var b = Math.round(b1 + (b2 - b1) * percent);

        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
});
