export const handleView = (navigate, url, setViewForm = null) => {
    navigate(url);
    if (setViewForm) {
        setViewForm(false);
    }
};