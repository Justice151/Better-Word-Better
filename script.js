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

    function saveToLocalStorage(text) {
        localStorage.setItem("text", text);
    }
});
