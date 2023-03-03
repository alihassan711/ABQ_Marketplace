// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract NFT is ERC1155,Ownable,ERC2981 {
     string public name ="Taken Market";
     string public symbol ="TTN";
     uint96 royaltyPercentage = 1000 ;  // 1000bps = 10%  
     uint public tokenCount;
     mapping(uint => string) private _uris;
   
    constructor() ERC1155("") {     
    }
    
    function mint (string memory _uri,uint256 amount) external  returns(bool) {
          tokenCount ++;
         _mint(msg.sender,tokenCount,amount,'');
         setTokenUri(tokenCount, _uri);
         _setTokenRoyalty(tokenCount,msg.sender,royaltyPercentage);
         return(true);
     }

     function uri(uint tokenId) public view override returns(string memory) {
           return(_uris[tokenId]);
     }

     function setTokenUri(uint256 tokenId,string memory _uri) private{
        _uris[tokenId] = _uri;
     }

     function supportsInterface(bytes4 interfaceId) public view override(ERC1155,ERC2981) returns (bool) {
                  return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
     } 
}   