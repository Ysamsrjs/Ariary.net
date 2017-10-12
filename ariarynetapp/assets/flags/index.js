let instance = null

class FlagResource {
    static getInstance() {
        if (!instance) {
            instance = new FlagResource()
        }
        return instance
    }

    constructor() {
        this.flags = {
            'mg': require('./countryflags/mg.png')
        }
    }

    get(name) {
        return this.flags[name]
    }
}

export default FlagResource.getInstance()