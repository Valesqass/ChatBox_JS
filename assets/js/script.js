class App {
  static messages = [];

  static sendMessageA() {
    let messageA = document.getElementById("newMessageA").value;

    App.messages.push(new Message(messageA, "a"));

    console.log(App.messages);

    document.querySelector("#newMessageA").value = "";

    App.refreshChat();
  }

  static sendMessageB() {
    let messageB = document.getElementById("newMessageB").value;

    App.messages.push(new Message(messageB, "b"));

    console.log(App.messages);

    document.querySelector("#newMessageB").value = "";

    App.refreshChat();
  }

  static refreshChat() {
    let divA = document.querySelector(".convA");
    let divB = document.querySelector(".convB");

    let msgContainerA = document.createElement("div");
    let msgContainerB = document.createElement("div");

    const element = App.messages[App.messages.length - 1];

    let msg = document.createElement("span");
    msg.classList.add("msg");
    msg.innerHTML = "<div class='body'> " + element.message + " </div>";
    msg.innerHTML += "<div class='footer'> " + element.timeStr + "</div>";

    msgContainerA.appendChild(msg.cloneNode(true));
    msgContainerB.appendChild(msg);

    if (element.from === "a") {
      msgContainerA.classList.add("right-conv");
      divA.appendChild(msgContainerA);

      msgContainerB.classList.add("left-conv");
      divB.appendChild(msgContainerB);
    } else {
      msgContainerB.classList.add("right-conv");
      divB.appendChild(msgContainerB);

      msgContainerA.classList.add("left-conv");
      divA.appendChild(msgContainerA);
    }

    divA.scroll({ top: divA.scrollHeight, behavior: "smooth" });
    divB.scroll({ top: divB.scrollHeight, behavior: "smooth" });
  }
}

class Message {
  constructor(msg, from) {
    this.message = msg;
    this.from = from;
    this.time = new Date(Date.now());
    this.timeStr = this.time.toLocaleTimeString();
  }
}

function ready(callback) {
  if (document.readyState != "loading") callback();
  else if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", callback);
  else
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState == "complete") callback();
    });
}

ready(function () {
  const btnUserA = document.querySelector(".btnUserA");
  const btnUserB = document.querySelector(".btnUserB");

  btnUserA.addEventListener("click", function (e) {
    App.sendMessageA();
  });

  btnUserB.addEventListener("click", function (e) {
    App.sendMessageB();
  });
});
