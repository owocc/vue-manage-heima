function TokenTools() {
  this.local = {
    save(token) {
      localStorage.setItem("token", token);
    },
    get() {
      const token = localStorage.getItem("token");
      if (token == null) {
        return false;
      }
      return token;
    },
    clear() {
        localStorage.removeItem('token')
    },
  };

  this.session = {
    save(token) {
      sessionStorage.setItem("token", token);
    },
    get() {
      const token = sessionStorage.getItem("token");
      if (token == null) {
        return false;
      }
      return token;
    },
    clear() {
      sessionStorage.removeItem('token')
    },
  };
  //Clear all stored tokens
  this.clear = () => {
    this.session.clear();
    this.local.clear();
  };
  //get token
  this.get = () => {
    let token = this.session.get();
    if (token) {
      return token;
    }
    token = this.local.get();
    if (token) {
      return token;
    }
    return false;
  };
}

const tokenTools = new TokenTools();

export default tokenTools;
