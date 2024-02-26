export interface WorkerMessageData {
    id: string;
    error?: boolean;
    [k: string]: any;
}

export class PromiseWorker {
    worker: Worker;
    terminated = true;
    map = new Map<string, (value: any) => void>();

    constructor(workerFactory: new () => Worker) {
        this.worker = new workerFactory();
        this.worker.onmessage = this.onMessage.bind(this);
        this.terminated = false;
    }

    async postMessage(message: WorkerMessageData) {
        if (this.terminated) {
            return;
        }
        this.worker.postMessage(message);
        return new Promise<any>((resolve, _reject) => {
            this.map.set(message.id, resolve);
        });
    }

    private onMessage(e: MessageEvent<WorkerMessageData>) {
        const { id, error } = e.data;
        const resolve = this.map.get(id);
        if (resolve && !error) {
            resolve(e.data);
        }
        this.map.delete(id);
    }

    terminate() {
        this.worker.onmessage = null;
        this.worker.terminate();
        this.terminated = true;
        this.map.clear();
    }
}