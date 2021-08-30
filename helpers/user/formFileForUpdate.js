const formFile = (req, result) => {
    const filePhoto = req.file?.filename
        ? `/upload/photo_profile/${req.file.filename}`
        : result.rows[0]?.photo_profile

    return {
        photo_profile: filePhoto
    }
}

module.exports = formFile;
