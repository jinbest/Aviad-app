import { action, autorun, configure, observable, makeAutoObservable } from "mobx"

configure({ enforceActions: "always" })

export class StoreDetails {
  @observable storeData: any = {}
  @observable hashCode = ""

  constructor() {
    this.load()
    autorun(this.save)
    makeAutoObservable(this)
  }

  private save = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        StoreDetails.name,
        JSON.stringify({
          storeData: this.storeData,
          hashCode: this.hashCode
        })
      )
    }
  }    

  @action
  private load = () => {
    if (typeof window !== "undefined") {
      Object.assign(this, JSON.parse(window.localStorage.getItem(StoreDetails.name) || "{}"))
    }
  }

  @action
  setStoreData = (storeData: any) => {
    this.storeData = storeData
    this.save()
  }

  @action
  setHashCode = (hashCode: string) => {
    this.hashCode = hashCode
    this.save()
  }

}

export default new StoreDetails()