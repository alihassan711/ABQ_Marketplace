import { useEffect, useState } from "react";
import AlertMessage from "../AlertMessage"
import { ethers } from "ethers";
import { useSelector } from 'react-redux';

const Balances = () => {
  const account = useSelector((state) => (state.account.value))
  const marketplace = useSelector((state) => (state.marketplace.value))
  const nft = useSelector((state) => (state.nft.value))
  const [balance, setBalance] = useState();
  const [id, setId] = useState();
  const [registrationFee, setRegistrationFee] = useState();

  const error = "Please Conecct MetaMask";

  const registerUser = async () => {
    try {
      const payableAmount = ethers.utils.parseEther(registrationFee).toString();
      await (await marketplace.register({ value: payableAmount })).wait()
    } catch (error) {
      alert(error.data.message.slice(77));
    }
  }

  const getBalance = async () => {
    const _balance = await nft.balanceOf(account, id)
    setBalance(Number(_balance))
  }

  const getRegistrationFee = async () => {
    const _registrationFee = await marketplace.registrationFee(); // in BigNumber
    const __registrationFee = ethers.utils.formatEther(_registrationFee)
    setRegistrationFee(__registrationFee)
  }

  useEffect(() => {
    getRegistrationFee()
  })
  return (
    <div className="p-5">
      {account ? <div>
        <h1 className="mt-5 pt-5">Contracts  Addresses</h1>
        <p> <b> MarketPlace :</b> &nbsp;{marketplace.address}</p>
        <p> <b> Basic Token : </b> &nbsp;{nft.address}</p>
        <h1> Balances </h1>
        <b>Enter Token Id :</b>
        <input type="number" onChange={(e) => setId(e.target.value)} className="form-control" id="name" placeholder="Enter iD" required />
        <button onClick={getBalance} className="submitButton admin_btn">Check Your Balance</button>
        <p> <b>Your Balance : {balance} </b></p>
        <p> <b> RegistrationFee :</b> &nbsp;{registrationFee} ETH</p>
        <button variant="primary" size="md" onClick={() => registerUser()} className="submitButton admin_btn">       Register Yourself</button>
      </div>
        : <AlertMessage message={error} />}
    </div>
  )
}

export default Balances
