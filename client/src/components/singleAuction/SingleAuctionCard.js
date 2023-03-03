import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState} from 'react'
import { ethers } from "ethers"
// import AlertMessage from '../AlertMessage'
import SpinnerExp from '../Spiner'
import { useSelector } from 'react-redux';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


export default function SingleAuctionCard() {
  const Navigate=useNavigate()
  
  // const [error, setError] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  // const [minBidInc, setMinBidInc] = useState("")
  const [transactionState, setTransactionState] = useState(false);
  // const [highestBid, setHighestBid] = useState()

  const account = useSelector((state) => (state.account.value))
  const marketplace = useSelector((state) => (state.marketplace.value))
  const nft = useSelector((state) => (state.nft.value))
  const location = useLocation();
  const auctionedItem = location.state;

  const currentTime = Date.now() / 1000;

  const claimBidd = async (item) => {
    try {
      await (await marketplace.claimAuction(item.auctionId, nft.address)).wait()
      toast(`Congratulation  you are the owner of ${item.name} with Id ${item.tokenId} `);
      Navigate("/registration")
    } catch (error) {
      toast(error.error.data.message.slice(77))
    }
  }
  
  const placeBidd = async (item) => {
    if(bidAmount===""){
      toast("Please enter bid amount")
      
    }
    else{
      try {
        // setTransactionState(true)
        const biddingAmount = ethers.utils.parseEther(bidAmount);
        const totalBidAmount = Number(biddingAmount) ;
        await (await marketplace.placeBid(item.auctionId, { value: totalBidAmount.toString() })).wait();
        setTransactionState(false)
        toast(`Your Bid of ${bidAmount} Eth has been placed`)
        Navigate("/my_auctions")
      } catch (error) {
        setTransactionState(false)
        account === null ? toast ("Please Connect MeataMask") : toast(error.error.data.message.slice(77));
      }
    }

  }

  return (
    <>
      <div className='container pt-5'>
        {transactionState ? <div className="row artWorkCards justify-content-between single mt-5 pt-5"> <SpinnerExp /> </div> : <div className="row artWorkCards justify-content-between single mt-5 pt-5">
          <div className="col-md-5 col-12 my-3">
            <img className="rounded" style={{ width: "100%", height: "auto" }}
              src={`https://asadkhan.infura-ipfs.io/ipfs/${auctionedItem.image}`} alt="" />
          </div>
          <div className="col-md-6 col-12 p-3 d-flex flex-column justify-content-center">
            <h5 className='card-text'>ID : <span className="buttonText">{auctionedItem.tokenId}</span></h5>
            <h5 className='card-text'>Name : <span className="buttonText">{auctionedItem.name}</span></h5>
            <h5 className='card-text'>Description : <span className="buttonText">{auctionedItem.description}</span></h5>
            <h5 className='card-text'>Rarity : <span className="buttonText">{auctionedItem.itemRarity}</span></h5>
            <h5 className='card-text'>Basic Price : <span className="buttonText">{auctionedItem.eth_pricePlusFee} <svg width="10" height="17" viewBox="0 0 10 17" fill="none" className="me-1"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99671 8.58983L5 11.6463L0 8.58983L5 0L9.99671 8.58983ZM5 12.6278L0 9.57133L5 16.8635L10 9.57133L5 12.6278Z"
                fill="#2E3880" />
            </svg> </span></h5>
            <h5 className='card-text'>Creator : <span className="buttonText">{auctionedItem.creater.slice(0, 10) + '......' + auctionedItem.creater.slice(35, 42)}</span></h5>
            <h5 className='card-text'>Highest Bidder : <span className="buttonText">{`${auctionedItem.highestBidder.slice(0, 10) + '......' + auctionedItem.highestBidder.slice(35, 42)}`}</span></h5>
            <h5 className='card-text'>Highest Bidd : <span className="buttonText">{auctionedItem.highestBidder === 0x0000000000000000000000000000000000000000 ? "No Bidd Yet" : `${auctionedItem.eth_highestBid}`}</span></h5>
            <h5 className='card-text'>Auction End Time : <span className="buttonText">{auctionedItem.hours}:{auctionedItem.minutes}{auctionedItem.hours > 12 ? "PM" : "AM"}</span></h5>
            <div className="input-group mb-3">
              <input type="number" onChange={(e) => setBidAmount(e.target.value)} className="form-control" placeholder="Enter Amount In Eth" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            {account === null ? <button type="button" className="btn btn-primary btn-lg btn-block w-100 my-2" >Connect Wallet To Bid</button> : <>{
              currentTime < auctionedItem.EndTime ? <button type="button" onClick={() => placeBidd(auctionedItem)} className="btn btn-primary btn-lg btn-block w-100 my-2" >Bid Now</button> : <>{account === auctionedItem.highestBidder ? <button type="button" onClick={() => claimBidd(auctionedItem)} className="btn btn-primary btn-lg btn-block w-100 my-2" >Claim Bid</button> : <button type="button" className="btn btn-primary btn-lg btn-block w-100 my-2" >Cancel Auction</button>}</>
            }
            </>}

            <Link to="/all_auctions">
              <button type="button" className="btn btn-primary btn-lg btn-block w-100">Back to Auctions</button>
            </Link>

            {/* <button type="button" onClick={nt} className="btn btn-primary btn-lg btn-block w-100">Navigate</button> */}


          </div>
        </div>}
      </div>
    </>
  )
}