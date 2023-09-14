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
      const resp = await fetch(`http://127.0.0.1:5000/api/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        try {
          // Parse the JSON data
          // const data = await resp.json();
          console.log(resp);
          // return data; // This should now contain your user_info
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
          return null;
        }
      } else {
        console.error("Request failed with status:", resp.status);
        console.error("Response text:", await resp.text());
        return null;
      }
    } catch (error) {
      return console.log(error);
    }
  }
}
