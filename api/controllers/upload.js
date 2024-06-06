export function uploadPhoto(req, res) {
    const file = req.file;
    if (file) return res.status(200).json(file.filename);
    return res.status(200).json('')
}