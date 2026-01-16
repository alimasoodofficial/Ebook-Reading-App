-- Create Database (if not exists - usually run manually or checked)
-- IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'LexiconLoungeDB')
-- BEGIN
--     CREATE DATABASE LexiconLoungeDB
-- END
-- GO
-- USE LexiconLoungeDB
-- GO

-- 1. Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL CHECK (role IN ('Reader', 'Curator')),
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    badges_json NVARCHAR(MAX) DEFAULT '[]', -- Storing badges as JSON array
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- 2. Books Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Books' AND xtype='U')
CREATE TABLE Books (
    isbn NVARCHAR(20) PRIMARY KEY, -- using ISBN as PK
    title NVARCHAR(255) NOT NULL,
    author NVARCHAR(255) NOT NULL,
    genre NVARCHAR(100) NOT NULL, -- 'Fiction', 'Academic', 'Graphic Novel'
    price DECIMAL(10, 2) NOT NULL,
    stock_new INT DEFAULT 0,
    stock_used INT DEFAULT 0,
    is_vault_item BIT DEFAULT 0,
    cover_image NVARCHAR(500), -- URL to image
    blind_date_tropes NVARCHAR(MAX), -- Description for Blind Date mode
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- 3. SeriesLogic Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SeriesLogic' AND xtype='U')
CREATE TABLE SeriesLogic (
    id INT IDENTITY(1,1) PRIMARY KEY,
    trigger_book_isbn NVARCHAR(20) FOREIGN KEY REFERENCES Books(isbn),
    suggested_book_isbn NVARCHAR(20) FOREIGN KEY REFERENCES Books(isbn),
    bundle_discount_percent INT DEFAULT 0
);
GO

-- 4. ReadingTracker Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ReadingTracker' AND xtype='U')
CREATE TABLE ReadingTracker (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES Users(id),
    book_isbn NVARCHAR(20) FOREIGN KEY REFERENCES Books(isbn),
    current_page INT DEFAULT 0,
    total_pages INT NOT NULL,
    status NVARCHAR(50) CHECK (status IN ('Reading', 'Completed')),
    last_updated DATETIME DEFAULT GETDATE()
);
GO

-- 5. BuybackRequests Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BuybackRequests' AND xtype='U')
CREATE TABLE BuybackRequests (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES Users(id),
    book_title NVARCHAR(255) NOT NULL,
    condition NVARCHAR(50) CHECK (condition IN ('Good', 'Fair', 'Poor')),
    photo_url NVARCHAR(500),
    status NVARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Rejected')),
    credit_amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- 6. MidnightVault Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='MidnightVault' AND xtype='U')
CREATE TABLE MidnightVault (
    vault_id INT IDENTITY(1,1) PRIMARY KEY,
    book_isbn NVARCHAR(20) FOREIGN KEY REFERENCES Books(isbn),
    release_time DATETIME NOT NULL,
    available_qty INT DEFAULT 0,
    is_active BIT DEFAULT 1
);
GO

-- 7. DebateArena Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DebateArena' AND xtype='U')
CREATE TABLE DebateArena (
    topic_id INT IDENTITY(1,1) PRIMARY KEY,
    question NVARCHAR(500) NOT NULL,
    option_a_label NVARCHAR(100) NOT NULL,
    option_b_label NVARCHAR(100) NOT NULL,
    vote_count_a INT DEFAULT 0,
    vote_count_b INT DEFAULT 0,
    active_date DATE DEFAULT CAST(GETDATE() AS DATE) -- One active topic per day/week logic
);
GO

-- Seed Data (Optional - for testing)
-- INSERT INTO Users (email, password_hash, role, wallet_balance) VALUES ('admin@lexicon.com', 'hashed_secret', 'Curator', 0);


USE LexiconLoungeDB;
SELECT * FROM Users;
