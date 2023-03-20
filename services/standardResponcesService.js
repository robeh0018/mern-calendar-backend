class StandardResponcesService {

    static successTrue ( value ) {
        return {
            success: true,
            payload: value,
            error: null,
        };
    };

    static successFalse ( value ) {
        return {
            success: false,
            payload: null,
            error: value,
        };
    };

}

module.exports = StandardResponcesService;
