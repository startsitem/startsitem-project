import { handleCatch, handleCustomError } from './index';


const subscriptionCheckMiddleware = async (req: any, res: any, next: any) => {
    try {
        const user = req.user_data;

        if (!user) {
            throw await handleCustomError("UNAUTHORIZED", "ENGLISH");
        }

        if (user.subscription_status === "active") {
            return next();
        }

        if (user.has_accessed_once) {
            return res.status(403).json({
                success: false,
                message: "You have already used your one-time access. Please subscribe for unlimited access.",
            });
        }

        next();
    } catch (err) {
        handleCatch(res, err);
    }
};

export default subscriptionCheckMiddleware;
