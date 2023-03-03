
import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiFillLinkedin, AiFillFacebook, AiFillSkype } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";


import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';


export default function Navbar({ web3Handler }) {
    const account = useSelector((state) => (state.account.value))
    const Navhandle = () => {
        let Mobile_nav = document.getElementsByClassName("offcanvas")
        Mobile_nav[0].classList.toggle("show")
        Mobile_nav[0].style.visibility = "visible"
    }
    return (
        <>
            <header className="stickyHeader" >
                <div className="bg-hero">
                    <div className="container ">
                        <div className="topBar">
                            <div className="d-flex flex-row justify-content-between line">
                                <ul className="nav">
                                    <li className="nav-item navLinkItem">
                                        <Link to="/all_nfts" className='me-5 navs ps-0 text-decoration-none'>
                                            Art
                                        </Link>
                                    </li>
                                    <li className="nav-item navLinkItem me-5 navs">
                                        NEW
                                    </li>
                                    <li className="nav-item navLinkItem ">
                                        <Link to="/all_auctions" className='me-5 navs ps-0 text-decoration-none'>
                                            All Auctions
                                        </Link>
                                    </li>
                                    <li className="nav-item navLinkItem ">
                                        <Link to="/my_auctions" className='me-5 navs ps-0 text-decoration-none'>
                                            My Auctions
                                        </Link>
                                    </li>
                                    <li className="nav-item navLinkItem me-5 navs">
                                        <Link to="/admin" className='me-5 navs ps-0 text-decoration-none'>
                                            Admin
                                        </Link>
                                    </li>

                                </ul>
                                <ul className="nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://www.facebook.com/alburraqtech">
                                            <AiFillFacebook className='text-white' />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://www.linkedin.com/company/alburraqtech/">
                                            <AiFillLinkedin className='text-white' />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://twitter.com/AlBurraqTech">
                                            <BsTwitter className='text-white' />

                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="skype:/http:/alihassan869?chat">
                                            <AiFillSkype className='text-white' />
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-hero py-1">
                    <div className="container mainNavigation desktopMenu">
                        <ul className="nav">
                            <Link className="navbar-brand" to="/">
                                <img src="./images/logonew.png" alt="" className='logo' />

                            </Link>
                            <li className="nav-item navLinkItem ms-5">
                                <Link to="/" className="nav-link me-5 navLink active">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item navLinkItem">
                                <Link to="/create_nft" className="nav-link me-5 navLink active">
                                    Create NFT
                                </Link>
                            </li>
                            <li className="nav-item navLinkItem">
                                <Link to="/create_auction" className="nav-link me-5 navLink active">
                                    Create Auction
                                </Link>
                            </li>
                            <li className="nav-item navLinkItem">
                                <Link to="/registration" className="nav-link me-5 navLink active">
                                    Registration/Balances
                                </Link>
                            </li>
                            <li className="nav-item navLinkItem">
                                <a className="nav-link me-5 navLink" href="https://www.al-burraq.com/contact-us">Contact Us</a>
                            </li>
                        </ul>
                        {/* <!-- Search Button Start --> */}
                        {/* <!-- Search Button End --> */}
                        <div className="dropdown dropdownAvatar">
                            <div id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" className="">
                                <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    style={{ marginRight: "5px" }}>
                                    <path
                                        d="M0.562499 0.28125H6.14061C6.29686 0.28125 6.42967 0.335937 6.53905 0.445312C6.64842 0.554687 6.70311 0.687499 6.70311 0.843749C6.70311 0.999998 6.64842 1.13281 6.53905 1.24219L3.74999 4.03124C3.64062 4.14062 3.5078 4.1953 3.35155 4.1953C3.1953 4.1953 3.06249 4.14062 2.95312 4.03124L0.164062 1.24219C0.0546873 1.13281 0 0.999998 0 0.843749C0 0.687499 0.0546873 0.554687 0.164062 0.445312C0.273437 0.335937 0.406249 0.28125 0.562499 0.28125Z"
                                        fill="white" />
                                </svg>
                                <CgProfile className='cgProfile me-1' />
                                {account ? (
                                    <button className="primary">
                                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                    </button>
                                ) : (

                                    <button onClick={web3Handler} className="primary">Connect Wallet</button>
                                )}





                            </div>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <a className="dropdown-item" href="/#">
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" className="me-2"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.5634 6.24384C15.395 8.51559 13.6728 10.3688 11.7821 10.3688C9.89151 10.3688 8.16632 8.51602 8.00089 6.24384C7.82901 3.88055 9.5048 2.11884 11.7821 2.11884C14.0595 2.11884 15.7353 3.92352 15.5634 6.24384Z"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path
                                                d="M11.7823 13.1188C8.04405 13.1188 4.24991 15.1813 3.5478 19.0742C3.46315 19.5435 3.7287 19.9938 4.21983 19.9938H19.3448C19.8364 19.9938 20.1019 19.5435 20.0173 19.0742C19.3148 15.1813 15.5206 13.1188 11.7823 13.1188Z"
                                                stroke="#2E3880" strokeWidth="1.5" strokeMiterlimit="10" />
                                        </svg>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/#">
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" className="me-2"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.9467 3.49384C13.1572 3.49384 11.7822 6.24384 11.7822 6.24384C11.7822 6.24384 10.4072 3.49384 7.61765 3.49384C5.35062 3.49384 3.55538 5.39048 3.53218 7.65364C3.48491 12.3514 7.25886 15.6922 11.3955 18.4998C11.5095 18.5774 11.6442 18.6189 11.7822 18.6189C11.9201 18.6189 12.0549 18.5774 12.1689 18.4998C16.3051 15.6922 20.079 12.3514 20.0322 7.65364C20.009 5.39048 18.2137 3.49384 15.9467 3.49384V3.49384Z"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        Favorites
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/#">
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" className="me-2"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.5 8.25V6.75C7.5 5.55653 7.97411 4.41193 8.81802 3.56802C9.66193 2.72411 10.8065 2.25 12 2.25V2.25C13.1935 2.25 14.3381 2.72411 15.182 3.56802C16.0259 4.41193 16.5 5.55653 16.5 6.75V8.25M3.75 8.25C3.55109 8.25 3.36032 8.32902 3.21967 8.46967C3.07902 8.61032 3 8.80109 3 9V19.125C3 20.5425 4.2075 21.75 5.625 21.75H18.375C19.7925 21.75 21 20.6011 21 19.1836V9C21 8.80109 20.921 8.61032 20.7803 8.46967C20.6397 8.32902 20.4489 8.25 20.25 8.25H3.75Z"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path
                                                d="M7.5 10.5V11.25C7.5 12.4435 7.97411 13.5881 8.81802 14.432C9.66193 15.2759 10.8065 15.75 12 15.75C13.1935 15.75 14.3381 15.2759 15.182 14.432C16.0259 13.5881 16.5 12.4435 16.5 11.25V10.5"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        My collections
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/#">
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" className="me-2"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.5 6.75H4.5C3.25736 6.75 2.25 7.75736 2.25 9V18C2.25 19.2426 3.25736 20.25 4.5 20.25H19.5C20.7426 20.25 21.75 19.2426 21.75 18V9C21.75 7.75736 20.7426 6.75 19.5 6.75Z"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path
                                                d="M19.2825 6.74998V5.34373C19.2824 4.99883 19.2062 4.6582 19.0592 4.34615C18.9123 4.0341 18.6984 3.75832 18.4326 3.53849C18.1668 3.31866 17.8558 3.16019 17.5217 3.0744C17.1877 2.98861 16.8388 2.9776 16.5 3.04217L4.155 5.1492C3.6189 5.25136 3.13526 5.53741 2.78749 5.958C2.43972 6.37859 2.24963 6.90736 2.25 7.4531V9.74998"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path
                                                d="M17.25 15C16.9533 15 16.6633 14.912 16.4166 14.7472C16.17 14.5824 15.9777 14.3481 15.8642 14.074C15.7506 13.7999 15.7209 13.4983 15.7788 13.2074C15.8367 12.9164 15.9796 12.6491 16.1893 12.4393C16.3991 12.2296 16.6664 12.0867 16.9574 12.0288C17.2483 11.9709 17.5499 12.0006 17.824 12.1142C18.0981 12.2277 18.3324 12.42 18.4972 12.6666C18.662 12.9133 18.75 13.2033 18.75 13.5C18.75 13.8978 18.592 14.2794 18.3107 14.5607C18.0294 14.842 17.6478 15 17.25 15Z"
                                                fill="#2E3880" />
                                        </svg>
                                        Wallet
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/#">
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" className="me-2"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.0524 8.31966C11.4881 8.26393 10.9205 8.38397 10.4271 8.66333C9.93373 8.94269 9.53877 9.36772 9.29629 9.88023C9.0538 10.3927 8.97566 10.9677 9.07255 11.5263C9.16945 12.0849 9.43664 12.6 9.83756 13.0009C10.2385 13.4018 10.7535 13.669 11.3121 13.7659C11.8708 13.8628 12.4457 13.7846 12.9582 13.5422C13.4707 13.2997 13.8957 12.9047 14.1751 12.4113C14.4545 11.918 14.5745 11.3503 14.5188 10.7861C14.4553 10.1536 14.175 9.56246 13.7255 9.11295C13.276 8.66345 12.6849 8.38318 12.0524 8.31966V8.31966ZM18.6739 11.0563C18.6721 11.3553 18.6501 11.6537 18.6081 11.9497L20.5507 13.4733C20.6353 13.5434 20.6923 13.6413 20.7116 13.7495C20.7309 13.8576 20.7112 13.9691 20.656 14.0641L18.8182 17.2438C18.7624 17.3379 18.6752 17.4093 18.5719 17.4454C18.4686 17.4815 18.3559 17.4799 18.2536 17.4411L16.3243 16.6642C16.2179 16.6218 16.1027 16.6065 15.9889 16.6196C15.8752 16.6328 15.7664 16.6739 15.6725 16.7394C15.3781 16.9421 15.0686 17.1223 14.7469 17.2782C14.6458 17.3274 14.5583 17.4007 14.4922 17.4916C14.4261 17.5826 14.3835 17.6885 14.368 17.7999L14.0788 19.8576C14.0598 19.9663 14.0036 20.065 13.9199 20.1369C13.8362 20.2087 13.7302 20.2493 13.6199 20.2516H9.94433C9.83585 20.2498 9.73125 20.211 9.64776 20.1417C9.56426 20.0724 9.50685 19.9768 9.485 19.8705L9.19625 17.8157C9.18003 17.7031 9.13624 17.5963 9.06878 17.5047C9.00131 17.4131 8.91225 17.3396 8.80953 17.2907C8.48821 17.1356 8.17985 16.955 7.88742 16.7506C7.79379 16.6854 7.68542 16.6446 7.57208 16.6318C7.45873 16.6189 7.34398 16.6345 7.23816 16.6771L5.30929 17.4535C5.20707 17.4924 5.0944 17.4941 4.99111 17.4581C4.88783 17.4221 4.80056 17.3508 4.74468 17.2567L2.90691 14.077C2.85166 13.982 2.83191 13.8705 2.85119 13.7623C2.87047 13.6541 2.92752 13.5563 3.01218 13.4862L4.65402 12.1972C4.74397 12.1258 4.81466 12.033 4.85968 11.9274C4.90471 11.8217 4.92263 11.7065 4.91183 11.5922C4.89636 11.413 4.88691 11.2342 4.88691 11.055C4.88691 10.8759 4.89593 10.6997 4.91183 10.5244C4.92145 10.4107 4.90265 10.2965 4.85712 10.1919C4.81158 10.0874 4.74076 9.99577 4.65101 9.9254L3.01003 8.63634C2.92674 8.56591 2.8709 8.46841 2.85228 8.36094C2.83366 8.25346 2.85345 8.14287 2.9082 8.04852L4.74597 4.86884C4.80178 4.77473 4.88902 4.70334 4.99231 4.66726C5.0956 4.63118 5.20831 4.63272 5.31058 4.67161L7.23988 5.44848C7.34627 5.49084 7.46151 5.50615 7.57527 5.49303C7.68903 5.4799 7.79776 5.43876 7.89171 5.37329C8.18616 5.17053 8.49556 4.9904 8.81726 4.83446C8.9184 4.7853 9.00588 4.712 9.07198 4.62103C9.13807 4.53005 9.18075 4.4242 9.19625 4.31282L9.48543 2.25505C9.50442 2.14637 9.56056 2.04766 9.64427 1.9758C9.72797 1.90393 9.83403 1.86336 9.94433 1.86102H13.6199C13.7284 1.8629 13.833 1.90167 13.9165 1.97095C14 2.04023 14.0574 2.13589 14.0792 2.24216L14.368 4.29692C14.3842 4.40953 14.428 4.51638 14.4954 4.60799C14.5629 4.69959 14.652 4.77311 14.7547 4.822C15.076 4.9771 15.3844 5.15772 15.6768 5.36212C15.7704 5.42726 15.8788 5.46809 15.9921 5.48092C16.1055 5.49374 16.2202 5.47817 16.3261 5.43559L18.2549 4.65915C18.3571 4.62022 18.4698 4.61862 18.5731 4.65462C18.6764 4.69062 18.7637 4.76191 18.8195 4.85594L20.6573 8.03563C20.7126 8.13063 20.7323 8.24216 20.713 8.35035C20.6937 8.45854 20.6367 8.55638 20.552 8.62645L18.9102 9.91552C18.8199 9.98669 18.7487 10.0793 18.7033 10.185C18.6579 10.2907 18.6397 10.406 18.6502 10.5205C18.6644 10.6984 18.6739 10.8772 18.6739 11.0563Z"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/#">
                                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" className="me-2"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.8447 14.4375V16.1563C13.8447 16.6121 13.6636 17.0493 13.3413 17.3716C13.019 17.6939 12.5818 17.875 12.126 17.875H5.25098C4.79514 17.875 4.35796 17.6939 4.03564 17.3716C3.71331 17.0493 3.53223 16.6121 3.53223 16.1563V5.84375C3.53223 5.38791 3.71331 4.95074 4.03564 4.62841C4.35796 4.30608 4.79514 4.125 5.25098 4.125H11.7822C12.7314 4.125 13.8447 4.89457 13.8447 5.84375V7.5625M16.5947 14.4375L20.0322 11L16.5947 7.5625M8.34473 11H19.3447"
                                                stroke="#2E3880" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!--Mobile NavBar Start--> */}
                    <div className="bg-hero mobileNav">
                        <div className="container p-2">
                            <div className="d-flex flex-row justify-content-between align-items-center p-2">
                                <div >
                                    <img className='close' onClick={Navhandle} src="./images/humburgMenu.svg" alt="" />
                                    <div className="offcanvas offcanvas-start" tabIndex="-1"
                                        aria-labelledby="offcanvasExampleLabel">
                                        <div className="offcanvas-body">
                                            <div className="menuTabs d-flex flex-row justify-content-between align-items-center">
                                                <div className="categoriesTab activeTab" id="cat-tab">Categories</div>
                                                <div className="profileTab inActiveTab" id="pro-tab">Profile</div>
                                                <span className='mx-4'><AiOutlineClose className='close' onClick={Navhandle} /></span>
                                            </div>
                                            <div id="categoriesTab" style={{ height: "90%" }}>
                                                <div className="d-flex flex-column justify-content-between h-100">
                                                    <ul className="mobileLeftMenu py-3">
                                                        <li>
                                                            <Link to="/">

                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/create_nft">
                                                                Create NFT
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/create_auction">
                                                                Create Auction
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link to="/all_nfts">
                                                                Art
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/all_auctions">
                                                                All Auction
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/registration">
                                                                Balances/Registration
                                                            </Link>
                                                        </li>
                                                        {account ? (
                                                            <li className='text-white cursor'>
                                                                {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                                            </li>
                                                        ) : (

                                                            <li className='text-white cursor' onClick={web3Handler} >Connect Wallet</li>
                                                        )}
                                                    </ul>
                                                    <div>
                                                        <div
                                                            className="d-flex flex-row justify-content-start align-items-center mSocial">
                                                            <ul className="nav">
                                                                <li >
                                                                    <a className="" href="https://www.facebook.com/alburraqtech">
                                                                        <AiFillFacebook style={{ fontSize: '1.4em' }} className='text-white' />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="ms-5" href="https://www.linkedin.com/company/alburraqtech/">
                                                                        <AiFillLinkedin style={{ fontSize: '1.4em' }} className='text-white' />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="ms-5" href="https://twitter.com/AlBurraqTech">
                                                                        <BsTwitter style={{ fontSize: '1.4em' }} className='text-white' />

                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="ms-5" href="skype:/http:/alihassan869?chat">
                                                                        <AiFillSkype style={{ fontSize: '1.4em' }} className='text-white' />
                                                                    </a>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                        <ul className="mobileLeftMenu">
                                                            <li>
                                                                <Link to="/admin">

                                                                    Admin
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.al-burraq.com/contact-us">
                                                                    Contact US
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="profileTab" className="proTab" style={{ height: "90%" }}>
                                                <div className="d-flex flex-column justify-content-between h-100">
                                                    <ul className="mobileLeftMenu py-3">
                                                        <li>
                                                            <a href="/">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    className="me-3" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M16.125 6.75C15.9413 9.22828 14.0625 11.25 12 11.25C9.93754 11.25 8.05551 9.22875 7.87504 6.75C7.68754 4.17188 9.51566 2.25 12 2.25C14.4844 2.25 16.3125 4.21875 16.125 6.75Z"
                                                                        stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                                        strokeLinejoin="round" />
                                                                    <path
                                                                        d="M11.9996 14.25C7.9215 14.25 3.78244 16.5 3.0165 20.7469C2.92416 21.2588 3.21384 21.75 3.74963 21.75H20.2496C20.7859 21.75 21.0756 21.2588 20.9832 20.7469C20.2168 16.5 16.0777 14.25 11.9996 14.25Z"
                                                                        stroke="white" strokeWidth="1.5"
                                                                        strokeMiterlimit="10" />
                                                                </svg>
                                                                My Profile
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    className="me-3" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M16.5431 3.75C13.5 3.75 12 6.75 12 6.75C12 6.75 10.5 3.75 7.45687 3.75C4.98374 3.75 3.0253 5.81906 2.99999 8.28797C2.94843 13.4128 7.06546 17.0573 11.5781 20.1202C11.7025 20.2048 11.8495 20.2501 12 20.2501C12.1505 20.2501 12.2975 20.2048 12.4219 20.1202C16.9341 17.0573 21.0511 13.4128 21 8.28797C20.9747 5.81906 19.0162 3.75 16.5431 3.75V3.75Z"
                                                                        stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                                        strokeLinejoin="round" />
                                                                </svg>
                                                                Favorites
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/#">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    className="me-3" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M7.5 8.25V6.75C7.5 5.55653 7.97411 4.41193 8.81802 3.56802C9.66193 2.72411 10.8065 2.25 12 2.25V2.25C13.1935 2.25 14.3381 2.72411 15.182 3.56802C16.0259 4.41193 16.5 5.55653 16.5 6.75V8.25M3.75 8.25C3.55109 8.25 3.36032 8.32902 3.21967 8.46967C3.07902 8.61032 3 8.80109 3 9V19.125C3 20.5425 4.2075 21.75 5.625 21.75H18.375C19.7925 21.75 21 20.6011 21 19.1836V9C21 8.80109 20.921 8.61032 20.7803 8.46967C20.6397 8.32902 20.4489 8.25 20.25 8.25H3.75Z"
                                                                        stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                                        strokeLinejoin="round" />
                                                                    <path
                                                                        d="M7.5 10.5V11.25C7.5 12.4435 7.97411 13.5881 8.81802 14.432C9.66193 15.2759 10.8065 15.75 12 15.75C13.1935 15.75 14.3381 15.2759 15.182 14.432C16.0259 13.5881 16.5 12.4435 16.5 11.25V10.5"
                                                                        stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                                        strokeLinejoin="round" />
                                                                </svg>
                                                                My Collections
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    className="me-3" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M19.5 6.75H4.5C3.25736 6.75 2.25 7.75736 2.25 9V18C2.25 19.2426 3.25736 20.25 4.5 20.25H19.5C20.7426 20.25 21.75 19.2426 21.75 18V9C21.75 7.75736 20.7426 6.75 19.5 6.75Z"
                                                                        stroke="white" strokeWidth="1.5"
                                                                        strokeLinejoin="round" />
                                                                    <path
                                                                        d="M19.2825 6.74998V5.34373C19.2824 4.99883 19.2062 4.6582 19.0592 4.34615C18.9123 4.0341 18.6984 3.75832 18.4326 3.53849C18.1668 3.31866 17.8558 3.16019 17.5217 3.0744C17.1877 2.98861 16.8388 2.9776 16.5 3.04217L4.155 5.1492C3.6189 5.25136 3.13526 5.53741 2.78749 5.958C2.43972 6.37859 2.24963 6.90736 2.25 7.4531V9.74998"
                                                                        stroke="white" strokeWidth="1.5"
                                                                        strokeLinejoin="round" />
                                                                    <path
                                                                        d="M17.25 15C16.9533 15 16.6633 14.912 16.4166 14.7472C16.17 14.5824 15.9777 14.3481 15.8642 14.074C15.7506 13.7999 15.7209 13.4983 15.7788 13.2074C15.8367 12.9164 15.9796 12.6491 16.1893 12.4393C16.3991 12.2296 16.6664 12.0867 16.9574 12.0288C17.2483 11.9709 17.5499 12.0006 17.824 12.1142C18.0981 12.2277 18.3324 12.42 18.4972 12.6666C18.662 12.9133 18.75 13.2033 18.75 13.5C18.75 13.8978 18.592 14.2794 18.3107 14.5607C18.0294 14.842 17.6478 15 17.25 15Z"
                                                                        fill="white" />
                                                                </svg>
                                                                Wallet
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div>
                                                        <div
                                                            className="d-flex flex-row justify-content-start align-items-center mSocial">
                                                            <div>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                                        d="M22.5 12.0633C22.5 6.26487 17.7984 1.5633 12 1.5633C6.20156 1.5633 1.5 6.26487 1.5 12.0633C1.5 17.3039 5.33906 21.6478 10.3594 22.4363V15.0994H7.69266V12.0633H10.3594V9.75002C10.3594 7.11893 11.9273 5.6644 14.3255 5.6644C15.4744 5.6644 16.6763 5.86971 16.6763 5.86971V8.45393H15.3516C14.048 8.45393 13.6402 9.26299 13.6402 10.0946V12.0633H16.552L16.087 15.0994H13.6406V22.4372C18.6609 21.6492 22.5 17.3053 22.5 12.0633Z"
                                                                        fill="white" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M23.25 5.13277C22.406 5.4995 21.513 5.74111 20.5992 5.84996C21.5595 5.28764 22.2817 4.39429 22.6303 3.33746C21.7224 3.86836 20.7307 4.24087 19.6978 4.43902C19.2629 3.98317 18.7397 3.62054 18.1603 3.37315C17.5808 3.12576 16.9571 2.99879 16.327 2.99996C13.7761 2.99996 11.7117 5.03433 11.7117 7.54214C11.7099 7.89097 11.7499 8.23876 11.8308 8.57808C10.0016 8.49233 8.2104 8.0257 6.57187 7.20805C4.93333 6.39039 3.48351 5.23972 2.31516 3.82964C1.90527 4.52064 1.6885 5.30904 1.6875 6.11246C1.6875 7.68746 2.50922 9.07965 3.75 9.89527C3.01487 9.87782 2.29481 9.68326 1.65094 9.32808V9.38433C1.65094 11.5875 3.24469 13.4203 5.35406 13.8375C4.9574 13.9432 4.54864 13.9968 4.13812 13.9968C3.84683 13.9973 3.5562 13.9691 3.27047 13.9125C3.85687 15.7171 5.56359 17.0296 7.58531 17.0671C5.94252 18.3332 3.9256 19.0175 1.85156 19.0125C1.48341 19.0119 1.11561 18.99 0.75 18.9468C2.85993 20.2941 5.31255 21.0068 7.81594 21C16.3172 21 20.9616 14.0765 20.9616 8.07183C20.9616 7.87496 20.9564 7.67808 20.947 7.4859C21.8485 6.84467 22.6283 6.04782 23.25 5.13277Z"
                                                                        fill="white" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <g clipPath="url(#clip0_50:5)">
                                                                        <path
                                                                            d="M23.8423 6.97453C23.8423 4.86516 22.2907 3.16828 20.3735 3.16828C17.7767 3.04687 15.1282 3 12.4217 3H11.5779C8.87792 3 6.2248 3.04687 3.62792 3.16875C1.71542 3.16875 0.163859 4.875 0.163859 6.98437C0.0466718 8.65266 -0.00301573 10.3214 -0.000203231 11.9902C-0.00489073 13.6589 0.0482343 15.3292 0.159172 17.0011C0.159172 19.1105 1.71073 20.8214 3.62323 20.8214C6.35136 20.948 9.1498 21.0042 11.9951 20.9995C14.8451 21.0089 17.6357 20.9495 20.367 20.8214C22.2842 20.8214 23.8357 19.1105 23.8357 17.0011C23.9482 15.3277 23.9998 13.6589 23.9951 11.9855C24.0057 10.3167 23.9548 8.64641 23.8423 6.97453ZM9.70292 16.5886V7.37766L16.4998 11.9808L9.70292 16.5886Z"
                                                                            fill="white" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_50:5">
                                                                            <rect width="24" height="24" fill="white" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M16.13 10.95C14.7753 10.95 14.5878 12.3 14.5878 12.3H17.4659C17.4659 12.3 17.4847 10.95 16.13 10.95V10.95ZM9.60029 12.3H7.05029V14.6437H9.47373C9.83935 14.6344 10.5237 14.5312 10.5237 13.5047C10.5237 12.2859 9.60029 12.3 9.60029 12.3V12.3Z"
                                                                        fill="white" />
                                                                    <path
                                                                        d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM14.2125 7.95H17.8266V9.02813H14.2125V7.95V7.95ZM12.3844 13.6125C12.3844 16.2844 9.6 16.2 9.6 16.2H5.04375V7.43438H9.6C10.9875 7.43438 12.0797 8.19844 12.0797 9.76875C12.0797 11.3391 10.7437 11.4375 10.7437 11.4375C12.5062 11.4375 12.3844 13.6125 12.3844 13.6125ZM19.1437 13.4672H14.6016C14.6016 15.0937 16.1437 14.9906 16.1437 14.9906C17.6016 14.9906 17.55 14.0484 17.55 14.0484H19.0922C19.0922 16.5516 16.0922 16.3781 16.0922 16.3781C12.4969 16.3781 12.7266 13.0266 12.7266 13.0266C12.7266 13.0266 12.7219 9.66094 16.0922 9.66094C19.6406 9.66563 19.1437 13.4672 19.1437 13.4672V13.4672Z"
                                                                        fill="white" />
                                                                    <path
                                                                        d="M10.219 9.90469C10.219 8.99531 9.60029 8.99531 9.60029 8.99531H7.05029V10.95H9.44092C9.85342 10.95 10.219 10.8141 10.219 9.90469Z"
                                                                        fill="white" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M20.8205 1.5H3.29437C2.33672 1.5 1.5 2.18906 1.5 3.13547V20.7005C1.5 21.652 2.33672 22.5 3.29437 22.5H20.8153C21.7781 22.5 22.5 21.6464 22.5 20.7005V3.13547C22.5056 2.18906 21.7781 1.5 20.8205 1.5ZM8.00953 19.0045H5.00109V9.65063H8.00953V19.0045ZM6.60937 8.22844H6.58781C5.625 8.22844 5.00156 7.51172 5.00156 6.61453C5.00156 5.70094 5.64141 5.00109 6.62578 5.00109C7.61016 5.00109 8.2125 5.69578 8.23406 6.61453C8.23359 7.51172 7.61016 8.22844 6.60937 8.22844ZM19.0045 19.0045H15.9961V13.89C15.9961 12.6647 15.5583 11.8275 14.4698 11.8275C13.6383 11.8275 13.1461 12.39 12.9272 12.938C12.8452 13.1348 12.8231 13.403 12.8231 13.6767V19.0045H9.81469V9.65063H12.8231V10.9523C13.2609 10.3289 13.9448 9.43172 15.5362 9.43172C17.5111 9.43172 19.005 10.7334 19.005 13.5398L19.0045 19.0045Z"
                                                                        fill="white" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <ul className="mobileLeftMenu">
                                                            <li>
                                                                <a href="/">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                        className="me-3" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M12.2948 9.01453C11.6793 8.95374 11.06 9.08469 10.5218 9.38945C9.98353 9.69421 9.55266 10.1579 9.28813 10.717C9.02361 11.2761 8.93836 11.9033 9.04406 12.5127C9.14976 13.1221 9.44125 13.684 9.87861 14.1213C10.316 14.5587 10.8778 14.8502 11.4872 14.9559C12.0967 15.0616 12.7239 14.9763 13.283 14.7118C13.8421 14.4473 14.3057 14.0164 14.6105 13.4782C14.9152 12.94 15.0462 12.3207 14.9854 11.7052C14.9161 11.0151 14.6104 10.3703 14.12 9.87995C13.6296 9.38958 12.9848 9.08384 12.2948 9.01453V9.01453ZM19.5182 12C19.5163 12.3261 19.4923 12.6517 19.4465 12.9745L21.5657 14.6367C21.658 14.7132 21.7202 14.8199 21.7412 14.9379C21.7622 15.056 21.7407 15.1776 21.6806 15.2812L19.6757 18.75C19.6148 18.8527 19.5197 18.9305 19.407 18.9699C19.2943 19.0093 19.1713 19.0076 19.0598 18.9652L16.9551 18.1177C16.839 18.0714 16.7133 18.0547 16.5892 18.0691C16.4651 18.0834 16.3465 18.1283 16.244 18.1997C15.9228 18.4209 15.5853 18.6174 15.2343 18.7875C15.124 18.8411 15.0285 18.9211 14.9564 19.0203C14.8843 19.1196 14.8378 19.2351 14.8209 19.3566L14.5054 21.6014C14.4847 21.72 14.4234 21.8276 14.3321 21.906C14.2408 21.9844 14.1251 22.0287 14.0048 22.0312H9.99509C9.87675 22.0292 9.76264 21.9869 9.67155 21.9113C9.58047 21.8357 9.51784 21.7314 9.494 21.6155L9.179 19.3739C9.16131 19.2511 9.11354 19.1345 9.03994 19.0346C8.96634 18.9346 8.86919 18.8544 8.75712 18.8011C8.4066 18.6319 8.07021 18.4349 7.75118 18.2119C7.64904 18.1408 7.53082 18.0963 7.40717 18.0823C7.28353 18.0683 7.15835 18.0853 7.0429 18.1317L4.93868 18.9788C4.82717 19.0212 4.70425 19.023 4.59158 18.9837C4.4789 18.9444 4.3837 18.8666 4.32275 18.7641L2.3179 15.2953C2.25763 15.1917 2.23609 15.07 2.25712 14.952C2.27815 14.834 2.34039 14.7272 2.43275 14.6508L4.22384 13.2445C4.32197 13.1666 4.39909 13.0655 4.4482 12.9502C4.49732 12.835 4.51687 12.7093 4.50509 12.5845C4.48822 12.3891 4.4779 12.1941 4.4779 11.9986C4.4779 11.8031 4.48775 11.6109 4.50509 11.4197C4.51558 11.2957 4.49507 11.1711 4.4454 11.057C4.39573 10.9429 4.31846 10.843 4.22056 10.7662L2.4304 9.36C2.33954 9.28317 2.27862 9.17681 2.2583 9.05957C2.23799 8.94232 2.25959 8.82167 2.31931 8.71875L4.32415 5.25C4.38504 5.14734 4.48021 5.06946 4.59289 5.0301C4.70557 4.99074 4.82853 4.99242 4.94009 5.03484L7.04478 5.88234C7.16084 5.92856 7.28656 5.94525 7.41066 5.93094C7.53476 5.91662 7.65338 5.87174 7.75587 5.80031C8.07708 5.57912 8.41461 5.38262 8.76556 5.2125C8.87589 5.15887 8.97132 5.07891 9.04343 4.97966C9.11553 4.88042 9.16209 4.76494 9.179 4.64344L9.49447 2.39859C9.51519 2.28004 9.57644 2.17236 9.66775 2.09396C9.75906 2.01555 9.87476 1.9713 9.99509 1.96875H14.0048C14.1231 1.9708 14.2372 2.01309 14.3283 2.08867C14.4194 2.16425 14.482 2.2686 14.5059 2.38453L14.8209 4.62609C14.8386 4.74894 14.8863 4.86551 14.9599 4.96544C15.0335 5.06537 15.1307 5.14557 15.2427 5.19891C15.5933 5.3681 15.9297 5.56514 16.2487 5.78813C16.3508 5.85919 16.469 5.90373 16.5927 5.91772C16.7163 5.93172 16.8415 5.91473 16.957 5.86828L19.0612 5.02125C19.1727 4.97879 19.2956 4.97704 19.4083 5.01631C19.521 5.05558 19.6162 5.13336 19.6771 5.23594L21.682 8.70469C21.7422 8.80832 21.7638 8.92999 21.7428 9.04802C21.7217 9.16604 21.6595 9.27278 21.5671 9.34922L19.776 10.7555C19.6775 10.8331 19.5999 10.9342 19.5504 11.0494C19.5008 11.1647 19.4809 11.2905 19.4924 11.4155C19.5079 11.6095 19.5182 11.8045 19.5182 12Z"
                                                                            stroke="white" strokeWidth="1.5"
                                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Settings
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="/">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                        className="me-3" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M14.25 15.75V17.625C14.25 18.1223 14.0525 18.5992 13.7008 18.9508C13.3492 19.3025 12.8723 19.5 12.375 19.5H4.875C4.37772 19.5 3.90081 19.3025 3.54917 18.9508C3.19754 18.5992 3 18.1223 3 17.625V6.375C3 5.87772 3.19754 5.40081 3.54917 5.04917C3.90081 4.69754 4.37772 4.5 4.875 4.5H12C13.0355 4.5 14.25 5.33953 14.25 6.375V8.25M17.25 15.75L21 12L17.25 8.25M8.25 12H20.25"
                                                                            stroke="white" strokeWidth="1.5"
                                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Logout
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    {/* <!-- style="position: absolute; bottom: 0; width: 100%;" --> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link className="navbar-brand" to="/">
                                        <img src="./images/logonew.png" alt="" className='logo' />

                                    </Link>
                                </div>

                                {/* <!-- Mobile Search Button Start --> */}

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
