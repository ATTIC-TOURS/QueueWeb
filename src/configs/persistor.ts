import storage from 'redux-persist/lib/storage/session'

export const persist_config = {
    key: 'root',
    version: 1,
    whitelist: ["branch", "called_tickets", "done_tickets", "called_by_tickets"],
    storage,
};