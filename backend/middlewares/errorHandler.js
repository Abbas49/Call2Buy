const isDatabaseOrUpstreamDown = (err) => {
    if (!err) return false;
    const msg = typeof err.message === "string" ? err.message : "";
    const code = err.code || "";
    const status = err.statusCode || err.status || 0;

    return (
        status === 521 ||
        status === 502 ||
        status === 503 ||
        status === 504 ||
        msg.includes("521: Web server is down") ||
        msg.includes("521") ||
        msg.startsWith("<!DOCTYPE") ||
        msg.includes("<html") ||
        msg.includes("Cloudflare") ||
        msg.includes("fetch failed") ||
        msg.includes("ECONNREFUSED") ||
        msg.includes("ETIMEDOUT") ||
        msg.includes("ENOTFOUND") ||
        code === "ECONNREFUSED" ||
        code === "ETIMEDOUT" ||
        code === "ENOTFOUND" ||
        code === "PGRST000"
    );
};

const errorHandler = async (err, req, res, next) => {
    // Log technical detail to the server console for developers
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, {
        status: err.statusCode || err.status || 500,
        message: typeof err.message === "string" ? err.message.slice(0, 300) : err
    });

    if (isDatabaseOrUpstreamDown(err)) {
        return res.status(503).json({
            status: "standby",
            code: "DATABASE_STANDBY",
            message: "Welcome! Call2Buy was engineered as a university showcase to demonstrate full-stack marketplace design. To optimize free-tier cloud infrastructure, the demo database enters standby mode during periods of low activity."
        });
    }

    let status = err.statusCode || err.status || 500;
    let message = err.message || "An unexpected internal server error occurred.";

    // Prevent any raw HTML error page from leaking in JSON responses
    if (typeof message === "string" && (message.trim().startsWith("<") || message.includes("521:"))) {
        status = 500;
        message = "An unexpected server error occurred. Please try again shortly.";
    }

    res.status(status).json({
        status: "error",
        message: message,
        ...(err.code ? { code: err.code } : {})
    });
};

export default errorHandler;