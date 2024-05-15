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

    // Keyboard shortcuts
    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault(); // Prevent the default browser save action
            saveToLocalStorage(editor.innerHTML);
            alert("Document saved to local storage!");
        }
        else if (event.ctrlKey && event.key === "b") {
            document.execCommand("bold");
        }
        else if (event.ctrlKey && event.key === "i") {
            document.execCommand("italic");
        }
        else if (event.ctrlKey && event.key === "u") {
            document.execCommand("underline");
        }
    });

    function saveToLocalStorage(text) {
        localStorage.setItem("text", text);
    }
});
