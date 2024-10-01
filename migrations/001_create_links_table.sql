-- Create links table
CREATE TABLE links (
    hashedShortUrl TEXT PRIMARY KEY,
    encryptedTarget TEXT NOT NULL,
    safeMode INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    ttl INTEGER NOT NULL,
    expireAt TEXT NOT NULL
);

-- Create index on hashedShortUrl
CREATE INDEX idx_hashedShortUrl ON links(hashedShortUrl);

-- Create index on expireAt for efficient cleanup of expired links
CREATE INDEX idx_expireAt ON links(expireAt);