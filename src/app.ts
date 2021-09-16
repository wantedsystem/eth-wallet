import { ICustomElementViewModel } from "@aurelia/runtime-html";
import { MyWallets } from "./components/my-wallets/my-wallets";
import { Transfer } from "./components/transfer/transfer";
import { Wallet } from "./types/wallet";

export class App implements ICustomElementViewModel {
  wallets: Wallet[];

  static routes = [
    {
      path: "transfer",
      id: "transfer",
      component: Transfer,
    },
    {
      path: "",
      id: "my-wallets",
      component: MyWallets,
    },
  ];
}
