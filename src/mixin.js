let Mixin = {
    filters: {
        formatDate(val) {
            if (typeof val == 'string') {
                let valArr = val.split(' ');
                let dateAtr = valArr[0];
                return dateAtr.replace(/\-/g, '/');
            } else {
                return "";
            }
        }
    }
};
export default Mixin;
  