/**
 * Flashメッセージクラス（エラー通知）
 */
export class FlashMessage
{
    key()
    {
        return 'flash-message';
    }

    css()
    {
        return '' +
            'style="'
                + 'position: fixed;'
                + 'top: 0;'
                + 'left: 50%;'
                + 'transform: translateX(-50%);'
                + 'z-index: 1000;'
                + 'background-color: #f44336;'
                + 'color: white;'
                + 'padding: 10px 20px;'
                + 'margin: 10px 0;'
                + 'border-radius: 5px;'
                + 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);'
                + 'text-align: center;'
                + 'font-size: 16px;'
            + '"';
    }

    /**
     * Flashメッセージ要素を作成
     */
    create()
    {

    }

    /**
     * Flashメッセージ要素を削除
     */
    remove()
    {

    }
}