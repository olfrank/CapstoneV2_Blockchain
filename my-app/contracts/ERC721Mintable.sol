// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '../helpers/@openzeppelin/Address.sol';
import '../helpers/@openzeppelin/Counters.sol';
import '../helpers/@openzeppelin/SafeMath.sol';
import '../helpers/@openzeppelin/IERC721Receiver.sol';
import "./ProvableAPI.sol";

contract Ownable {
    
    address private _owner;

    event ownershipTransfered(address newOwner, address oldOwner);

    constructor(){ _owner = msg.sender; }
    
    modifier onlyOwner(){
        require(msg.sender == _owner, "You must be the owner of the contract to enter this function");
        _;
    }


    function getOwner()public view returns(address){ return _owner; }


    function transferOwnership(address _newOwner)public onlyOwner{
        _owner = _newOwner;
        emit ownershipTransfered(_newOwner, msg.sender);
    }
}










contract Pausable is Ownable{
    bool private _paused;

    constructor() { _paused = false; }

    event Paused(bool value);
    event UnPaused(bool value);

    modifier whenNotPaused(){
        require(!_paused, "The contract is currently paused, this function is not callable");
        _;
    }


    modifier whenPaused(){
        require(_paused, "The contract is currently unpaused");
        _;
    }


    function setPauseStatus(bool _value) public onlyOwner{
        require(_value == true || _value == false, "you must input a boolean value");
        require(_paused != _value, "You must initialise a different value");

        if(_value){
            _paused = _value;
            emit Paused(_value);
        }else{
            _paused = _value;
            emit UnPaused(_value);
        }
    }


    function getPauseStatus() external view returns(bool status){
        return _paused;
    }
}










contract ERC165 {
    // - 0x01ffc9a7 === bytes4(keccak256('supportsInterface(bytes4)'))
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;
    
    // - mapping of interface id to whether or not it's supported
    mapping(bytes4 => bool) private _supportedInterfaces;

    constructor () {
        _registerInterface(_INTERFACE_ID_ERC165);
    }


    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return _supportedInterfaces[interfaceId];
    }


    function _registerInterface(bytes4 interfaceId) internal {
        require(interfaceId != 0xffffffff);
        _supportedInterfaces[interfaceId] = true;
    }
}










contract ERC721 is Pausable, ERC165 {

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    using SafeMath for uint256;
    using Address for address;
    using Counters for Counters.Counter;

    // - Equals to `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    // - which can be also obtained as `IERC721Receiver(0).onERC721Received.selector`
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // - token ID to owner
    mapping (uint256 => address) private _tokenOwner;

    // - token ID to approved address
    mapping (uint256 => address) private _tokenApprovals;

    // - owner to number of owned token
    mapping (address => Counters.Counter) private _ownedTokensCount;

    // - owner to operator approvals
    mapping (address => mapping (address => bool)) private _operatorApprovals;

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

    constructor (){
        // - registers the supported interfaces to conform to ERC721 via ERC165
        _registerInterface(_INTERFACE_ID_ERC721);
    }


    function balanceOf(address owner) public view returns (uint256) {
        return _ownedTokensCount[owner].current();
    }


    function ownerOf(uint256 tokenId) public view returns (address) {
        return _tokenOwner[tokenId];
    }


    //- approves another address to transfer the given token ID
    function approve(address to, uint256 tokenId) public whenNotPaused{
        address tokenOwner = _tokenOwner[tokenId];

        require(to != tokenOwner, "You must not be the owner of the token you are approving");
        require(msg.sender == tokenOwner || isApprovedForAll(to, msg.sender));

        _tokenApprovals[tokenId] = to;

        emit Approval(tokenOwner, to, tokenId);
    }


    function getApproved(uint256 tokenId) public view returns (address) {
        return _tokenApprovals[tokenId];
    }


    function setApprovalForAll(address to, bool approved) public whenNotPaused{
        require(to != msg.sender);
        _operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }


    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }


    function transferFrom(address from, address to, uint256 tokenId) public whenNotPaused{
        require(_isApprovedOrOwner(msg.sender, tokenId), "You must be the owner or approved by the owner of this token");

        _transferFrom(from, to, tokenId);
    }


    function safeTransferFrom(address from, address to, uint256 tokenId) public whenNotPaused{
        safeTransferFrom(from, to, tokenId, "");
    }


    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public whenNotPaused{
        transferFrom(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data));
    }


    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }


    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    
    function _mint(address to, uint256 tokenId) internal virtual whenNotPaused{
        require(_exists(tokenId) == false, "This token already exists");
        require(to != address(0), "Must enter a valid address");
  
        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to].increment();

        emit Transfer(address(0), to, tokenId);
    }


    function _transferFrom(address from, address to, uint256 tokenId) internal virtual whenNotPaused{
        require(from == ownerOf(tokenId), "You must be the owner of the token");
        require(to != address(0), "Must be a valid to address");

        _clearApproval(tokenId);

        _ownedTokensCount[from].decrement();
        _ownedTokensCount[to].increment();
        _tokenOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    
    // - Internal function to invoke `onERC721Received` on a target address
    // The call is not executed if the target address is not a contract
    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data)
        internal returns (bool)
    {
        if (!to.isContract()) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data);
        return (retval == _ERC721_RECEIVED);
    }


    function _clearApproval(uint256 tokenId) private whenNotPaused{
        if (_tokenApprovals[tokenId] != address(0)) {
            _tokenApprovals[tokenId] = address(0);
        }
    }
}










contract ERC721Enumerable is ERC165, ERC721 {
    // - owner to list of owned token IDs
    mapping(address => uint256[]) private _ownedTokens;

    // - token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // - storing all tokenIds
    uint256[] private _allTokens;

    // - token id to position in the allTokens array
    mapping(uint256 => uint256) private _allTokensIndex;

    bytes4 private constant _INTERFACE_ID_ERC721_ENUMERABLE = 0x780e9d63;
    /*
     * 0x780e9d63 ===
     *     bytes4(keccak256('totalSupply()')) ^
     *     bytes4(keccak256('tokenOfOwnerByIndex(address,uint256)')) ^
     *     bytes4(keccak256('tokenByIndex(uint256)'))
     */

    constructor () {
        // register the supported interface to conform to ERC721Enumerable via ERC165
        _registerInterface(_INTERFACE_ID_ERC721_ENUMERABLE);
    }


    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
        require(index < balanceOf(owner));
        return _ownedTokens[owner][index];
    }


    function totalSupply() public view returns (uint256) {
        return _allTokens.length;
    }


    function tokenByIndex(uint256 index) public view returns (uint256) {
        require(index < totalSupply());
        return _allTokens[index];
    }

    
    function _transferFrom(address from, address to, uint256 tokenId) internal override whenNotPaused{
        super._transferFrom(from, to, tokenId);

        _removeTokenFromOwnerEnumeration(from, tokenId);

        _addTokenToOwnerEnumeration(to, tokenId);
    }


    function _mint(address to, uint256 tokenId) internal override whenNotPaused{
        require(!_exists(tokenId), "TokenID already exists");

        super._mint(to, tokenId);

        _addTokenToOwnerEnumeration(to, tokenId);
        _addTokenToAllTokensEnumeration(tokenId);
    }


    function _tokensOfOwner(address owner) internal view returns (uint256[] storage) {
        return _ownedTokens[owner];
    }

    
    // - Private function to add a token to this extension's ownership-tracking data structures.
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }


    // - Private function to add a token to this extension's token tracking data structures.
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    
    // - private function to remove a token from this extension's ownership-tracking data structures. Note that
    // while the token is not assigned a new owner, the _ownedTokensIndex mapping is _not_ updated: this allows for
    // gas optimizations e.g. when performing a transfer operation (avoiding double writes).
    // This has O(1) time complexity, but alters the order of the _ownedTokens array.
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        uint256 lastTokenIndex = _ownedTokens[from].length -1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        _ownedTokens[from].pop();
    }

    
    // - private function to remove a token from this extension's token tracking data structures.
    // - This has O(1) time complexity, but alters the order of the _allTokens array.
    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        uint256 lastTokenIndex = _allTokens.length -1;
        uint256 tokenIndex = _allTokensIndex[tokenId];
        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; 
        _allTokensIndex[lastTokenId] = tokenIndex; 

        _allTokens.pop();
        _allTokensIndex[tokenId] = 0;
    }
}










contract ERC721Metadata is ERC721Enumerable, usingProvable {
    
    string private _name;
    string private _symbol;
    string private _baseTokenURI;

    mapping(uint256 => string) private _tokenURIs;

    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;
    /*
     * 0x5b5e139f ===
     *     bytes4(keccak256('getName()')) ^
     *     bytes4(keccak256('getSymbol()')) ^
     *     bytes4(keccak256('tokenURI(uint256)'))
     */


    constructor (string memory name, string memory symbol, string memory baseTokenURI) {
        _name = name;
        _symbol = symbol;
        _baseTokenURI = baseTokenURI;

        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
    }


    function getName() external view returns(string memory){
        return _name;
    }


    function getSymbol() external view returns(string memory){
        return _symbol;
    }


    function getBaseTokenURI() external view returns(string memory){
        return _baseTokenURI;
    }


    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId));
        return _tokenURIs[tokenId];
    }


   function setTokenURI(uint256 tokenId) internal {
        require(_exists(tokenId), "Token does not exist");
        string memory URI = strConcat(_baseTokenURI, uint2str(tokenId));
        _tokenURIs[tokenId] = URI;
    }
}










contract ERC721Mintable is ERC721Metadata{

    constructor(string memory name, string memory symbol, string memory baseTokenURI) 
    ERC721Metadata(name, symbol, baseTokenURI){ }


    function mint(address to, uint256 tokenId) public onlyOwner whenNotPaused returns(bool){
        super._mint(to, tokenId);
        setTokenURI(tokenId);
        return true;
    }
}



