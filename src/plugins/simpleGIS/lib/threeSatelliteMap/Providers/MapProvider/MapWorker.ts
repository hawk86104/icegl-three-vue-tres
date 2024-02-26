import { Fetch } from '../../Utils/Fetch';
import { getTileBitmap } from './getTileBitmap';

type MessageType = MessageEvent<{
    id: string,
    tileNo: number[],
    url: string;
    debug?: boolean;
    abort?: boolean;
}>;

const fetchingMap = new Map<string, Fetch>();

self.onmessage = async (e: MessageType) => {
    const { id, tileNo, url, debug, abort } = e.data;

    if (abort) {
        fetchingMap.get(id)?.abort();
        fetchingMap.delete(id);
        self.postMessage({ id, error: true });
        return;
    }

    try {
        const fetch = new Fetch(url, { cache: 'force-cache' });
        fetchingMap.set(id, fetch);
        const bitmap = await getTileBitmap(tileNo, fetch, debug);
        // @ts-ignore
        self.postMessage({ id, bitmap }, [bitmap]);
    } catch (e) {
        self.postMessage({ id, error: true });
    } finally {
        fetchingMap.delete(id);
    }
};