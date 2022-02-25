<template>
    <div>
        <b-modal
            id="fields-modal"
            ref="modal"
            centered
            header-class="custom-header"
            :hide-footer="true"
        >
            <div class="custom-modal-header">
                <h4 class="text-brand">Add a field</h4>
            </div>
            <div class="fields-container">
                <div class="recommend-fields mb-4">
                    <h5 class="text-brand">Recommended</h5>
                    <b-row>
                        <b-col v-for="field in recommendFields" :key="field.value" sm="6" class="mb-3">
                            <b-button type="button" variant="outline-brand" class="text-brand" @click="addField(field)">
                                {{field.name}}
                            </b-button>
                        </b-col>
                    </b-row>
                </div>
                <div class="new-fields">    
                    <h5 class="text-brand">Create New Field</h5>
                    <b-row>
                        <b-col v-for="field in newFields" :key="field.value" sm="6" class="mb-3">
                            <b-button type="button" variant="outline-brand" class="text-brand" @click="addField(field)">
                                {{field.name}}
                            </b-button>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'fields-modal-component',
    data() {
        return {
            recommendFields: [
                {
                    name: 'Last Name',
                    value: 'lastName',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'First Name',
                    value: 'firstName',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'Email',
                    value: 'email',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'Phone Number',
                    value: 'phoneNumber',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'SKU',
                    value: 'sku',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'External Id',
                    value: 'externalId',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'Offer',
                    value: 'offer',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'Expires',
                    value: 'expires',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                }
            ],
            newFields: [
                {
                    name: 'Single Line Text',
                    value: 'singleLineText',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'Multi Line Text',
                    value: 'multiLineText',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'Number',
                    value: 'number',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                },
                {
                    name: 'Date',
                    value: 'date',
                    type: 'Single Line Text',
                    textAlign: 'Left'
                }
            ]
        };
    },
    methods: {
        addField(field) {
            this.$emit('confirm', field);
            this.$bvModal.hide('fields-modal');
        }
    }
};
</script>
<style lang="scss" scoped>
::v-deep .custom-header {
    position: relative;
    border: none;
    padding-top: 35px;
}

::v-deep .custom-header .close {
    position: absolute;
    top: 22px;
    right: 22px;
    margin-left: 0;
}

.custom-modal-header {
    position: absolute;
    top: -28px;
    left: 25px;
    display: flex;
    align-items: center;
}
.fields-container {
    padding: 20px;

    button {
        width: 100%;
        text-transform: uppercase;
    }

    h5 {
        border-bottom: 1px solid #2f3380;
        margin-bottom: 20px;
    }
}
</style>
