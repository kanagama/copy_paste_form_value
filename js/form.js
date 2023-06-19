class Form
{
    /**
     * Form が存在するか
     *
     * @returns {boolean}
     */
    has()
    {
        const Form = this.get();
        return (Form.length > 0);
    }

    /**
     * Form が存在しなければ Alert
     *
     * @returns {boolean}
     */
    hasAlert()
    {
        const Form = this.has();
        if (!Form) {
            alert('form does not exist.');
            return false;
        }

        return true;
    }

    /**
     * Form Element を取得
     *
     * @returns {any|null}
     */
    get()
    {
        return document.getElementsByTagName('form');
    }

    data()
    {

    }
}