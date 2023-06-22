export const { min, max, abs, round, PI } = Math;
export const { parseFloat: float, parseInt: int, isFinite: isNumeric } = Number;

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

/**
 * Angle value in degrees, it must be between 0 and 360.
 *
 * @param angle - Angle.
 * @returns - Normalized angle value.
 */
export const normalizeAngle = (angle: number) => {
    return ((round(angle) % 360) + 360) % 360;
};
