var buff = []

class InterfaceTracker {
    constructor() {
        if(!this.track) {
            throw new Error('Method track not found')
        }
    }

    static trackArguments(event, tags) {
        if(typeof(event) != "string") {
            throw new Error('Argument `event` must be string')
        }
        if(typeof(tags) != "object") {
            throw new Error('Argument `tags` must be object')
        }
    }
}

class ImpSender {
    constructor() {
        this.buff = []
    }

    async sendRequest() {
        this.buff = buff
        buff = []
        let res = await fetch("http://localhost:8001/track", {
            method: 'POST',
            body: JSON.stringify(this.buff),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(await res.json())
    }
}

class ImpTracker extends InterfaceTracker {

    track(event) {
        let array = []
        for(let i = 1; i < arguments.length; i++) array.push(arguments[i]).toString()
        InterfaceTracker.trackArguments(event, array)
        let collection = {
            event: event,
            tags: array,
            url: window.location.href,
            title: document.title,
            tl: new Date().toISOString()
        }
        buff.push(collection)
        if(buff.length >= 3) {
            ImpSender.prototype.sendRequest()
        }
    }
}

setInterval(function() {
    if(buff.length != 0) {
        ImpSender.prototype.sendRequest()
    }
}, 1000)

window.onbeforeunload = function() {
    ImpTracker.prototype.track('pageclose')
    ImpSender.prototype.sendRequest()
};

var tracker = new ImpTracker