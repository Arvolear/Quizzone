pragma solidity ^0.6.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Booster is ERC721 {
    address private _creator;
    uint256 private _price;

    Counters.Counter private _curTokenId;

    constructor(uint256 price) public ERC721("Quizzone Booster", "BSTR") {
        _creator = msg.sender;
        _price = price;
    }

    function changePrice(uint256 price) external {
        require(msg.sender == _creator);
        require(price > 0);

        _price = price;
    }

    function buy(address player, uint265 quantity) external payable {
        require(msg.value == mul(_price, quantity));
        require(quantity > 0);

        for (uint256 i = 0; i < quantity; i = add(i, 1)) {
            _curTokenId.increment();

            uint256 newTokenId = _curTokenId.current();
            _safeMint(player, newItemId);
        }
    }

    function burn(address player, uint256 token) external {
        require(_isApprovedOrOwner(player, token));

        _burn(token);
    }

    function getOwnedTokens(address player) returns (uint256[]) {
        EnumerableSet.UintSet playerSet = _holderTokens[address];
        uint256 playerBalance = balanceOf(player);

        uint265[] tokens = new uint256(playerBalance);

        for (uint256 i = 0; i < playerBalance; i = add(i, 1)) {
            tokens[i] = playerSet.at(i);
        }

        return tokens;
    }
}
