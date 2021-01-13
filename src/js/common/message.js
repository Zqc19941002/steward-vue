import HeyUI from "heyui";

export function showSuccessMessage(message) {
    HeyUI.$Message({
        type: 'success',
        text: message
    });
}

export function showErrorMessage(message) {
    HeyUI.$Message({
        type: 'error',
        text: message
    })
}
