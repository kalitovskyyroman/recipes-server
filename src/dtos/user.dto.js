const getUserDto = (model) => ({
    id: model._id,
    name: model.name,
    email: model.email,
    role: {
        name: model.role.name,
    },
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
});

export { getUserDto };
