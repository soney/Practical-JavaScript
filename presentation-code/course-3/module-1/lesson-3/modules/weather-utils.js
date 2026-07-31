export function fahrenheitToCelsius(temp) {
    return (temp - 32) * 5/9;
}

export function celsiusToFahrenheit(temp) {
    return (temp * 9/5) + 32;
}

export default function (temp_f) {
    return fahrenheitToCelsius(temp_f) <= 0;
}