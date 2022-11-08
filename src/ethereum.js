import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers'; 
 
const contractAddress = "0x46886549d8b68c36724d94d2c9838ffeb8afd689";  
// Import ABI Code to interact with smart contract 
const contractABI =  require('./artifacts/contracts/Witlab.sol/Witlab.json');

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const currentAcc = accounts[0] ;
      // console.log(currentAcc )
      // console.log(contractAddress )
      // console.log(contractABI.abi )
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      // console.log(signer.address )
	   const contractInstance = new Contract(
      contractAddress,
      contractABI.abi,
      signer
	   );
     console.log(contractInstance)
    
    //  console.log(contractInstance.on("NewStake" , ()))
     resolve({ currentAcc, contractInstance, contractAddress });



      return;
    }
    reject('Install/Use Web3 provider like Metamask or Trust Wallet ');
  });

export default getBlockchain;
