// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title AcademicRecords
/// @notice University-managed academic records with on-chain verification.
contract AcademicRecords {
    address public admin;

    struct Record {
        string studentId;
        string documentHash;
        string issuer;
        uint256 timestamp;
        bool isValid;
    }

    /*
     * The records mapping is private by design:
     * - We do not expose raw storage through an auto-generated public getter.
     * - Reads are routed through a controlled function (verifyRecord), allowing
     *   validation and API evolution without leaking internal storage patterns.
     * - This improves encapsulation and reduces accidental data exposure risks.
     */
    mapping(string => Record) private records;

    event RecordIssued(string studentId, string documentHash);
    event RecordRevoked(string studentId);

    modifier onlyAdmin() {
        // Access control is enforced at the smart-contract boundary.
        // Only the admin account can mutate academic records.
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /// @notice Issues a new academic record (admin only).
    /// @dev Immutability here means record content cannot be overwritten once issued.
    ///      We enforce this by rejecting writes when a record already exists.
    function issueRecord(
        string memory _studentId,
        string memory _documentHash,
        string memory _issuer
    ) external onlyAdmin {
        require(bytes(_studentId).length > 0, "studentId required");
        require(bytes(_documentHash).length > 0, "documentHash required");
        require(bytes(_issuer).length > 0, "issuer required");
        require(records[_studentId].timestamp == 0, "Record already exists");

        records[_studentId] = Record({
            studentId: _studentId,
            documentHash: _documentHash,
            issuer: _issuer,
            timestamp: block.timestamp,
            isValid: true
        });

        emit RecordIssued(_studentId, _documentHash);
    }

    /*
     * verifyRecord acts as a controlled getter:
     * - Instead of exposing `records` publicly, this function defines the official
     *   read interface and returns a full Record struct for clients.
     * - This return shape is friendly for ethers v6, which decodes structs as
     *   tuple-like values with named fields.
     */
    function verifyRecord(string memory _studentId) public view returns (Record memory) {
        Record memory record = records[_studentId];
        require(record.timestamp != 0, "Record not found");
        return record;
    }

    /// @notice Revokes a record by marking it invalid without deleting history.
    function revokeRecord(string memory _studentId) external onlyAdmin {
        Record storage record = records[_studentId];
        require(record.timestamp != 0, "Record not found");
        require(record.isValid, "Record already revoked");

        record.isValid = false;
        emit RecordRevoked(_studentId);
    }

    /*
     * About digital signatures and msg.sender:
     * Every Ethereum transaction is signed with the sender's private key.
     * The EVM recovers the signer from that signature and exposes it as msg.sender.
     * This is why `onlyAdmin` can trust msg.sender for authorization decisions.
     */
}
