# University Academic Record DApp

## System Features

- **Blockchain-backed certificate issuance**
  - Academic certificates are anchored on-chain using the `AcademicRecords` smart contract.
  - For each eligible student, the system stores a `documentHash`, issuer, timestamp, and validity flag on the blockchain.

- **End-to-end integrity verification**
  - At issuance, a canonical academic string is built from MySQL data (student ID, name, program, CGPA, graduation year).
  - A SHA-256 hash of this canonical string is stored both in the `certificates` table and on-chain as `documentHash`.
  - At verification, the backend recomputes the hash from the DB snapshot and checks it against the on-chain hash.
  - **If hashes differ, integrity fails**, indicating possible tampering with off-chain records.

- **Admin-controlled write access (authorization via digital signatures)**
  - Only the on-chain `admin` account can issue or revoke certificates (`issueRecord`, `revokeRecord`).
  - This relies on Ethereum transaction signatures: `msg.sender` must equal the stored `admin` address.

- **Revocation without history loss**
  - Certificates can be revoked on-chain by flipping `isValid` to `false` instead of deleting data.
  - The database also tracks `is_revoked`, `revoked_at`, and `revoke_tx_hash` for auditability.
  - Verification shows both validity and revocation status.

- **Student ID–based public verification**
  - Anyone can verify a certificate using only the student ID via `POST /api/verify` or the `/verify` page.


- **Integrated academic, financial, and activity records**
  - Eligibility for certificate issuance is enforced server-side:
    - student must be in `graduated` status,
    - financial clearance must be approved,
    - CGPA is computed from `student_courses` and `courses`.
  - This ensures only academically and financially eligible students receive certificates.

- **Separation of concerns and security boundaries**
  - The frontend never accesses the blockchain, private keys, or database directly.
  - All sensitive operations (DB reads/writes, smart contract calls) are performed via Next.js API routes.
  - This design centralizes security checks and simplifies auditing.
Full-stack academic certificate system using:


- Hardhat + Solidity (`AcademicRecords` contract)
- Next.js App Router (frontend + backend API routes)
- MySQL (off-chain academic data)
- Ethers v6 (backend blockchain interaction)

Architecture:

`Frontend -> API Routes -> (MySQL + Smart Contract)`

The frontend never accesses DB/private key/blockchain directly.

## 1) Prerequisites

- Node.js 20+ (or your current supported version)
- npm
- MySQL 8+

## 2) Install dependencies

### Hardhat

```bash
cd hardhat
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## 3) Database setup

Create DB and tables:

```sql
CREATE DATABASE IF NOT EXISTS academic_system;
USE academic_system;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  program VARCHAR(100),
  enrollment_year INT,
  graduation_year INT,
  status ENUM('active', 'graduated') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20) UNIQUE NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  credit_hours INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  course_code VARCHAR(20) NOT NULL,
  grade VARCHAR(5),
  semester VARCHAR(20),
  year INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_code) REFERENCES courses(course_code)
);

CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  activity_name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE student_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  activity_id INT NOT NULL,
  participation_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE financial_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  tuition_paid BOOLEAN DEFAULT FALSE,
  clearance_approved BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  full_name VARCHAR(100),
  program VARCHAR(100),
  cgpa DECIMAL(3,2),
  graduation_date DATE,
  document_hash VARCHAR(255) NOT NULL,
  blockchain_tx_hash VARCHAR(255),
  contract_address VARCHAR(255),
  is_revoked BOOLEAN DEFAULT FALSE,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pdf_path VARCHAR(255) NULL,
  revoked_at TIMESTAMP NULL,
  revoke_tx_hash VARCHAR(255) NULL,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Recommended uniqueness for grade entries:
ALTER TABLE student_courses
ADD UNIQUE KEY uq_student_course_term (student_id, course_code, semester, year);


-- Add password column to students table
ALTER TABLE students 
ADD COLUMN password_hash VARCHAR(255) NULL
```

## 4) Run local blockchain + deploy contract

### Start local node (Terminal 1)

```bash
cd hardhat
npx hardhat node
```

### Deploy contract (Terminal 2)

```bash
cd hardhat
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address from output.

## 5) Configure frontend env

Create `frontend/.env.local`:

```env
PRIVATE_KEY=YOUR_HARDHAT_ACCOUNT_PRIVATE_KEY
CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
RPC_URL=http://127.0.0.1:8545

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=academic_system

# Optional PDF font override:
# PDF_FONT_PATH=C:\Windows\Fonts\arial.ttf
```

Notes:

- Use Hardhat Account #0 private key if that account deployed the contract.
- If you restart Hardhat node, you must redeploy and update `CONTRACT_ADDRESS`.

### Admin portal credentials

In `frontend/.env.local`, configure the admin login used at `/admin/login`:

# Admin portal credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123  


## 6) Run frontend

```bash
cd frontend
npm run dev
```

Open:

- Home: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- Student: `http://localhost:3000/student`
- Verify: `http://localhost:3000/verify`

## 7) Main API routes

### Admin management

- `POST /api/admin/create-student`
- `POST /api/admin/create-course`
- `POST /api/admin/assign-grade`
- `POST /api/admin/add-activity`
- `POST /api/admin/approve-clearance`
- `POST /api/admin/update-student-status`
- `GET /api/admin/student-summary?studentId=...`

### Certificate lifecycle

- `POST /api/admin/issue-certificate`
- `POST /api/admin/revoke`

### Public verify

- `POST /api/verify`

## 8) Test flow (recommended)

1. Create student in `/admin`(After login 
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123)

2. Create one or more courses
3. Assign grades to student
4. Add activity
5. Approve financial clearance
6. Update student status to `graduated` with graduation year
7. Issue certificate
8. Verify in `/verify`
9. (Optional) Revoke and verify again

## 9) Integrity behavior

At issuance, hash is stored on-chain and generated from canonical academic data.

Verification:

- fetches blockchain record
- fetches issuance snapshot from `certificates`
- rebuilds canonical string
- recalculates SHA-256
- compares with on-chain hash

If someone tampers with DB issuance fields, integrity check fails.

## 10) Troubleshooting

- `ECONNREFUSED 127.0.0.1:8545` -> Hardhat node not running
- `No Hardhat config file found` -> run hardhat commands from `hardhat/`
- MySQL host privilege errors -> grant DB user access for your host
- Contract mismatch errors -> wrong `CONTRACT_ADDRESS` or redeploy needed

