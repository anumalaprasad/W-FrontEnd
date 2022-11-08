import { useState, useEffect } from "react"; 
import getBlockchain from './ethereum.js';
 
import "./App.css";
 
function App() {
  // Property Variables

  const [currentAcc, setCurrentAcc] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [contractInstance, setContractInstance] = useState("")
  const [tokenURI, setTokenURI] = useState("")
  const [hasMinted, setMinted] = useState(false)
  // Helper Functions

  useEffect(() => {
    const init = async () => {
      
      const { contractAddress, contractInstance, currentAcc } = await getBlockchain();
      setCurrentAcc(currentAcc)
      setContractAddress(contractAddress)
      setContractInstance(contractInstance)
      // console.log(currentAcc);
      // console.log(contractAddress);
      // console.log(contractInstance);
      const hasMinted = await contractInstance.hasMinted(currentAcc);
      setMinted(hasMinted)
      console.log(hasMinted)

      const tokenId = await contractInstance.uriTokenIDMap(currentAcc);
      const tokenURI_ = await contractInstance.tokenURI(tokenId);
      setTokenURI("0x"+tokenURI_)

       
    };
    init();
  }, []); 
  
  async function mintNFT() {
    const { contractInstance } = await getBlockchain();
    setContractInstance(contractInstance);

    const tx = await contractInstance
        .mintUsingEth({ value:1000000000000000 }) 

      await tx.wait();
       
      const hasMinted = await contractInstance.hasMinted(currentAcc);
      setMinted(hasMinted)

      const tokenId = await contractInstance.uriTokenIDMap(currentAcc);
      const tokenURI_ = await contractInstance.tokenURI(tokenId);
      setTokenURI("0x"+tokenURI_)


 
  }

  // Return
  return (
    <div className="App">
      <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1>Witlab.sol</h1>
          <p>(Network: BSC testnet)</p>
          <p  >1. Soulable NFT</p>
          <p  >2. Mint Address as an NFT</p>
          <p  >3. Non transferrable</p>
           
          
        </div>
         
        <div className="custom-buttons">
          <p>Contract Address: <a href="https://testnet.bscscan.com/address/0x46886549d8b68c36724d94d2c9838ffeb8afd689" style={{textDecoration:"none", color: "orange"}}>{contractAddress}</a></p>
          <p>Address: {currentAcc}</p> 
          {hasMinted
            ? <p>Minted (tokenURI) : {tokenURI}</p>
            : <div>
                <button onClick={mintNFT} style={{ backgroundColor: "red" }}>
                  Mint using BNB
                </button>
                <p>Cost 0.001 BNB</p>
              </div>
            }
          


        </div> 
         

        {/* Current Value stored on Blockchain */}
        {/* <h2 className="greeting">Greeting: {currentGreeting}</h2> */}
      </div>
    </div>
  );
}

export default App;