export default class ChatAPIService {
  static async ChatMsg(key, body) {
    try {
      const resp = await fetch(`http://127.0.0.1:5000/chat/${key}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await resp.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async loadResume(key) {
    try {
      const resp = await fetch(`http://127.0.0.1:5000/get/${key}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await resp.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async loadUser() {
    try {
      const resp = await fetch(`http://localhost:5000/user/login/details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await resp.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async updateResume(body) {
    try {
      const resp = await fetch(`http://127.0.0.1:5000/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await resp.json();
    } catch (error) {
      return console.log(error);
    }
  }
}
