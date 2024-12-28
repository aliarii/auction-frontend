export const validateProductForm = (formData) => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 3) {
        errors.name = "Ürün adı en az 3 karakter olmalıdır.";
    }

    if (!formData.description || formData.description.trim().length < 10) {
        errors.description = "Ürün açıklaması en az 10 karakter olmalıdır.";
    }

    if (formData.quantity <= 0) {
        errors.quantity = "Adet 1 veya daha büyük olmalıdır.";
    }

    if (formData.image && !formData.image.startsWith("http")) {
        errors.image = "Geçerli bir görsel URL'si giriniz.";
    }

    return errors;
};

export const validateCategoryForm = (formData) => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 3) {
        errors.name = "Kategori adı en az 3 karakter olmalıdır.";
    }

    if (formData.image && !formData.image.startsWith("http")) {
        errors.image = "Geçerli bir görsel URL'si giriniz.";
    }

    return errors;
};

export const validateAuctionForm = (formData) => {
    const errors = {};

    if (!formData.title || formData.title.trim().length < 5) {
        errors.title = "Başlık en az 5 karakter olmalıdır.";
    }

    if (!formData.description || formData.description.trim().length < 20) {
        errors.description = "Açıklama en az 20 karakter olmalıdır.";
    }

    if (formData.startingPrice <= 0) {
        errors.startingPrice = "Başlangıç fiyatı 1 veya daha büyük olmalıdır.";
    }

    return errors;
};
