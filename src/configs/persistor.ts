import storage from 'redux-persist/lib/storage/session'

export const persist_config = {
    key: 'root',
    version: 1,
    whitelist: ["branch"],
    storage,
};