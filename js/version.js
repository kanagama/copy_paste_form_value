/**
 * バージョン番号
 */
export class Version
{
    constructor()
    {
        this.load();
    }

    /**
     * バージョン番号読み込み
     */
    load()
    {
        const version = document.getElementById('version');
        const manifest = chrome.runtime.getManifest();

        version.textContent = manifest.version;
    }
}
