export const getErrorMessage = (err) => {
    switch (err.name) {
        case 'ValidationError':
            return Object.values(err.errors)[0]
        default:
            return err.message;
    }
}