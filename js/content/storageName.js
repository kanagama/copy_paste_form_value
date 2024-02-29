import { Status } from "./status.js";

/**
 *
 */
export class StorageName
{
    static #instance;

    #status;
    #domain;

    /**
     *
     */
    constructor()
    {
        if (StorageName.#instance) {
            return StorageName.#instance;
        }

        StorageName.#instance = this;
        this.#status = new Status();

        this.set();
    }

    /**
     * 保存先名を取得
     *
     * @returns {string}
     */
    get()
    {
        if (!this.#status.hasStorage()) {
            return 'form_value';
        }

        return this.#domain;
    }

    /**
     * ドメインをセット
     */
    set()
    {
        this.#domain = location.hostname.replace(/\./g, '_');
    }
}
