import { inject, IRouter } from "aurelia";
import { WalletService } from "../../services/wallet-service";
import { Wallet } from "../../types/wallet";

@inject(WalletService, IRouter)
export class Transfer {
  wallets: Wallet[] = [];
  receiver: string = "";
  sender: string = "";
  price: number = 0;
  get senderList(): Wallet[] {
    return this.wallets.filter((wallet) => wallet.address !== this.receiver);
  }
  get recieverList(): Wallet[] {
    return this.wallets.filter((wallet) => wallet.address !== this.sender);
  }

  constructor(
    private walletService: WalletService,
    @IRouter private router: IRouter
  ) {
    this.wallets = this.walletService.wallets;
  }

  async transfer(e) {
    e.preventDefault();
    const senderWallet = this.wallets.find(
      (wallet) => wallet.address === this.sender
    );
    const receiverWallet = this.wallets.find(
      (wallet) => wallet.address === this.receiver
    );

    try {
      console.log("call transfer");
      const test = await this.walletService.transfer(
        senderWallet.pk,
        receiverWallet.pk,
        this.price
      );
    } catch (e) {
      console.log(e);
    }
    this.walletService.refreshAllBalances();
    await this.router.load("/");
  }

  onClick(button) {
    button.innerHTML = "<span class='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span> Processing Transfer...";
  }
}
