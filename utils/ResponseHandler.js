function ResponseHandler(res, data, status) {
    res.status(status).send(data);
}
export default ResponseHandler;