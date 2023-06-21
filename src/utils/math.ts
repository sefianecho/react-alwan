export const { min, max } = Math;

/**
 * Keeps a number in a range.
 *
 * @param number - A number to keep it between two numbers.
 * @param upperBound - Max.
 * @param lowerBound - Min.
 * @returns
 */
export const boundNumber = (number: number | string, upperBound = 100, lowerBound = 0) => {
    // Assert number as type number if it's a string.
    // Math.max coerce string numbers to numbers.
    return min(max(number as unknown as number, lowerBound), upperBound);
};
