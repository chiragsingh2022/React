function Sessions() {
        const currentYear = new Date().getFullYear();
        const startYear = 2015; // Set the initial start year for the range
        const minSessionRange = 5; // Minimum session range
        const maxSessionRange = 10; // Maximum session range

        // Calculate the difference between the current year and the start year
        const yearDifference = currentYear - startYear;

        // Adjust the session range based on the difference, with limits
        const adjustedSessionRange = Math.min(Math.max(minSessionRange, yearDifference), maxSessionRange);

        const calculatedSessions = Array.from({ length: adjustedSessionRange }, (_, index) => {
            const sessionStartYear = currentYear - index;
            const sessionEndYear = sessionStartYear + 1;
            return `${sessionStartYear}-${sessionEndYear}`;
        });
    return(calculatedSessions);
}

export default Sessions;