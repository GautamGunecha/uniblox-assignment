const errorHandler = ({ err, req }) => {
    let errorObject = {};

    if (req?.body) {
        err.statusCode = 400;
    }

    if (err) {
        errorObject = {
            name: err.name || 'Error',
            status: `${err.statusCode || 500}`.startsWith('4') ? 'fail' : 'error',
            statusCode: err.statusCode || 500,
            message: err.message || 'Something went wrong.',
            data: err.data || {},
        };
    }

    return errorObject;
};

export default errorHandler 