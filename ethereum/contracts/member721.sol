pragma solidity ^0.6.2;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// import "https://github.com/openzeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
// import "https://github.com/openzeppelin/openzeppelin-contracts/contracts/utils/Counters.sol";

contract Membership is ERC721 {
    address private _creator;
    uint256 private _price;

    mapping (address => bool) public _admins;

    Counters.Counter private _curTokenId;

    constructor(uint256 price) public ERC721("Quizzone Membership", "QZONE") {
        _creator = msg.sender;
        _price = price;

        _admins[_creator] = true;
    }

    function addAdmin(address admin) public {
        require(msg.sender == _creator);

        _admins[admin] = true;
    }

    function removeAdmin(address admin) public {
        require(msg.sender == _creator);

        delete _admins[admin];
    }

    function withdrawAll() public {
        require(_admins[msg.sender] == true);

        msg.sender.transfer(address(this).balance);
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    function changePrice(uint256 price) public {
        require(_admins[msg.sender] == true);
        require(price > 0);

        _price = price;
    }

    function buy(address player) public payable {
        require(msg.value == _price);
        require(balanceOf(player) == 0);

        Counters.increment(_curTokenId);

        uint256 newTokenId = Counters.current(_curTokenId);
        _safeMint(player, newTokenId);
    }

    function burn(uint256[] memory tokens) public {
        require(tokens.length <= balanceOf(msg.sender));

        for (uint256 i = 0; i < tokens.length; i = SafeMath.add(i, 1)) {
            require(_isApprovedOrOwner(msg.sender, tokens[i]));

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

    function isMember(address player) public view returns (bool) {
        uint256 playerBalance = balanceOf(player);

        return playerBalance > 0;
    }
}
