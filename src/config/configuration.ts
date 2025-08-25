
export default () => ({
    port: parseInt(process.env.PORT || "3000", 10),
    secret: process.env.JWT_SECRET
});