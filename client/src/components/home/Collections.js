import React from 'react'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import SpinnerExp from '../Spiner';

//  
export default function Collections() {

  const account = useSelector((state) => (state.account.value))
  const marketplace = useSelector((state) => (state.marketplace.value))
  const nft = useSelector((state) => (state.nft.value))
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  // const [amount, setAmount] = useState("1");
  // const [error, setError] = useState("");

  const loadMarketplaceItems = async () => {
    // Load all unsold items

    if (marketplace?.itemCount) {
      // console.log(marketplace, "Marketplace in inner function")

      const itemCount = await marketplace.itemCount()
      let items = []
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i)
        const ammount = Number(item.amount);
        if (ammount >= 1) {
          // get uri url from nft contract
          const uri = await nft.uri(item.tokenId);

          // use uri to fetch the nft metadata stored on ipfs 
          const response = await fetch(`https://asadkhan.infura-ipfs.io/ipfs/${uri}`)
          const metadata = await response.json();


          // get total price of item (item price + fee)
          const _pricePlusFee = await item.pricePlusFee;
          const eth_pricePlusFee = ethers.utils.formatEther(_pricePlusFee);

          // Add item to items array
          items.push({

            eth_pricePlusFee,
            itemId: Number(item.itemId),
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            amount: Number(item.amount),
            tokenId: Number(item.tokenId),
            itemRarity: metadata.rarity
          })
        }
      }

      setLoading(false)
      setItems(items)
    }


  }

  useEffect(() => {
    // console.log("UseEffect is running")
    loadMarketplaceItems()
  }, [account, marketplace, nft])

  if (loading) return (
    <SpinnerExp />
    // <main style={{ padding: "1rem 0" }}>
    //   <h2>Loading...</h2>
    // </main>
  )
  return (
    <>
      <section className="topAuthor">
        <div className="topAuthorBgImage">
          <div className="topAuthorSection">
            <div className="container">
              <div className="d-flex flex-row justify-content-between topAuthorContent align-items-center">
                <h1 className="allHeadings">
                  All NFTs
                </h1>
                <Link to="/all_nfts">Explore All</Link>
              </div>
              <div className="row">
                {items.length === 0 ?<h2> No Item Listed Yet </h2> :  items.map((item, idx) => {
                  return (
                    <div key={idx} className="col-lg-3 p-0">
                      {idx < 4 ? <div>
                        <div className="m-2 categoriesCard">

                          <Link to="/singleItem" state={item}>

                            <img src={`https://asadkhan.infura-ipfs.io/ipfs/${item.image}`} alt="" className="cardImage" />
                            <h5>{item.name}</h5>
                            <div className="cardButton d-flex flex-row justify-content-between align-items-center">
                              <p className="buttonText">
                                Price
                              </p>
                              <p className="buttonValue d-flex flex-row">
                                <svg width="10" height="17" viewBox="0 0 10 17" fill="none" className="me-1"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M9.99671 8.58983L5 11.6463L0 8.58983L5 0L9.99671 8.58983ZM5 12.6278L0 9.57133L5 16.8635L10 9.57133L5 12.6278Z"
                                    fill="#2E3880" />
                                </svg>
                                {item.eth_pricePlusFee}
                              </p>
                            </div>
                          </Link>

                        </div>
                      </div> : ""}

                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
