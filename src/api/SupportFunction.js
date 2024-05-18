const ztoUTC = (zString) => {
    // Original UTC time string
    let utcTimeString = zString;

    // Create a Date object from the UTC time string
    let utcDate = new Date(utcTimeString);

    // Convert UTC time to milliseconds since epoch
    let utcMillis = utcDate.getTime();

    // Calculate offset in milliseconds for UTC+7 (7 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    let offsetMillis = 7 * 60 * 60 * 1000;

    // Add the offset to the UTC time
    let utcPlus7Millis = utcMillis + offsetMillis;

    // Create a new Date object for the new time
    let utcPlus7Date = new Date(utcPlus7Millis);

    // Format the new date to the desired string format (ISO 8601 without timezone)
    let utcPlus7TimeString = utcPlus7Date.toISOString().replace('Z', '');

    return utcPlus7TimeString
}

export default ztoUTC