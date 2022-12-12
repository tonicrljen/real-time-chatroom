import { formatDistance } from "date-fns";
import "./chat.js";

// render the chat templates to the DOM
// clear the list of chats (when the room changes)

class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = "";
  }
  render(data) {
    const createdAt = data.created_at.toDate();
    const when = formatDistance(createdAt, Date.now(), {
      addSuffix: true,
    });
    const html = `
            <li class="list-group-item">
            <span class="username">${data.username}:</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
            </li>
        `;

    this.list.innerHTML += html;
  }
}

export { ChatUI };
