// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./NFT.sol";

contract Marketplace is ERC1155Holder, ReentrancyGuard {
    // Variables
    address payable public immutable owner; // the account that receives fees
    uint256 public feePercent; // the fee percentage on sales
    uint256 public itemCount;
    uint256 public auctionCount;
    uint256 public minBidIncrement = 1000000000000000; // 0.001 Eth
    uint256 public registrationFee = 1000000000000000; // 0.001 Eth
    uint256 public marketplaceCommition ;
    uint256 public sellPay ;
    
    // itemId -> Item
    mapping(uint256 => Item) public items;
    // auctionCount  to Auction
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => BidInfo) public bids;
    mapping(address => bool) public registration;
    mapping(address => bool) public blockStatus;

    struct BidInfo {
        uint256 highestBid;
        address highestbidder;
    }

    struct Item {
        uint256 itemId;
        IERC1155 nft;
        uint256 tokenId;
        uint256 price;
        uint256 pricePlusFee;
        address payable seller;
        uint256 totalAmount;
        uint256 amount;
        bool sold;
    }

    struct Auction {
        uint256 auctionId;
        IERC1155 nft;
        uint256 tokenId;
        uint256 price;
        uint256 pricePlusFee;
        address payable creater;
        uint256 amount;
        bool sold;
        uint256 startTime;
        uint256 endTime;
    }

    event Listed(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 pricePlusFee,
        address indexed seller,
        uint256 amount
    );
    event Bought(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 pricePlusFee,
        address indexed seller,
        address indexed buyer
    );

    event AuctionCreated(
        address indexed creater,
        uint256 auctionCounting,
        address indexed nft,
        uint256 tokenId,
        uint256 pricePlusFee,
        uint256 amount
    );

    modifier OnlyRegistered() {
        require(registration[msg.sender] == true, "You Are Not Registered");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner Can Use This Authority");
        _;
    }
    modifier onlyUnBLocked() {
        require(blockStatus[msg.sender] == false, "You are blocked");
        _;
    }

    constructor(uint256 _feePercent) {
        owner = payable(msg.sender);
        feePercent = _feePercent;
        registration[msg.sender] = true;
    }

    //  Admin functionality  ****  update feePercent , update rewardRate , update minBidIncrement, registration fee,  ,burn listedtoken, burn Auction , block user

    function updateFeePercent(uint256 _updatedMarketFee) public onlyOwner {
        feePercent = _updatedMarketFee;
    }

    function updateMinBidIncrement(uint256 _updatedMinBidInc) public onlyOwner {
        minBidIncrement = _updatedMinBidInc;
    }

    function updateRegistrationFee(uint256 _updatedRegFee) public onlyOwner {
        registrationFee = _updatedRegFee;
    }

    function burnItem(uint256 _itemId) public onlyOwner {
        // pending Functionality
        delete items[_itemId];
    }

    function burnAuction(uint256 _auctionId) public onlyOwner {
        // pending functionality
        delete auctions[_auctionId];
    }

    function blockUser(address _user) public onlyOwner {
        // pending functionality
        blockStatus[_user] = true;
    }

    function register() public payable onlyUnBLocked {
        require(msg.value >= registrationFee, "Trying to send less fee");
        require(
            registration[msg.sender] == false,
            "you are already registered"
        );
        (bool sentToOwner, ) = owner.call{value: msg.value}("");
        require(sentToOwner, "Error In Sending to Seller");
        registration[msg.sender] = true;
    }

    // list Item  on the marketplace ************************************

    function makeItem(
        IERC1155 _nft,
        uint256 _tokenId,
        uint256 _price,
        uint256 _amount
    ) public nonReentrant OnlyRegistered onlyUnBLocked {
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount++;
        // transfer nft
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "");
        // add new item to items mapping return((items[_itemId].price*(100 + feePercent))/100);
        uint256 pricePerToken = ((_price * (100 + feePercent)) / 100);

        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            pricePerToken,
            payable(msg.sender),
            _amount,
            _amount,
            false
        );

        // emit Listed event
        emit Listed(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender,
            _amount
        );
    }

    function purchaseItem(
        uint256 _itemId,
        uint256 _amount,
        address _nft
    ) public payable nonReentrant onlyUnBLocked {
        uint256 tokenAmount = _amount;
        Item storage item = items[_itemId];

        uint256 _totalPrice = item.pricePlusFee * _amount;
        require(
            msg.value >= _totalPrice,
            "you did not send enough ether to cover item price and market fee"
        );
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(item.amount > 0, "All Have Been Sold");
        require(item.amount >= _amount, "Not Avaiable Enough Tokens");
        require(item.seller != msg.sender, "Seller Can't Buy His Own Token");
        /// payment sepraion
        uint256 marketplacePayment = getMArketPlaceFee(item.price * _amount);
        uint256 sellerPayment = _totalPrice - marketplacePayment;

        /// sending MarketPlaceFee
        (bool sentToMarketplace, ) = owner.call{value: marketplacePayment}("");
        require(sentToMarketplace, "Error In Sending to MarketPlace");

        if (IERC2981(_nft).supportsInterface(0x2a55205a)) {
            (address creater, uint256 createrShare) = IERC2981(_nft)
                .royaltyInfo(item.tokenId, sellerPayment);
            if (creater != item.seller) {
                //sending creater Royality
                (bool sentToCreater, ) = payable(creater).call{
                    value: createrShare
                }("");
                require(sentToCreater, "Error In Sending to Creater");
                //calculating seller's And marketplace payment payment seprately
                uint256 sellerPaymentExcludingRoyalty = sellerPayment -
                    createrShare;
                (bool sentToSellerExcludingRoyalties, ) = item.seller.call{
                    value: sellerPaymentExcludingRoyalty
                }("");
                require(
                    sentToSellerExcludingRoyalties,
                    "Error In Sending to Seller Excluding Royalties "
                );
                // update item amout
                item.amount -= _amount;

                // transfer nft to buyer
                item.nft.safeTransferFrom(
                    address(this),
                    msg.sender,
                    item.tokenId,
                    tokenAmount,
                    ""
                );
                if (item.amount == 0) {
                    item.sold = true;
                    delete items[_itemId];
                }
            } else {
                // sending payment to seller if seller is creater and the contract does not supports royalties
                (bool sentToSeller, ) = item.seller.call{value: sellerPayment}(
                    ""
                );
                require(sentToSeller, "Error In Sending to Seller");

                // update item amout
                item.amount -= _amount;

                // transfer nft to buyer
                item.nft.safeTransferFrom(
                    address(this),
                    msg.sender,
                    item.tokenId,
                    tokenAmount,
                    ""
                );
                if (item.amount == 0) {
                    item.sold = true;
                    delete items[_itemId];
                }
            }
        }

        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    //  to offer on the marketplace  **************************
    function createAuction(
        IERC1155 _nft,
        uint256 _tokenId,
        uint256 _price,
        uint256 _amount,
        uint256 _duration
    ) public nonReentrant OnlyRegistered onlyUnBLocked {
        require(_price > 0, "Price must be greater than zero");
        // require(_duration > 0, "Auction duration must be must at least one day");
        // increment itemCount
        auctionCount++;
        // transfer nft
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "");
        uint256 pricePerAuction = (((_price * (100 + feePercent)) / 100) *
            _amount);

        auctions[auctionCount] = Auction(
            auctionCount,
            _nft,
            _tokenId,
            _price,
            pricePerAuction,
            payable(msg.sender),
            _amount,
            false,
            block.timestamp,
            block.timestamp + _duration
        );
        // initially we assign initial token pricePlusFeePlusMinbidInc  as highest bud for token
        bids[auctionCount].highestBid = pricePerAuction;
        // emit AuctionCreated event
        emit AuctionCreated(
            msg.sender,
            auctionCount,
            address(_nft),
            _tokenId,
            _price,
            _amount
        );
    }

    function placeBid(uint256 _auctionCount)
        public
        payable
        nonReentrant
        onlyUnBLocked
    {
        require(
            msg.sender != auctions[_auctionCount].creater,
            "Creater can't place  bid "
        );
        require(
            msg.value >= bids[_auctionCount].highestBid + minBidIncrement,
            " Sendig Less Eth for Bid "
        );
        
        require(
            auctions[_auctionCount].startTime < block.timestamp,
            "Didn't started yet"
        );
        require(
            auctions[_auctionCount].endTime > block.timestamp,
            "Auctioned Ended"
        );

        //       // transfer older highestbidder his payment
        if (bids[_auctionCount].highestbidder != address(0)) {
            (bool sentToOldBidder, ) = bids[_auctionCount].highestbidder.call{
                value: bids[_auctionCount].highestBid
            }("");
            require(sentToOldBidder, "Failed to send old bidder");
            bids[_auctionCount].highestbidder = payable(msg.sender);
            bids[_auctionCount].highestBid = msg.value;
        }

        bids[_auctionCount].highestbidder = payable(msg.sender);
        bids[_auctionCount].highestBid = msg.value;
    }


    // // claim the finished auction

    function claimAuction(uint256 _auctionCount, IERC1155 _nft)
        public
        nonReentrant
        onlyUnBLocked
    {
        require(
            auctions[_auctionCount].endTime < block.timestamp,
            "Can't call before end time"
        );
        require(
            bids[_auctionCount].highestbidder == msg.sender,
            "Only highest bidder can claim his auction"
        );
        uint256 _highestBid = bids[_auctionCount].highestBid;
        uint256 amountToMarket = (_highestBid / 100) * feePercent;
        uint256 amountToCreater = _highestBid - amountToMarket;

        (bool sentToMarketPlace, ) = owner.call{value: amountToMarket}("");
        require(sentToMarketPlace, "bidAmount sending failed to MarketPlace");

        (bool sentToAuctionCreater, ) = auctions[_auctionCount].creater.call{
            value: amountToCreater
        }("");
        require(sentToAuctionCreater, "sending failed to auctionCreater");

        _nft.safeTransferFrom(
            address(this),
            bids[_auctionCount].highestbidder,
            auctions[_auctionCount].tokenId,
            auctions[_auctionCount].amount,
            ""
        );

        auctions[_auctionCount].sold = true;
    }

    // ++++++ **********************  Get MarketPlaceFee   *******************************

    function getMArketPlaceFee(uint256 _price) internal view returns (uint256) {
        return ((_price * feePercent) / 100) ;
    }

    // ++++++ **********************  cancelList    *******************************

    function cancelList(uint256 _itemId)
        public
        payable
        nonReentrant
        onlyUnBLocked
        returns (bool)
    {
        Item memory item = items[_itemId];
        uint256 cancelingAmount = item.amount;

        if (msg.sender == owner) {
            require(
                msg.sender == item.seller,
                "Only Item Owner Can Cancel The List"
            );
            item.nft.safeTransferFrom(
                address(this),
                msg.sender,
                item.tokenId,
                cancelingAmount,
                ""
            );

            items[_itemId].sold = true;
            delete items[_itemId];
            return true;
        }

        require(
            msg.value >= registrationFee,           // canceling fee is equal to registrationfee
            "Did Not Send Enough Canceling  Fee"
        );
        require(msg.sender == item.seller, "Only Owner Can Unstake The Item");
        (bool sentToOwner, ) = owner.call{value: msg.value}("");
        require(sentToOwner, " Canceling_Amount sending failed to MarketPlace");

        item.nft.safeTransferFrom(
            address(this),
            msg.sender,
            item.tokenId,
            cancelingAmount,
            ""
        );

        items[_itemId].sold = true;
        delete items[_itemId];
        return true;
    }
}
