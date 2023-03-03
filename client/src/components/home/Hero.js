import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom'

export default function Hero() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };
    return (
        <>
            <section className="">
                <div className="bg-hero">
                    <div className="container">
                        <div className="heroSection  row">
                            <div className="heroContent px-3 col-lg-8 ">
                                <h1 className="allHeadings">The Ultimate Destination<br />for NFT Enthusiasts</h1>
                                <p className="mt-2">An NFT marketplace that showcases the best features and collections</p>
                                <div className="heroButtons my-3">
                                    <Link to="/all_nfts">
                                        <button className="primary">Explore</button>
                                    </Link>
                                    <Link to="/create_nft">
                                        <button className="secondary">Create</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 pb-5">
                                <Slider {...settings}>
                                    <div className='hero_img '>
                                        <img alt="slider first " src="./images/king.png" width="100%" />

                                    </div>
                                    <div className='hero_img '>
                                        <img alt="slider second" src="./images/magical_bird.png" width="100%" />

                                    </div>
                                    <div className='hero_img '>
                                        <img alt="slider third" src="./images/smoking_nft.png" width="100%" />

                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-0">
                    <div className="box">
                    </div>
                </div>
            </section>
        </>
    )
}
