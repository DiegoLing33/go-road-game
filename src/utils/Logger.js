export default class Logger {

    static log(...msg) {
        console.log("[LOG]: " + msg.join(" "));
    }

}