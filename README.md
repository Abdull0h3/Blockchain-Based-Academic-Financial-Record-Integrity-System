# University Academic Record DApp

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

1. Create student in `/admin`
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

