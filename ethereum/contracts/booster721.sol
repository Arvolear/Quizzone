pragma solidity ^0.6.2;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Booster is ERC721 {
    address payable private _creator;
    uint256 private _price;

    Counters.Counter private _curTokenId;

    constructor(uint256 price) public ERC721("Quizzone Booster", "BSTR") {
        _creator = msg.sender;
        _price = price;
    }

    function withdrawAll() public {
        require(msg.sender == _creator);

        _creator.transfer(address(this).balance);
    }

    function getPrice() public view returns(uint256) {
        return _price;
    }

    function changePrice(uint256 price) public {
        require(msg.sender == _creator);
        require(price > 0);

        _price = price;
    }

    function buy(address player, uint256 quantity) public payable {
        require(msg.value == SafeMath.mul(_price, quantity));
        require(quantity > 0);

        for (uint256 i = 0; i < quantity; i = SafeMath.add(i, 1)) {
            Counters.increment(_curTokenId);

            uint256 newTokenId = Counters.current(_curTokenId);
            _safeMint(player, newTokenId);
        }
    }

    function burn(address player, uint256[] memory tokens) public {
        for (uint256 i = 0; i < tokens.length; i = SafeMath.add(i, 1)) {
            require(_isApprovedOrOwner(player, tokens[i]));

            _burn(tokens[i]);
        }
    }

    function getOwnedTokens(address player) public view returns (uint256[] memory) {        
        uint256 playerBalance = balanceOf(player);

        uint256[] memory tokens = new uint256[](playerBalance);

        for (uint256 i = 0; i < playerBalance; i = SafeMath.add(i, 1)) {
            tokens[i] = tokenOfOwnerByIndex(player, i);
        }

        return tokens;
    }
}