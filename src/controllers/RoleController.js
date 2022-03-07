const createRole = async (req, res) => {
    try {
        console.log(req);
        console.log(req.body);
    } catch (error) {
        res.status(500).json(error);
    }
};
const updateRole = async () => {};
const getRole = async () => {};
const deleteRole = async () => {};

export { createRole };
