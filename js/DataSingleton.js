class DataSingleton {
  constructor() {
    if (!DataSingleton.instance) {
      this.label = "Singleton Data";
      this.confidence = 0.0;
      DataSingleton.instance = this;
    }
    return DataSingleton.instance;
  }
}

const instance = new DataSingleton();
Object.freeze(instance);
export default instance;
