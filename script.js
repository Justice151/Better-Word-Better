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
});
