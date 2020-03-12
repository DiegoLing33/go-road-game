const Loadable = {
    isReady() {
        return this.ready || false;
    },
    wait(closure){
        const w = setInterval(()=>{
            if(this.ready){
                clearInterval(w);
                closure();
            }
        }, 200);
    }
};

export default Loadable;