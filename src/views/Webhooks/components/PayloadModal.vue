<template>
    <div>
        <b-modal
            id="payload-modal"
            ref="modal"
            centered
            header-class="custom-header"
            :hide-footer="true"
            size="lg"
        >
            <div class="custom-modal-header">
                <h5>Received Payload</h5>
            </div>

            <div class="payload-container">
                <b-form>
                    <b-row>
                        <b-col class="mt-4" sm="6">
                            <b-row class="my-3">
                                <b-col sm="5">
                                    <label for="sourcesystem"
                                        >Source System</label
                                    >
                                </b-col>
                                <b-col sm="7">
                                    <b-form-input
                                        id="input-sourcesystem"
                                        v-model="payload.sourceSystem"
                                        type="text"
                                        placeholder=""
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-3">
                                <b-col sm="5">
                                    <label for="topic">Topic</label>
                                </b-col>
                                <b-col sm="7">
                                    <b-form-input
                                        id="input-topic"
                                        v-model="payload.topic"
                                        type="text"
                                        placeholder=""
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-3">
                                <b-col sm="5">
                                    <label for="date">Date Created</label>
                                </b-col>
                                <b-col sm="7">
                                    <b-form-input
                                        id="input-date"
                                        v-model="payload.createdDate"
                                        type="text"
                                        placeholder=""
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col sm="6">
                          <editor v-model="payloadData" @init="editorInit" lang="json" theme="chrome" height="500"></editor>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'payload-modal-component',
    components: {
         editor: require('vue2-ace-editor'),
     },
    data() {
        return {
            payload: {
                sourceSystem: 'WooCommerce',
                topic: 'Order.Created',
                createdDate: '7-feb-21 14:27'
            },
            jsonData: require('../../../assets/jsonData.json'),
        };
    },
    methods: {
         editorInit() {
             require('brace/ext/language_tools')
             require('brace/mode/html')                
             require('brace/mode/javascript')
             require('brace/mode/json')
             require('brace/mode/less')
             require('brace/theme/chrome')
             require('brace/snippets/javascript')
         },
     },
     computed: {
        payloadData() {
          return JSON.stringify(this.jsonData, null, '\t')
        }
    }
};
</script>
<style lang="scss" scoped>
::v-deep .custom-header {
    position: relative;
    border: none;
}

::v-deep .ace_editor {
  width: 100%;
}

.custom-modal-header {
    position: absolute;
    top: -15px;
    color: #2f3380;
}

label {
    color: #2f3380;
}
</style>
