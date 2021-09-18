# Templates

https://solana.com/news/getting-started-with-solana-development

https://github.com/solana-labs/dapp-scaffold

https://github.com/solana-labs/solana-program-library

# Deploy a smart contract

Update solana-cli to the latest version:

```
solana-install update
```

Create a wallet to do the deploys, or use solflare to download/upload a keypair (bytes array representing the wallet private key) to use. Instructions:

```
https://docs.solana.com/wallet-guide/file-system-wallet
```

[Connect to the desired chain (mainnet, devnet, testnet etc)](https://docs.solana.com/cli/choose-a-cluster)
```
solana config set --url https://api.devnet.solana.com
```

Using the https://github.com/solana-labs/dapp-scaffold template, compile the contract in the `/program` folder, via

```
cargo build-bpf
```

Then after compiling, deploy via

```bash
# solana program deploy --keypair <keypair-path> <.so-file-path>
solana program deploy --keypair /Users/stevenli/my-solana-wallet/my-keypair.json /Users/stevenli/Documents/github/solana-ignite/contract-coding/dapp-scaffold/program/target/deploy/bpf_program_template.so 
```

Then it will give the address of the deployed program (smart contract), run the below to get more details

```bash
solana program show A8ERPPrFQNx2o73MnXjGXJ3JiK8FujBojigyc2GMFTYL
```
