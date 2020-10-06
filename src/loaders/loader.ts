import LoaderOptions from "./loaderOptions";
import expressLoader from "./expressLoader";

class Loader {
    private readonly options: LoaderOptions;

    constructor(options: LoaderOptions) {
        this.options = options;
    }

    run() {
        expressLoader(this.options);
    }
}

export default Loader;