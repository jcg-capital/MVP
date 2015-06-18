var i = 0;

function timedCount() {
	self.addEventListener('message', function(e) {
		try {
			//postMessage('TYPEOF: '+typeof e.data[0])
			var result = new Function(e.data[0])();
			postMessage('FROM WORKER: '+JSON.stringify(result));
		} catch(err){
			postMessage('ERROR: '+err);
		}
	}, false);
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()",10000);
}

timedCount();