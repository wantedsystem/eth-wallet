import { bindable, inject } from "aurelia";
import { Wallet } from "../../types/wallet";
import { WalletService } from "../../services/wallet-service";

@inject(WalletService)
export class MyWallets {
  constructor(private walletService: WalletService) {
    this.walletService.refreshAllBalances();
  }

  @bindable wallets: Wallet[] = this.walletService.wallets;

  async addWallet() {
    this.walletService.addWallet();
  }
}
