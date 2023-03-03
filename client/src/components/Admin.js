import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import AlertMessage from "./AlertMessage"
import { Form} from 'react-bootstrap'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux';

const Admin = () => {
  const account = useSelector((state) => (state.account.value))
  const marketplace = useSelector((state) => (state.marketplace.value))
  const [loading, setLoading] = useState(true);
  const [Owner, setOwner] = useState(null);
  const [feePercentage, setFeePercentage] = useState(null);
  const [user, setUser] = useState(''); // the User which is to block
  const [newMinBidInc, setNewMinBidInc] = useState();  // New minimumBidIncrement
  const [newRegFee, setNewRegFee] = useState(); // Registration Feee
  const [burningitem, setBurningItem] = useState(''); // the User which is to block
  const [burningAuction, setBurningAuction] = useState(''); // the User which is to block

  const gettingOwner = async () => {
    const ownerr = await marketplace.owner();
    setOwner(ownerr.toLowerCase())
    setLoading(false);
  }

  // updateFee Percentage
  const updateFeePercentage = async (e) => {
    e.preventDefault();
    try {
      const newFeePercentInWei = ethers.utils.parseEther(feePercentage)
      await (await marketplace.updateFeePercent(newFeePercentInWei)).wait() // param new fee 
      const newfeepercent = await marketplace.feePercent();
      const newfeepercentInNum = Number(newfeepercent);
      alert(`Your new Feepercentage Is ${ethers.utils.formatEther(newfeepercentInNum.toString())} Eth`);
    } catch (error) {
    }
  }

  // setNew Mininmum_Bid_Increment
  const updateMinBidInc = async (e) => {
    e.preventDefault();
    try {
      const settedMinBidIncInStr = newMinBidInc.toString();
      const newMinBidIncInWei = ethers.utils.parseEther(settedMinBidIncInStr);

      await (await marketplace.updateMinBidIncrement(newMinBidIncInWei)).wait() // param new Reward Rate
      const updatedMinBidInc = await marketplace.minBidIncrement();
      const updatedMinBidInc_InNum = Number(updatedMinBidInc);
      alert(`Your new MinimumBidIncrement Is ${ethers.utils.formatEther(updatedMinBidInc_InNum.toString())}`);
    } catch (error) {
    }
  }

  // setNew Registration Fee
  const updateRegistrationFee = async (e) => {
    e.preventDefault();
    try {
      const settedNewRegFeeInStr = newRegFee.toString();
      const newRegFeeInWei = ethers.utils.parseEther(settedNewRegFeeInStr);
      await (await marketplace.updateRegistrationFee(newRegFeeInWei)).wait()
      const updatedRegFee = marketplace.registrationFee();
      const updatedRegFeeInNum = Number(updatedRegFee);
      alert(`Your New Registration Fee is ${ethers.utils.formatEther(updatedRegFeeInNum.toString())}`);
    } catch (error) {
    }
  }

  // Block The User 
  const blockUser = async (e) => {
    try {
      e.preventDefault();
      await (await marketplace.blockUser(user)).wait() // param new Reward Rate
      alert(`${user} blocked`)
    }
    catch (error) {
    }
  }

  // Burn The Item 
  const burnItem = async (e) => {
    e.preventDefault();
    try {
      await (await marketplace.burnItem(burningitem)).wait() // param new Reward Rate
      alert(`${burningitem} Item Is Burned`)
    } catch (error) {
    }
  }

  // Burn Auction 
  const burnAuction = async (e) => {
    e.preventDefault();
    try {
      await (await marketplace.burnAuction(burningAuction)).wait() // param new Reward Rate 
      alert(`${burningAuction} Auction Is Burned`)
    } catch (error) {
    }
  }

  useEffect(() => {
    gettingOwner()
    // eslint-disable-next-line
  }, [account]);

  return (
    <div className="admin_con container pt-5">
      <div className='mt-3 pt-5'>
        {account ? <div>  {Owner === account ? <Fragment>
          {loading ? <h1>Loading..........</h1> : <div>
            <br />
            <h1>Welcome Admin</h1>
            <Form onSubmit={updateFeePercentage} className='adminBox'>
              <div className="mb-3">
                <label htmlFor="feePercentage" className="form-label pageSubHeading">Set New FeePercentage <span>*</span></label>
                <input required type="number" onChange={(e) => setFeePercentage(e.target.value)} className="form-control" min='0.00' step='0.0001' maxLength={100} id="feePercentage" placeholder="Set New Fee _ETH" />
                <button type='submit' className="submitButton admin_btn">Set New FeePercentage</button>
              </div>
            </Form>

            <Form onSubmit={updateMinBidInc} className='adminBox'>
              <label className="form-label pageSubHeading">Set Min Bid Inc <span>*</span></label>
              <input onChange={(e) => setNewMinBidInc(e.target.value)} size="lg" required type="number" placeholder="Enter New Minimum Bid Increment _ETH" min='0.00' step='0.0001' maxLength={100} className="form-control" />
              <button type='submit' className="submitButton admin_btn">
                Set New MinBidInc
              </button>
            </Form>

            <Form onSubmit={updateRegistrationFee} className='adminBox'>
              <label className="form-label pageSubHeading">Set New Registration Fee <span>*</span></label>
              <input onChange={(e) => setNewRegFee(e.target.value)} size="lg" required type="number" placeholder="Enter New Registration Fee _ETH" min='0.00' step='0.0001' maxLength={100} className="form-control" />
              <button type='submit' className="submitButton admin_btn">
                Set New Registration Fee
              </button>
            </Form>

            <Form onSubmit={blockUser} className='adminBox'>
              <label className="form-label pageSubHeading">Block The User <span>*</span></label>
              <input onChange={(e) => setUser(e.target.value)} size="lg" required type="text" placeholder="Enter Address To Block" min maxLength={100} className="form-control" />
              <button type='submit' className="submitButton admin_btn">
                Block The User
              </button>
            </Form>

            <Form onSubmit={burnItem} className='adminBox'>
              <label className="form-label pageSubHeading">Burn The item <span>*</span></label>
              <input onChange={(e) => setBurningItem(e.target.value)} size="lg" required type="number" placeholder="Enter Item Id" maxLength={100} className="form-control" />
              <button type='submit' className="submitButton admin_btn">
                Burn The item
              </button>
            </Form>

            <Form onSubmit={burnAuction} className='adminBox'>
              <label className="form-label pageSubHeading">Burn The Auction <span>*</span></label>
              <input onChange={(e) => setBurningAuction(e.target.value)} size="lg" required type="number" placeholder="Enter Auction Id" maxLength={100} className="form-control" />
              <button type='submit' className="submitButton admin_btn">
                Burn The Auction
              </button>
            </Form>

            <br /><br /><br /><br /><br /><br /><br /><br />
          </div>}

        </Fragment> : <AlertMessage message="Sorry !  You are not owner" />}
        </div> : <AlertMessage message="Connect Wallet" />}
      </div>
    </div>
  )
}

export default Admin
