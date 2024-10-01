-- Create links table
CREATE TABLE links (
    hashedShortUrl TEXT PRIMARY KEY,
    encryptedTarget TEXT NOT NULL,
    safeMode INTEGER NOT NULL,
    createdAt INTEGER NOT NULL, -- Using INTEGER for UNIX timestamp
    expireAt INTEGER NOT NULL -- Using INTEGER for UNIX timestamp
);

-- Create index on hashedShortUrl
CREATE INDEX idx_hashedShortUrl ON links(hashedShortUrl);

-- Create index on expireAt for efficient cleanup of expired links
CREATE INDEX idx_expireAt ON links(expireAt);