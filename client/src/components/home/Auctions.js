
import React from 'react'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Link } from 'react-router-dom'
// import SpinnerExp from '../Spiner';
import { useSelector } from 'react-redux';

export default function AuctionsCards() {

  const account = useSelector((state) => (state.account.value))
  const marketplace = useSelector((state) => (state.marketplace.value))
  const nft = useSelector((state) => (state.nft.value))
  // const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  // const [error, setError] = useState("");
  // eslint-disable-next-line
  const [minBidInc, setMinBidInc] = useState("")

  const loadMarketplaceItems = async () => {
    if (marketplace?.auctionCount) {
      // Load all unsold items
      const itemCount = await marketplace.auctionCount()
      const minBiddIncrement = await marketplace.minBidIncrement();
      const _minBiddIncrementInNumber = Number(minBiddIncrement);
      setMinBidInc(_minBiddIncrementInNumber);

      let items = []
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.auctions(i);
        // console.log(item)
        const auctionEndTime = Number(item.endTime);
        const date = new Date(auctionEndTime * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const month = date.getMonth();
        const curentTime = Date.now() / 1000;

        if (!item.sold && auctionEndTime > curentTime) {
          // get uri url from nft contract

          const uri = await nft.uri(item.tokenId);
          //  https://asadkhan.infura-ipfs.io

          // use uri to fetch the nft metadata stored on ipfs 
          const response = await fetch(`https://asadkhan.infura-ipfs.io/ipfs/${uri}`)
          const metadata = await response.json();

          // get total price of item (item price + fee) anf=d other data from marketplace contarct
          const _pricePlusFee = await item.pricePlusFee;
          const eth_pricePlusFee = ethers.utils.formatEther(_pricePlusFee);
          const bidInfo = await marketplace.bids(i);
          const highestBidd = await bidInfo.highestBid;
          const eth_highestBid = ethers.utils.formatEther(highestBidd)
          const highestBidder = await bidInfo.highestbidder;
          // Add item to items array
          items.push({
            eth_pricePlusFee,
            auctionId: item.auctionId,
            tokenId: Number(item.tokenId),
            creater: item.creater,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            amount: Number(item.amount),
            EndTime: Number(item.endTime),
            eth_highestBid,
            highestBidder,
            hours,
            minutes,
            month,
            itemRarity: metadata.rarity,
            auctionCount: i
          })
        }
      }
      setItems(items)
      // setLoading(false)
    }
  }

  
  useEffect(() => {
    loadMarketplaceItems();
// eslint-disable-next-line
  }, [marketplace, account, nft])
  return (
    <>
      {items.length === 0 ? <h2>No Auction Listed</h2> : <section className="container">
  
        <div className="artWork">
          <div className="artWorkContent">
            <h1 className="allHeadings">
              Auctions
            </h1>
            <p className="allParagraphs">
              Find a selection of the most sought-after digital art pieces, available for bidding. Don't miss your chance to own a piece of digital art history. Check out our current auctions and place your bid today.</p>
          </div>
          <div className="row artWorkCards">
            {items.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 p-0">
                  {idx < 4 ? <div> <div className="m-2 card">

                    <Link to="/singleAuction" state={item}>
                      <img src={`https://asadkhan.infura-ipfs.io/ipfs/${item.image}`} alt="" className="cardImage" />
                      <h5 className='card-text'>{item.name}</h5>
                      <div className="cardButton d-flex flex-row justify-content-between align-items-center">
                        <p className="buttonText">
                          Current Bid
                        </p>
                        <p className="buttonValue d-flex flex-row">
                          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" className="me-1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.99671 8.58983L5 11.6463L0 8.58983L5 0L9.99671 8.58983ZM5 12.6278L0 9.57133L5 16.8635L10 9.57133L5 12.6278Z"
                              fill="#2E3880" />
                          </svg>
                          {item.eth_highestBid}
                        </p>
                      </div>
                    </Link>

                  </div> </div> : ""}
                </div>
              )
            })}
          </div>
        </div>
      </section>}

    </>
  )
}
