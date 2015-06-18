    // Check if "Worker" exists else notify unsupported browser
    if(typeof(Worker) !== "undefined") {
        console.log('Starting worker')
        worker = new Worker('./worker.js');
        worker.onmessage = function (event) {
            console.log(event)
        }
    } else {
        alert('Your browser no support web worker')
    } 