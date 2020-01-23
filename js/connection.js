class Connection {

  constructor(
    urls, // дві силки socket, http
    formatMessage = parseJsonObj,
    getTopic = (msg) => msg.TOPIC,
    onOpen = () => { },
  ) {
    this.formatMessage = formatMessage;
    this.getTopic = getTopic;
    this.urls = urls; // config
    this.listeners = {};
    this.subscribedTopics = [];
    this.queue = []; // wait until socket is opened

    if (WebSocket !== undefined) {
      console.log('socket')
      this.socket = new QWebSocket(this.urls.webSocket,
        (msg) => {
          this.notifyListeners(msg, (info, msg) => {
            console.error(info, msg);
            this.socket.close();
          });
        },
        (err) => {
          console.error("WebSocket error", err);
          this.socket.close();
          this.socket = null;
        },
        onOpen
      );
    } else {
      this.socket = null;
    }
  }

  send(topic, message) {
    console.log('send')
    if (this.socket === null) { // !== рефакторинг
      console.log('send socket')
      this.socket.send(message);
    } else {
      console.log('send longPoll')
      this.longPoll(topic, message); //передача одного параметра
    }
  }

  get(url, listener) {
    this.request("GET", url, null, listener);
  }

  post(url, data, listener) {  // принимає 3 параметра, получає 2
    this.request("POST", url, data, listener);
  }

  request(method, url, data, listener) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        if (xhr.responseText) {
          listener(xhr.responseText); // без this, лишній парс
        }
      } else {
        listener(null);
      }
    }
    xhr.onerror = () => listener(null);
    xhr.open(method, this.urls.webApi + url, true);
    xhr.send(data);
  }

  longPoll(topic, message) {
    this.post(message, {}, (response) => {  // data, listener
      if (response !== null) {
        this.notifyListeners(response); // зычем два параметра
      }
      if (this.listeners[topic] !== undefined) {
        this.longPoll(topic, message);
      }
    });
  }

  notifyListeners(
    message,
    onError = (info, msg) => console.error(info, msg)
  ) {
    const formatted = this.formatMessage(message);
    if (formatted === null) {
      onError("Invalid format", message);
      return;
    }
    const topic = this.getTopic(formatted);
    if (topic === null) {
      onError("Cannot get topic", formatted);
      return;
    }

    if (this.listeners[topic.toLowerCase()] === undefined) return;

    this.listeners[topic.toLowerCase()].forEach((listener) => {
      listener(formatted);
    });
  }

  // OK
  subscribe(topic, message, listener) {
    if (!(topic in this.subscribedTopics)) {
      if (message === null) {
        console.warn("Subscribing to topic without sending message");
      } else {
        this.subscribedTopics.push(topic);
        this.send(topic, message);
      }
    }
    if (this.listeners[topic] !== undefined) {
      this.listeners[topic].push(listener);
    } else {
      this.listeners[topic] = [listener];
    }
  }

  // OK
  unsubscribe(listenerForTopic) {
    for (let [topic, listeners] of Object.entries(this.listeners)) {
      const index = listeners.indexOf(listenerForTopic);
      if (index !== -1) {
        listeners.splice(index, 1);
        if (listeners.length === 0) {
          this.unsubscribeAll(topic);
        }
        return true;
      }
    }
    return false;
  }

  unsubscribeAll(topic) {
    delete this.listeners[topic];
    this.subscribedTopics.splice(this.subscribedTopics.indexOf(topic), 1);
  }

}

class QWebSocket {
  constructor(url, onMessage, onError = console.error, onOpen = () => { }) {
    this.onMessage = onMessage;
    this.onError = onError;
    this.queue = [];

    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      onOpen();
      for (let message of this.queue) {
        this.socket.send(message);
      }
      this.queue = [];
    }
    this.socket.onerror = onError;
    this.socket.onmessage = onMessage;
  }

  send(message) {
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        this.queue.push(message);
        break;
      case WebSocket.OPEN:
        this.socket.send(message);
        break;
      default:
        this.onError("Sending message to closed WebSocket, msg=" + message);
    }
  }

  close() {
    this.socket.close();
  }

}

function parseJsonObj(str) {
  try {
    let val = JSON.parse(str);
    if (typeof val === 'object' && val.constructor === Object) {
      return val;
    }
    return null;
  } catch (e) {
    return null;
  }
}