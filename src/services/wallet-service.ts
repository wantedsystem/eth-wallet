import { Wallet } from "../types/wallet";
import { ethers } from "ethers";

export class WalletService {
  constructor() {
    this.load();
  }

  wallets: Wallet[] = [];
  provider = new ethers.providers.InfuraProvider(
    "rinkeby",
    "944ad2bab2fc468392de3a9be6602ef4"
  );

  async refreshAllBalances() {
    for (let index in this.wallets) {
      this.wallets[index].balance = await this.getBalance(
        this.wallets[index].address
      );
    }
  }

  getBalance(address) {
    return this.provider.getBalance(address).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance);
      return balanceInEth;
    });
  }

  async addWallet() {
    const randomWallet = ethers.Wallet.createRandom();
    console.log(randomWallet);
    const balance = await this.getBalance(randomWallet.address);
    const name = this.getRandomString();
    const pk = randomWallet.privateKey;
    const wallet = {
      ...randomWallet,
      balance,
      name,
      pk,
    };

    this.wallets.push(wallet);
    this.save();
  }

  async transfer(from, to, value) {
    const wallet1 = new ethers.Wallet(from);
    const wallet2 = new ethers.Wallet(to);

    console.log(
      `Attempting to send transaction from ${wallet1.address} to ${wallet2.address}`
    );

    // Create Tx Object
    const tx = {
      to: wallet2.address,
      value: ethers.utils.parseEther(value),
    };

    const connectedWallet = wallet1.connect(this.provider);

    // Sign and Send Tx - Wait for Receipt
    const createReceipt = await connectedWallet.sendTransaction(tx);
    await createReceipt.wait();
    console.log(`Transaction successful with hash: ${createReceipt.hash}`);
  }

  getRandomString() {
    var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = 0; i < 7; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  save() {
    localStorage.setItem("wallets", JSON.stringify(this.wallets));
  }

  load() {
    const data = localStorage.getItem("wallets");
    if (data) {
      try {
        this.wallets = JSON.parse(data) || [];
      } catch {
        this.wallets = [];
      }
    }
  }
}
