export const getLocalStorageItemById = (key, id) => {
	const items = JSON.parse(localStorage.getItem(key));
	return items && items.find((item) => item.id === id);
};

export const getLocalStorageItemByName = (key, name) => {
	const items = JSON.parse(localStorage.getItem(key));
	return items && items.find((item) => item.name.toLowerCase() === name.toLowerCase());
};

export const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setLocalStorageItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const addLocalStorageItem = (key, item) => {
	const existing = JSON.parse(localStorage.getItem(key));
	setLocalStorageItem(key, [...existing, item]);
};
