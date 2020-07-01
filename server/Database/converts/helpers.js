exports.parseDate = date => {
    if (!date) return undefined;
    const arr = date.split("/");
    const day = Number(arr[0]);
    const month = Number(arr[1]) - 1;
    const year = Number(arr[2]);
    return new Date(year, month, day);
};

exports.phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
