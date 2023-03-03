import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState} from 'react'
import { ethers } from "ethers"
// import AlertMessage from '../AlertMessage'
import SpinnerExp from '../Spiner'
import { useSelector } from 'react-redux';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


export default function SingleCard() {
  const Navigate=useNavigate()


  // const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  // console.log(amount,"kkk")
  const [transactionState, setTransactionState] = useState(false);

  const account = useSelector((state) => (state.account.value))
  const marketplace = useSelector((state) => (state.marketplace.value))
  const nft = useSelector((state) => (state.nft.value))

  const location = useLocation();
  const listedItem = location.state;

  const buyMarketItem = async (item) => {
    if(amount===""){
      toast("Please enter quantity")
      
    }
    else{

      try {
        setTransactionState(true)
        const payableAmount = (ethers.utils.parseEther(item.eth_pricePlusFee) * amount).toString();
        await (await marketplace.purchaseItem(item.itemId, amount, nft.address, { value: payableAmount })).wait()
        setTransactionState(false)
        const marketCommmition = await marketplace.marketplaceCommition();
        console.log(Number(marketCommmition));
        const sellerpay = await marketplace.sellPay()
        console.log(Number(sellerpay),"Seller pay");

        toast(`You Have Purchased ${amount} tokens of ID : ${item.tokenId}`)
        Navigate("/registration")
      } catch (error) {
        setTransactionState(false) 
        account === null ? toast("Please Connect MeataMask") : toast(error.error.data.message.slice(77));
      }
    }
  }

  return (<>
    <div className='container pt-5'>
      {transactionState ? <div className="row artWorkCards justify-content-between single mt-5 pt-5"> <SpinnerExp /> </div> : <div className="row artWorkCards justify-content-between single mt-5 pt-5">
        {/* {error && <AlertMessage message={error} />} */}
        <div className="col-md-5 col-12 my-3">
          <img className="rounded" style={{ width: "100%", height: "auto" }}
            src={`https://asadkhan.infura-ipfs.io/ipfs/${listedItem.image}`} alt="" />
        </div>
        <div className="col-md-6 col-12 p-3 d-flex flex-column justify-content-center">
          <h5 className='card-text'>ID : <span className="buttonText">{listedItem.tokenId}</span></h5>
          <h5 className='card-text'>Name : <span className="buttonText">{listedItem.name}</span></h5>
          <h5 className='card-text'>Description : <span className="buttonText">{listedItem.description}</span></h5>
          <h5 className='card-text'>Rarity : <span className="buttonText">{listedItem.itemRarity}</span></h5>
          <h5 className='card-text'>Available Quantity : <span className="buttonText">{Number(listedItem.amount)}</span></h5>
          <h5 className='card-text'>Price : <span className="buttonText">{listedItem.eth_pricePlusFee} <svg width="10" height="17" viewBox="0 0 10 17" fill="none" className="me-1"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.99671 8.58983L5 11.6463L0 8.58983L5 0L9.99671 8.58983ZM5 12.6278L0 9.57133L5 16.8635L10 9.57133L5 12.6278Z"
              fill="#2E3880" />
          </svg> </span></h5>
          <h5 className='card-text'>Owner : <span className="buttonText">{listedItem.seller.slice(0, 10) + '......' + listedItem.seller.slice(35, 42)}</span></h5>
          <div className="input-group mb-3">
            <input type="number" onChange={(e) => setAmount(e.target.value)} className="form-control" placeholder="Enter Quantity " aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          {account === null ? <button type="button" className="btn btn-primary btn-lg btn-block w-100 my-2" >Connect Wallet To Buy</button> : <button type="button" onClick={() => buyMarketItem(listedItem)} className="btn btn-primary btn-lg btn-block w-100 my-2" >Buy Now</button>}

          <Link to="/">
            <button type="button" className="btn btn-primary btn-lg btn-block w-100">Back</button>
          </Link>
        </div>
      </div>}

    </div>
  </>
  )
}