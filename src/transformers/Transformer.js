/* ============
 * Transformer
 * ============
 *
 * The base transformer.
 *
 * Transformers are used to transform the fetched data to a more suitable format.
 */

export default class Transformer {
    /**
     * Method used to transform a fetched collections.
     *
     * @param items The items to be transformed.
     *
     * @returns {Array} The transformed items.
     */
    static fetchCollections(items) {
        return items.map(item => this.fetch(item));
    }

    /**
     * Method used to transform a fetched collection.
     *
     * @param item
     * @return {*}
     */
    static fetch(item) {
        return item;
    }

    /**
     * Method used to transform collections to be send.
     *
     * @param items The items to be transformed.
     *
     * @returns {Array} The transformed items.
     */
    static sendCollections(items) {
        return items.map(item => this.send(item));
    }

    /**
     * Method used to transform a collection to be send.
     *
     * @param item
     * @return {*}
     */
    static send(item) {
        return item;
    }
}
