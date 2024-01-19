export const { min, max, abs, round, PI } = Math;
export const int = parseInt;
/**
 * Keeps a number in a range.
 *
 * @param number - A number to keep it between two numbers.
 * @param upperBound - Max.
 * @param lowerBound - Min.
 * @returns
 */
export const boundNumber = (
    number: number,
    upperBound = 100,
    lowerBound = 0,
) =>
    number > upperBound
        ? upperBound
        : number < lowerBound
          ? lowerBound
          : number;

/**
 * Angle value in degrees, it must be between 0 and 360.
 *
 * @param angle - Angle.
 * @returns - Normalized angle value.
 */
export const normalizeAngle = (angle: number) =>
    ((round(angle) % 360) + 360) % 360;
