import React from 'react'
import {useState } from 'react'
import { ethers } from "ethers"
import { create } from "ipfs-http-client";
import SpinnerExp from '../Spiner';
import { useSelector } from 'react-redux';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'



export default function NewItem() {
  
  const Navigate=useNavigate()
  const account = useSelector((state) => (state.account.value))
  const marketplace = useSelector((state) => (state.marketplace.value))
  const nft = useSelector((state) => (state.nft.value))
  const [image, setImage] = useState(null)
  const [thumbnail, setThumbnail] = useState(true)
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  // const [gaseLessUris, setGasLessUris] = useState([]);  // storing ipfs uris of gaseless minted products  
  // const [error, setError] = useState('Please Conecct MetaMask');
  // const [gaseLessItems, setGasLessItems] = useState([]);  // storing objects of gaseless minted products  
  const [rarity, setRarity] = useState('')
  const [transactionState, setTransactionState] = useState(false);
  
  // const [listingId, setListingId] = useState('');
  // const [listingAmount, setListingAmount] = useState('');
  // const [listingPrice, setListingPrice] = useState('');


  const projectId = "2HfX6IQOQGFnJDbdcqVZAwKVQ1Z";
  const projectSecret = "6e49faf03164af5553f9deb8da903a85";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
  const ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await ipfs.add(file)
        setImage(result.path)
        setThumbnail(false)

      } catch (error) {
        toast("ipfs image upload error: check ypurn internet connection")
      }
    }
  }

  //  ************************* Lazy minting section 

  // const createGaseLess = async () => {
  //   if (!image || !price || !name || !description || !account || !rarity || !amount) return
  //   try {

  //     const result = await ipfs.add(JSON.stringify({ image, name, description, price, amount, account, rarity }))
  //     const uri = result.path;
  //     setGasLessUris([...gaseLessUris, uri]);

  //     const response = await fetch(`https://asadkhan.infura-ipfs.io/ipfs/${result.path}`)
  //     const metadata = await response.json();
  //     setGasLessItems([...gaseLessItems, {
  //       image: metadata.image,
  //       name: metadata.name,
  //       desc: metadata.description,
  //       amount: metadata.amount,
  //       pric: metadata.price,
  //       creater: metadata.account,
  //       urii: uri,
  //       rarity

  //     }])

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const buyLazyMarketItem = async (item) => {
  //   const _amount = item.amount;
  //   const _price = item.pric * _amount;
  //   const priceInWei = ethers.utils.parseEther(_price.toString());
  //   const maker = item.creater;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   // check if the reciver address is a valid address 
  //   ethers.utils.getAddress(maker);
  //   // sending payment
  //   const tx = await (await signer.sendTransaction({
  //     to: maker,
  //     value: priceInWei
  //   }
  //   )).wait()
  //   console.log(tx)
  //   // first minting  then listing then buying
  //   const uri = item.urii;
  //   // mint nft 
  //   await (await nft.mint(uri, _amount)).wait()
  //   const tokenIDD = await nft.tokenCount();
  //   toast(`Your Token Id Is ${Number(tokenIDD)}`)
  // }



  // Minting And Listing Section 

  const createNFT = async (e) => {
    e.preventDefault();
    // setThumbnail(true)

    if (!image || !price || !name || !description || !account || amount === 0 || !rarity) {
      toast("Please Fill All The Fields");
    }
    else {
      try {
        const regstration = await marketplace.registration(account);
        if (regstration === false) {
          toast(`"You Are Not Register Please Register YourSelf"`);
        } else {

          const result = await ipfs.add(JSON.stringify({ image, name, description, rarity, account }))
          mintThenList(result);
          setThumbnail(true)
        }

      } catch (error) {
        console.log(error)
      }
    }

  }

  const mintThenList = async (result) => {

    const uri = result.path;
    try {
      setTransactionState(true)
      // mint nft 
      const _amount = amount.toString();
      await (await nft.mint(uri, _amount)).wait()
      // get tokenId of new nft 
      const id = await nft.tokenCount()
      // approve marketplace to spend nft
      await (await nft.setApprovalForAll(marketplace.address, true)).wait()
      // add nft to marketplace
      const _price = price.toString();
      const listingPrice = ethers.utils.parseEther(_price);
      // const _id = Number(id);
      await (await marketplace.makeItem(nft.address, id, listingPrice, _amount)).wait()
      setTransactionState(false)
      setThumbnail(true)
      toast("Congratulations you have Listed your Nft successfully")
        Navigate("/all_nfts")
    } catch (error) {
      setTransactionState(false)
      toast(error.data);
    }
  }

  return (
    <>
      <section className="container">
        <div className="row createPage">
          {transactionState ? <SpinnerExp /> : <div className="col-lg-6 offset-lg-3">
            <form className="createPageForm">
              <h3>Create New Item</h3>
              <div className="mb-3">
                <label htmlFor="name" className="form-label pageSubHeading">Image, Video, Audio, or 3D Model
                  <span>*</span></label>
                <p className="description">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
                  GLTF. Max size 100MB
                </p>
                {thumbnail === true ? <div className="selectImage d-flex flex-row justify-content-center align-items-center">
                  <input type="file" name="" id="" required onChange={uploadToIPFS} />
                </div> : <div className="selectImage upload d-flex flex-row justify-content-center align-items-center" style={{ backgroundImage: `url(https://asadkhan.infura-ipfs.io/ipfs/${image})` }}>
                  <input type="file" name="" id="" required onChange={uploadToIPFS} />
                </div>}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label pageSubHeading">Name <span>*</span></label>
                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label pageSubHeading">Description <span>*</span></label>
                <input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" id="name" placeholder="Description" required />
              </div>


              <div className="mb-3">
                <label htmlFor="Rarity" className="form-label pageSubHeading">Rarity <span>*</span></label>
                <input type="text" onChange={(e) => setRarity(e.target.value)} className="form-control" id="name" placeholder="Rarity" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label pageSubHeading">Quantity <span>*</span></label>
                <input type="number" onChange={(e) => setAmount(e.target.value)} className="form-control" id="name" placeholder="Quantity" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label pageSubHeading">Price <span>*</span></label>
                <input type="number" onChange={(e) => setPrice(e.target.value)} className="form-control" id="name" placeholder="Price in Eth" required />
              </div>
              {account === null ? <button type="button" className="submitButton" >Connect Wallet To Create</button> : <button type="button" onClick={createNFT} className="submitButton" >Create</button>}

            </form>
          </div>}
        </div>
      </section>
    </>
  )
}
