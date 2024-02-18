function formatLastUpdated(dateString) {
    const updatedAt = new Date(dateString);
    const today = new Date();

    if (updatedAt.toDateString() === today.toDateString()) {
        const hours = updatedAt.getHours().toString().padStart(2, '0');
        const minutes = updatedAt.getMinutes().toString().padStart(2, '0');
        return `Today ${hours}:${minutes}`;
    } else if (updatedAt.getFullYear() === today.getFullYear()) {
        return updatedAt.toLocaleDateString(navigator.language, {day: 'numeric', month: 'short'});
    } else {
        return updatedAt.toLocaleDateString(navigator.language, { day: 'numeric' , month: 'short', year: 'numeric'});
    }
}

module.exports = formatLastUpdated;