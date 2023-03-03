import React from 'react'
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

export default function Footer() {
    return (
        <>
            <footer className="footerSection">
                <div className="footerBackground">
                    <div className="footerArea">
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-lg-4">
                                    <h6 className="fColHeading">About Al-Burraq</h6>
                                    <p className="fColText">
                                        Global Experience in Providing Enterprise Solutions to the e-Commerce & Management System Companies.
                                        We understand the value of customization and strive to continually deliver unprecedented solutions which cater directly to your business needs.
                                        Passionate People Creative Thinking.
                                    </p>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <blockquote className="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/Jumma?src=hash&amp;ref_src=twsrc%5Etfw">#Jumma</a> <a href="https://twitter.com/hashtag/Mubarak?src=hash&amp;ref_src=twsrc%5Etfw">#Mubarak</a> <a href="https://twitter.com/hashtag/Everyone?src=hash&amp;ref_src=twsrc%5Etfw">#Everyone</a><br />In the name of Allah, the Most Merciful and Forgiving, “All praise and praise are due to Allah, Who sent down the Book to His servant and did not allow any wrongdoing in it.” (Kehf, 18/1)<a href="https://twitter.com/hashtag/lifeatalburraq?src=hash&amp;ref_src=twsrc%5Etfw">#lifeatalburraq</a> <a href="https://twitter.com/hashtag/JummahMubarak?src=hash&amp;ref_src=twsrc%5Etfw">#JummahMubarak</a> <a href="https://t.co/ldQfv1xaV4">pic.twitter.com/ldQfv1xaV4</a></p>&mdash; Al-Burraq (@AlBurraqTech) <a href="https://twitter.com/AlBurraqTech/status/1591036356800565248?ref_src=twsrc%5Etfw">November 11, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <h6 className="fColHeading">
                                        Struggling with Product Development? Contact Geeks Below.
                                    </h6>
                                    <div className='text-white fColHeading' style={{ fontSize: "14px" }}>
                                        <AiOutlineMail style={{ width: "18px", height: "18px" }} className='me-1 my-2' />
                                        <span className='ms-2'>info@al-burraq.com</span>
                                    </div>
                                    <div className='text-white fColHeading' style={{ fontSize: "14px" }}>
                                        <FiPhoneCall style={{ width: "18px", height: "18px" }} className='me-2 my-2' />
                                        <span className=''>+1 (415) 449 9415</span>
                                    </div>
                                    <div className="socialIcons">
                                        <a href="https://www.facebook.com/alburraqtech"><img src="./images/fb.png" className='me-3 my-2' alt="" /></a>
                                        <a href="https://www.linkedin.com/company/alburraqtech/"><img src="./images/in.png" className='me-3 my-2' alt="" /></a>
                                        <a href="https://twitter.com/AlBurraqTech"><img src="./images/tt.png" className='me-3 my-2' alt="" /></a>
                                    </div>
                                    <p className="ColText">
                                        Privacy Policy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
