document.addEventListener("DOMContentLoaded", function() {
    var editor = document.getElementById("editor");

    // Save text to localStorage when user stops typing
    editor.addEventListener("input", function() {
        localStorage.setItem("text", editor.innerHTML);
    });

    // Load text from localStorage when the page loads
    var savedText = localStorage.getItem("text");
    if (savedText) {
        editor.innerHTML = savedText;
    }
});
