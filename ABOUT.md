# About

This is a free and open source service built with the same privacy features by the people at [FynLink](https://fyn.link).

All links created are [private](https://docs.fyn.link/help/private-link#how-is-a-private-link-stored-in-cache) by default, and will expire in 48 hours.

# How is my short URL stored?

The short URL and target URL are stored in a KV (key-value) database. The short URL itself is stored as a secure hash value, and the target URL is encrypted using an HMAC key which is derived from the actual short URL and a secret that we possess.

This means, the short URL and its target are kept as a secret! No one, but only the person who created the short URL and the person with whom it is shared with, knows about it. This means no one at [FynLink](https://get.fyn.link) will also be able to know the content if someone chooses to!

# How does redirection work?

When a short URL is entered, we will hash the short URL with the same technique that we store them and check our database for its existence. If a match is found, we will use this short URL as data and a secret we possess is used to create an HMAC key that can decrypt the target URL.

# Want more control on your short links?

If you want more control for your short link like a custom link expiry, analytics, API access, user roles & teams all without compromising user privacy, consider buying a paid plan of [FynLink](https://fyn.link/pricing). 
