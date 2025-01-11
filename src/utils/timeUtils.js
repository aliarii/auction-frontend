// export function calculateTimeLeft(endTime) {
//     const remainingTime = new Date(endTime) - new Date();
//     if (remainingTime <= 0) return "00:00:00";

//     const hours = Math.floor(remainingTime / (1000 * 60 * 60));
//     const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
// }


export function calculateTimeLeft(endTime) {
    const remainingTime = new Date(endTime) - new Date();
    if (remainingTime <= 0) return "0d 00h 00m 00s";

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days > 0 ? days + ":" : ""}${hours > 0 ? String(hours).padStart(2, "0") + ":" : ""}${minutes > 0 ? String(minutes).padStart(2, "0") + ":" : ""}${String(seconds).padStart(2, "0")}`;
}
