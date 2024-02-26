// TODO 需要一个数据转换器
class AbortableFetch {
    static pendings = new Map<string, AbortableFetch>();

    private _controller = new AbortController();
    listeners = new Set<Fetch>();

    fetch(url: string, init: RequestInit = {}) {
        if (AbortableFetch.pendings.has(url)) {
            return;
        }

        AbortableFetch.pendings.set(url, this);

        fetch(url, {
            ...init,
            signal: this._controller.signal
        }).then(res => {
            this.listeners.forEach(item => item.resolve(res.clone()));
        }).catch(e => {
            this.listeners.forEach(item => item.reject(e));
        }).finally(() => {
            AbortableFetch.pendings.delete(url);
        });
    }

    abort() {
        this._controller.abort();
    }
}

class Fetch {
    resolve: (value: Response | PromiseLike<Response>) => void;
    reject: (reason?: any) => void;
    promise: Promise<Response>;

    constructor(public url: string, public init?: RequestInit) {
        this.promise = new Promise<Response>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    ready() {
        let abFetch = AbortableFetch.pendings.get(this.url);
        if (!abFetch) {
            abFetch = new AbortableFetch();
            abFetch.fetch(this.url, this.init);
        }
        abFetch.listeners.add(this);
        return this.promise;
    }

    abort() {
        this.reject('User abort.');
        const abFetch = AbortableFetch.pendings.get(this.url);
        if (!abFetch) {
            return;
        }
        abFetch.listeners.delete(this);
        if (abFetch.listeners.size === 0) {
            abFetch.abort();
        }
    }
}

export { Fetch };