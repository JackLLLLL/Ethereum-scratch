pragma solidity ^0.4.24;

/// @title ERC-721 Non-Fungible Token Standard
/// @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
///  Note: the ERC-165 identifier for this interface is 0x80ac58cd
interface ERC721 /* is ERC165 */ {
    // /// @dev This emits when ownership of any NFT changes by any mechanism.
    // ///  This event emits when NFTs are created (`from` == 0) and destroyed
    // ///  (`to` == 0). Exception: during contract creation, any number of NFTs
    // ///  may be created and assigned without emitting Transfer. At the time of
    // ///  any transfer, the approved address for that NFT (if any) is reset to none.
    // event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    // /// @dev This emits when the approved address for an NFT is changed or
    // ///  reaffirmed. The zero address indicates there is no approved address.
    // ///  When a Transfer event emits, this also indicates that the approved
    // ///  address for that NFT (if any) is reset to none.
    // event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

    // /// @dev This emits when an operator is enabled or disabled for an owner.
    // ///  The operator can manage all NFTs of the owner.
    // event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, and this
    ///  function throws for queries about the zero address.
    /// @param _owner An address for whom to query the balance
    /// @return The number of NFTs owned by `_owner`, possibly zero
    function balanceOf(address _owner) external view returns (uint256);

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) external view returns (address);

    // /// @notice Transfers the ownership of an NFT from one address to another address
    // /// @dev Throws unless `msg.sender` is the current owner, an authorized
    // ///  operator, or the approved address for this NFT. Throws if `_from` is
    // ///  not the current owner. Throws if `_to` is the zero address. Throws if
    // ///  `_tokenId` is not a valid NFT. When transfer is complete, this function
    // ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    // ///  `onERC721Received` on `_to` and throws if the return value is not
    // ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    // /// @param _from The current owner of the NFT
    // /// @param _to The new owner
    // /// @param _tokenId The NFT to transfer
    // /// @param data Additional data with no specified format, sent in call to `_to`
    // function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;

    // /// @notice Transfers the ownership of an NFT from one address to another address
    // /// @dev This works identically to the other function with an extra data parameter,
    // ///  except this function just sets data to ""
    // /// @param _from The current owner of the NFT
    // /// @param _to The new owner
    // /// @param _tokenId The NFT to transfer
    // function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;

    // /// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    // ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    // ///  THEY MAY BE PERMANENTLY LOST
    // /// @dev Throws unless `msg.sender` is the current owner, an authorized
    // ///  operator, or the approved address for this NFT. Throws if `_from` is
    // ///  not the current owner. Throws if `_to` is the zero address. Throws if
    // ///  `_tokenId` is not a valid NFT.
    // /// @param _from The current owner of the NFT
    // /// @param _to The new owner
    // /// @param _tokenId The NFT to transfer
    // function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

    // /// @notice Set or reaffirm the approved address for an NFT
    // /// @dev The zero address indicates there is no approved address.
    // /// @dev Throws unless `msg.sender` is the current NFT owner, or an authorized
    // ///  operator of the current owner.
    // /// @param _approved The new approved NFT controller
    // /// @param _tokenId The NFT to approve
    // function approve(address _approved, uint256 _tokenId) external payable;

    // /// @notice Enable or disable approval for a third party ("operator") to manage
    // ///  all of `msg.sender`'s assets.
    // /// @dev Emits the ApprovalForAll event. The contract MUST allow
    // ///  multiple operators per owner.
    // /// @param _operator Address to add to the set of authorized operators.
    // /// @param _approved True if the operator is approved, false to revoke approval
    // function setApprovalForAll(address _operator, bool _approved) external;

    // /// @notice Get the approved address for a single NFT
    // /// @dev Throws if `_tokenId` is not a valid NFT
    // /// @param _tokenId The NFT to find the approved address for
    // /// @return The approved address for this NFT, or the zero address if there is none
    // function getApproved(uint256 _tokenId) external view returns (address);

    // /// @notice Query if an address is an authorized operator for another address
    // /// @param _owner The address that owns the NFTs
    // /// @param _operator The address that acts on behalf of the owner
    // /// @return True if `_operator` is an approved operator for `_owner`, false otherwise
    // function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}

interface ERC165 {
    /// @notice Query if a contract implements an interface
    /// @param interfaceID The interface identifier, as specified in ERC-165
    /// @dev Interface identification is specified in ERC-165. This function
    ///  uses less than 30,000 gas.
    /// @return `true` if the contract implements `interfaceID` and
    ///  `interfaceID` is not 0xffffffff, `false` otherwise
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

interface ERC721TokenReceiver {
    /// @notice Handle the receipt of an NFT
    /// @dev The ERC721 smart contract calls this function on the
    /// recipient after a `transfer`. This function MAY throw to revert and reject the transfer. Return
    /// of other than the magic value MUST result in the transaction being reverted.
    /// @notice The contract address is always the message sender. 
    /// @param _operator The address which called `safeTransferFrom` function
    /// @param _from The address which previously owned the token
    /// @param _tokenId The NFT identifier which is being transferred
    /// @param _data Additional data with no specified format
    /// @return `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    /// unless throwing
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external returns(bytes4);
}

/// @dev use to pause contracts
contract ScratchAccessControl {
    /// @dev This contract is used to pause contracts when necessary

    /// @dev address of admin
    address public adminAddress;

    /// @dev state of contracts
    bool public paused = false;

    /// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        require(msg.sender == adminAddress);
        _;
    }

    /// @dev Set new admin 
    function setAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0));
        
        adminAddress = _newAdmin;
    }

    /// @dev Access modifier to control actions depends on paused state
    modifier whenPaused() {
        require(paused);
        _;
    }

    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /// @dev Only admin can control paused state
    function pause() external onlyAdmin whenNotPaused {
        paused = true;
    }

    function unpause() external onlyAdmin whenPaused {
        paused = false;
    }
}

/// @dev Base contract for scratch
contract ScratchBase is ScratchAccessControl {
    /* EVENTS */
    /// @dev Transfer events fired whenever a scratch bought by someone
    event Transfer(address from, address to, uint256 tokenId);

    /* DATA TYPES */
    /// @dev Scratch struct 
    struct Scratch {
        // time when this scratch be created
        uint64 createTime;

        // time when this scratch be bought
        uint64 boughtTime;

        // prize value of this scratch
        uint16 prizeValue;

    }

    /* CONSTANTS */

    /* STORAGE */
    // array to store all scratchs
    Scratch[] scratches;
    
    // array to store all unsold cards
    uint256 sold = 0;

    /// @dev Scratch id to owner address
    mapping (uint256 => address) public scratchIndexToOwner;

    /// @dev scratchs owned by one owner 
    mapping (address => uint256) public ownershipTokenCount;

    /// @dev Assign ownership of a specific scratch card to an address
    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;

        scratchIndexToOwner[_tokenId] = _to;

        // _from must be 0x0 in this scratch contract
        if (_from != address(0)) {
            revert();
        }

        // Emit event
        // Transfer(_from, _to, _tokenId);
    }

    /// @dev Initialize scratch card
    /// @param _prizeValue Amount of prize displayed on card
    function _createCard(uint16 _prizeValue) internal returns (uint256) {

        Scratch memory _scratch = Scratch({
            createTime: uint64(now),
            boughtTime: 0,
            prizeValue: uint16(_prizeValue)
        });

        uint256 newScratchId = scratches.push(_scratch) - 1;

        return newScratchId;
    }
}

/// @dev Main function part of scratch card
contract ScratchMain is ScratchBase, ERC721 {
    /// @dev Name and type of scratch card
    string public name;
    string public symbol;
    string public constant objectType = "scratch";
    uint256 public totalSupply;
    uint16 public price;
    uint8 public prizePercentage;
    uint16 public prizeValue;

    /// @dev initialize function when this contract first being deployed
    /// @param _totalSupply is the number of total scratch cards
    /// @param _prizePercentage is the percentage of card with prize
    /// @param _prizeValue is the prize won in scratch card
    /// @param _name is the name of contract
    /// @param _symbol is the symbol of contract
    constructor (
        uint256 _totalSupply,
        uint8  _prizePercentage,
        uint16 _prizeValue,
        uint16 _price,
        string _name,
        string _symbol
    ) public {
        // set name, symbol, and total scratch supply
        totalSupply = _totalSupply;
        name = _name;
        symbol = _symbol;
        price = _price;
        prizePercentage = _prizePercentage;
        prizeValue = _prizeValue;

        // set admin
        adminAddress = msg.sender;
        uint256 prizeNumber = uint256 ((uint256 (totalSupply * prizePercentage)) / 100);

        // initialize all totalSupply scratch cards
        uint i = totalSupply;
        uint j = prizeNumber;
        uint result;
        for ( ; i != 0; i--) {
            // create a random number
            uint random = uint(keccak256(abi.encodePacked(now, i, block.difficulty))) % 100;

            // if all cards not created have prize
            if (j != 0 && i == j) {
                // create card
                result = _createCard(prizeValue);
                j--;
            } else if (j != 0 && i > j) { // if not all cards have prize
                // approximately make prize cards satisfy the percentage
                if (random < prizePercentage) {
                    result = _createCard(prizeValue);
                    j--;
                } else {
                    result = _createCard(0);
                }
            } else if (j == 0) { // if no prize left 
                result = _createCard(0);
            }      
        }
    }

    /// @dev check the number of cards owned by one address
    /// @param _owner the owner address
    function balanceOf(address _owner) public view returns (uint256) {
        return ownershipTokenCount[_owner];
    }

    /// @dev check the total supply
    function totalSupply() public view returns (uint256) {
        // return totalSupply;
        return scratches.length;
    }

    /// @dev check the price of scratch card
    function price() public view returns (uint256) {
        return price;
    }

    /// @dev check the owner of scratch card
    /// @param _tokenId id of scratch card
    function ownerOf(uint256 _tokenId) external view returns (address owner) {
        owner = scratchIndexToOwner[_tokenId];
        // if card not sold
        require(owner != address(0));
    }

    /// @dev get the number of sold scratch cards
    function getSold() public view returns (uint256) {
        return sold;
    }

    /// @dev get prize value on scratch card given id
    function prizeOf(uint256 _tokenId) external view returns (uint16) {
        return scratches[_tokenId].prizeValue;
    }

    /// @dev buy one card
    function buyScratch() external payable whenNotPaused returns (uint256) {
        // Avoid strange things happen
        require(msg.sender != address(0));

        // check paid amount
        require(msg.value == price * (10 ** 18));

        // check if all cards are sold out
        require(sold != totalSupply);

        // got it!
        scratches[sold].boughtTime = uint64(now);
        scratchIndexToOwner[sold] = msg.sender;
        ownershipTokenCount[msg.sender]++;
        sold++;

        //
        return sold;
    }

    /// @dev get all eth back
    function retrieveAllEth() external onlyAdmin {
        // get balance of contract
        uint256 amount = address(this).balance;

        // check balance
        require(amount > 0);

        // transfer all ehter
        msg.sender.transfer(amount);
    }

}
