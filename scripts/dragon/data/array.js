ARRAY = {
    removeLast: function (arr) {
        arr.splice(-1, 1);
    },
    last: function (arr) {
        return arr[arr.length - 1];
    },
    first: function (arr) {
        return arr[0];
    },
    penultimate: function (arr) {
        return arr[arr.length - 2];
    },
    contains: function (arr, value) {
        if (arr === undefined || arr === null) return false;
        return arr.indexOf(value) !== -1;
    },
    existIn: function (obj, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    },
    deleteQuery: function (arr, func) {
        return arr.splice(arr.findIndex(func), 1);
    },
    unique: function uniq(a) {
        return Array.from(new Set(a));
    }
};
