module.exports = class UserApi {
  // ------------------------------ create constructor -------------------------------
  constructor() {
    this.CHUNKLOAD = 10;
    this.QUERRYUSERS = 50;
    this.STARTPAGE = 1;
    this.CURPAGE = 1;
    this.SERVER = 'https://randomuser.me/api';
    this.PAGEOPTION = `page=${this.STARTPAGE}`;
    this.PAGPAGEOPTION = `page=${this.CURPAGE}`;
    this.SEEDOPTION = 'seed=abc';
    this.RESOPTION = `results=${this.QUERRYUSERS}`;
    this.CHUNKOPTION = `results=${this.CHUNKLOAD}`;
  }

  async getData(url) {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Failed to get data at address ${url}`);
  }

  getUsers() {
    return this.getData(this.SERVER);
  }

  getAllUsers() {
    return this.getData(`${this.SERVER}?${this.RESOPTION}&${this.SEEDOPTION}`);
  }

  getStartPage() {
    return this.getData(
      `${this.SERVER}?${this.PAGEOPTION}&${this.CHUNKOPTION}&${this.SEEDOPTION}`,
    );
  }

  getUsersChunk() {
    return this.getData(
      `${this.SERVER}?${this.PAGEOPTION}&${this.RESOPTION}&${this.SEEDOPTION}`,
    );
  }

  setPageOption() {
    this.PAGPAGEOPTION = `page=${this.CURPAGE}`;
  }
};
