// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Academic Records Registry
/// @notice Stores hashes of academic certificates for integrity and verification.
/// @dev
/// - The blockchain provides immutability: once a transaction is mined,
///   the data it stores (such as a certificate hash) cannot be altered without
///   a new transaction, which would leave an auditable trail.
/// - Every state-changing transaction is digitally signed by the sender's
///   private key. The EVM verifies the signature and derives `msg.sender`,
///   ensuring that only the actual key holder can act as the `admin`.
/// - Certificates are represented by a SHA-256 hash of the original data
///   (stored off-chain). Any modification to the original document produces
///   a completely different hash, proving integrity.
contract AcademicRecords {
    /// @notice Address with administrative privileges (issuer).
    address public admin;

    /// @notice Single academic record mapped by a student identifier.
    struct Record {
        string studentId;     // University-wide unique identifier for the student.
        string documentHash;  // SHA-256 hash of the off-chain certificate data.
        string issuer;        // Human-readable issuer name (e.g., "Registrar").
        uint256 timestamp;    // Block timestamp when the record was issued.
        bool isValid;         // Revocation flag. false means revoked or non-existent.
    }

    /// @dev Mapping from studentId to their recorded certificate.
    mapping(string => Record) private records;

    /// @notice Emitted whenever a new record is issued on chain.
    /// @param studentId The unique identifier for the student.
    /// @param documentHash The SHA-256 hash of the certificate.
    event RecordIssued(string studentId, string documentHash);

    /// @notice Restricts access to only the admin address.
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    /// @notice Sets the initial admin to the deploying address.
    /// @dev Because deployment is a transaction signed by the deployer,
    ///      `msg.sender` here is cryptographically tied to the deployer's
    ///      private key (digital signature).
    constructor() {
        admin = msg.sender;
    }

    /// @notice Issues a new academic record for a student.
    /// @dev Only the admin can call this. If a record already exists, it is overwritten.
    /// @param studentId University-wide student identifier (e.g., "S12345").
    /// @param documentHash SHA-256 hash of the certificate data.
    /// @param issuer Human-readable issuer label (e.g., "Registrar Office").
    function issueRecord(
        string calldata studentId,
        string calldata documentHash,
        string calldata issuer
    ) external onlyAdmin {
        require(bytes(studentId).length > 0, "studentId required");
        require(bytes(documentHash).length > 0, "documentHash required");
        require(bytes(issuer).length > 0, "issuer required");

        records[studentId] = Record({
            studentId: studentId,
            documentHash: documentHash,
            issuer: issuer,
            timestamp: block.timestamp,
            isValid: true
        });

        emit RecordIssued(studentId, documentHash);
    }

    /// @notice Returns the record associated with a given studentId.
    /// @dev If no record exists, all fields will be default values.
    ///      Off-chain code should treat `isValid == false` or `timestamp == 0`
    ///      as "record does not exist / has been revoked".
    /// @param studentId University-wide student identifier.
    /// @return The Record struct for the given studentId.
    function verifyRecord(
        string calldata studentId
    ) external view returns (Record memory) {
        return records[studentId];
    }

    /// @notice Revokes an existing academic record.
    /// @dev Only the admin can revoke. The record remains on-chain for auditability
    ///      but is marked as invalid.
    /// @param studentId University-wide student identifier.
    function revokeRecord(string calldata studentId) external onlyAdmin {
        Record storage record = records[studentId];
        require(record.timestamp != 0, "Record does not exist");

        record.isValid = false;
    }
}

