// Single source of truth for the JWT cookie options.
// Used when setting the cookie (login/signup) and when clearing it (logout),
// so the two always match.
const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    };
};

module.exports = getCookieOptions;