export const handleMongooseErrors = (e) => {
    switch (e.code) {
        case 11000:
            return `There was a duplicates error. Duplicates: ${Object.keys(e.keyValue)}`;
        default:
            return "DB error";
    }
};
