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

    // Export button functionality
    var exportBtn = document.getElementById("exportBtn");
    exportBtn.addEventListener("click", function() {
        exportText();
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

    function exportText() {
        var textToExport = editor.innerText; // Get the text content of the editor
        var blob = new Blob([textToExport], { type: "text/plain" }); // Create a Blob containing the text
        var url = URL.createObjectURL(blob); // Create a URL for the Blob

        // Create a temporary <a> element to trigger the download
        var a = document.createElement("a");
        a.href = url;
        a.download = "document.txt"; // Set the filename for the download
        document.body.appendChild(a);
        a.click(); // Click the <a> element to trigger the download
        document.body.removeChild(a); // Remove the <a> element
    }
});
