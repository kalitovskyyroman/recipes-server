import lodash from "lodash";
const { capitalize } = lodash;

const getInfoMessages = (modelName) => ({
    updateSuccessful: `${capitalize(modelName)} updated.`,
    notFound: `Cannot find ${capitalize(modelName)}.`,
    deleteSuccessful: `${capitalize(modelName)} deleted.`,
});

export { getInfoMessages };
