import React from 'react'
import { useEffect, useState } from 'react'
import { ethers } from "ethers"
import { create } from "ipfs-http-client";
import SpinnerExp from '../Spiner';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

export default function NewAuction() {
    const Navigate=useNavigate()

    const account = useSelector((state) => (state.account.value))
    const marketplace = useSelector((state) => (state.marketplace.value))
    const nft = useSelector((state) => (state.nft.value))
    const [image, setImage] = useState(null)
    const [thumbnail, setThumbnail] = useState(true)
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [rarity, setRarity] = useState('')
    // const [error, setError] = useState('Please Conecct MetaMask');
    const amount = 1; // amount of tokens created for auction 
    const [transactionState, setTransactionState] = useState(false);

    // console.log(transactionState,"test")

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
                toast("ipfs image upload error: check your internet connection");
            }
        }
    }

    useEffect(() => {

    }, [account, marketplace, account])

    const createNFT = async (e) => {
        e.preventDefault();
        if (!image || !price || !name || !description || !account || amount === 0 || !rarity || !duration) {
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
        try {
            setTransactionState(true);
            
            const uri = result.path;
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
            await (await marketplace.createAuction(nft.address, id, listingPrice, _amount, duration)).wait();
            setTransactionState(false)
            setThumbnail(true)
            toast("Congratulations! you have created your Auction successfully")
        Navigate("/all_auctions")
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
                            <h3>Create New Auction</h3>
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
                                <label htmlFor="" className="form-label pageSubHeading">Price <span>*</span></label>
                                <input type="number" onChange={(e) => setPrice(e.target.value)} className="form-control" id="name" placeholder="Price in Eth" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label pageSubHeading">End Time <span>*</span></label>
                                <input type="number" onChange={(e) => setDuration(e.target.value)} className="form-control" id="name" placeholder="Duration In Seconds" required />
                            </div>
                            {account === null ? <button type="button" className="submitButton" >Connect Wallet To Create</button> : <button type="button" onClick={createNFT} className="submitButton" >Create Auction</button>}
                        </form>
                    </div>}
                </div>
            </section>
        </>
    )
}
