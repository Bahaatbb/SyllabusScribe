// mobx lite
import { enableStaticRendering } from "mobx-react-lite";
// store imports
import UserStore from "./user";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  user: UserStore;

  constructor() {
    this.user = new UserStore(this);
  }
}
