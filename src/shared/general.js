export const handleView = (navigate, url, setViewForm = null) => {
    navigate(url);
    if (setViewForm) {
        setViewForm(false);
    }
};

export const handleCreate = (navigate, url, resetForm) => {
    navigate(url);
    if (resetForm)
        resetForm()
};