const Observable = {
    on(event, observer) {
        if (!this.events.hasOwnProperty(event)) this.events[event] = [];
        this.events[event].push(observer);
    },
    fire(event, ...args) {
        if (this.events[event] instanceof Array)
            this.events[event].forEach(closure => closure.call(this, ...args));
    }
};
export default Observable;