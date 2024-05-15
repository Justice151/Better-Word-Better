document.addEventListener("DOMContentLoaded", function() {
    var editor = document.getElementById("editor");
    var docNameInput = document.getElementById("docNameInput");

    // Save text to localStorage when user stops typing or at intervals
    var autosaveTimer;
    editor.addEventListener("input", function() {
        clearTimeout(autosaveTimer);
        autosaveTimer = setTimeout(function() {
            saveToLocalStorage(editor.innerHTML);
            alert("Document autosaved!");
        }, 2000);
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

    // Import button functionality
    var importBtn = document.getElementById("importBtn");
    var importFileInput = document.getElementById("importFile");
    importBtn.addEventListener("click", function() {
        importFileInput.click();
    });

    importFileInput.addEventListener("change", function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function() {
            editor.innerHTML = reader.result;
        };

        reader.readAsText(file);
    });

    // Set Background button functionality
    var bgBtn = document.getElementById("bgBtn");
    var bgUploadInput = document.getElementById("bgUpload");
    bgBtn.addEventListener("click", function() {
        bgUploadInput.click();
    });

    bgUploadInput.addEventListener("change", function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function() {
            document.body.style.backgroundImage = "url('" + reader.result + "')";
        };

        reader.readAsDataURL(file);
    });

    // Document name input functionality
    docNameInput.addEventListener("input", function() {
        updateDocumentTitle();
    });

    // Add Image button functionality
    var addImageBtn = document.getElementById("addImageBtn");
    var imageUploadInput = document.getElementById("imageUpload");
    addImageBtn.addEventListener("click", function() {
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener("change", function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function() {
            var img = new Image();
            img.src = reader.result;
            editor.appendChild(img);
        };

        reader.readAsDataURL(file);
    });

    // Undo button functionality
    var undoBtn = document.getElementById("undoBtn");
    undoBtn.addEventListener("click", function() {
        document.execCommand("undo");
    });

    // Redo button functionality
    var redoBtn = document.getElementById("redoBtn");
    redoBtn.addEventListener("click", function() {
        document.execCommand("redo");
    });

    function saveToLocalStorage(text) {
        localStorage.setItem("text", text);
    }

    function exportText() {
        var textToExport = editor.innerText;
        var blob = new Blob([textToExport], { type: "text/plain" });
        var url = URL.createObjectURL(blob);

        var docName = docNameInput.value.trim() || "document";
        var fileName = docName + ".txt";

        var a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function updateDocumentTitle() {
        var docName = docNameInput.value.trim();
        if (docName !== "") {
            document.title = docName + " - Online Word Program";
        } else {
            document.title = "Online Word Program";
        }
    }
});
