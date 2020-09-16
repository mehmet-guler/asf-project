function required(value) {
    console.log("girdi")
    return value ? true : false;
}

function min(value, minValue) {
    return parseInt(value) > (minValue - 1);
}

function max(value, maxValue) {
    return parseInt(value) < (maxValue + 1);
}

function minLength(value, minLengthValue) {
    return value.length > (minLengthValue - 1);
}


function maxLength(value, maxLengthValue) {
    return value.length < (maxLengthValue + 1)
}

function customValidate(value, func) {
    return typeof func === "function" ? func(value) : func.value(value);
}

export {
    required,
    min,
    max,
    minLength,
    maxLength,
    customValidate
}

