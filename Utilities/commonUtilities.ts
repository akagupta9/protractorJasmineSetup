export class CommonUtilities {

    getCurrentDateTimeAsString() {
        let today = new Date();
        let date = today.toDateString().toString().replace(new RegExp(' ', 'g'), '');
        let hour = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();
        return date + '_' + hour + '_' + min + '_' + sec;
    }
}