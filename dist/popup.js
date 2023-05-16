document.addEventListener('DOMContentLoaded', function() {
    const isSmallButton = document.getElementById('is_small_check');
    const completedColorInput = document.getElementById('complete_color');
    const incompleteColorInput = document.getElementById('incomplete_color');


    // Get current isSmall value.
    chrome.storage.local.get('isSmall', function (result) {
        isSmallButton.checked = result.isSmall || false;
    });

    // Get current isSmall value.
    chrome.storage.local.get('completedColor', function (result) {
        completedColorInput.value = result.completedColor || '#8fc7a6';
    });

    // Get current isSmall value.
    chrome.storage.local.get('incompletedColor', function (result) {
        incompleteColorInput.value = result.incompletedColor || '#ffd3d3';
    });

    // Add event listeners.
    isSmallButton.addEventListener('change', isSmallChanged, false);
    completedColorInput.addEventListener('change', completedColorInputChanged, false);
    incompleteColorInput.addEventListener('change', incompletedColorInputChanged, false);
}, false);

function completedColorInputChanged() {
    const colorInput = document.getElementById('complete_color');
    chrome.storage.local.set({completedColor: colorInput.value}, function () {});
}

function incompletedColorInputChanged() {
    const colorInput = document.getElementById('incomplete_color');
    chrome.storage.local.set({incompletedColor: colorInput.value}, function () {});
}

function isSmallChanged() {
    const isSmallButton = document.getElementById('is_small_check');
    chrome.storage.local.set({isSmall: isSmallButton.checked}, function () {});
}
