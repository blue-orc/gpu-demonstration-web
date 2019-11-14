export default {
    IsNullOrEmpty(obj) {
      if (!obj) {
        return true;
      }
      return Object.entries(obj).length === 0 && obj.constructor === Object;
    },
    IsArrayNullOrEmpty(arr) {
      return !(arr && arr.length > 0);
    },
    FindByPropertyValue(array, property, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][property] === value) {
          return i;
        }
      }
      return null;
    }
  };
  