<template>
    <b-card-body>
        <b-row>
            <b-col sm="6">
                <label for="id">Id</label>
                <b-form-input
                    id="input-id"
                    type="text"
                    v-model="field.value"
                    required
                ></b-form-input>
            </b-col>
            <b-col sm="6">
                <label for="name">Label Text</label>
                <b-form-input
                    id="input-name"
                    type="text"
                    v-model="field.name"
                    required
                ></b-form-input>
            </b-col>
            <b-col sm="6">
                <label for="name">Data Type</label>
                <b-dropdown
                    :text="field.type"
                    block
                    variant="outline-primary"
                    menu-class="w-100"
                >
                    <b-dropdown-item
                        v-for="option in dataTypes"
                        :key="option.value"
                        :value="option.value"
                        >{{ option.text }}</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>
            <b-col sm="6">
                <label for="name">Text Align</label>
                <b-dropdown
                    :text="field.textAlign"
                    block
                    variant="outline-primary"
                    menu-class="w-100"
                >
                    <b-dropdown-item
                        v-for="option in alignTypes"
                        :key="option.value"
                        :value="option.value"
                        >{{ option.text }}</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>
            <b-col sm="12">
                <label for="language">Default Value</label>
                <b-form-input
                    id="input-language"
                    type="text"
                    v-model="field.language"
                ></b-form-input>
            </b-col>
            <b-col sm="12">
                <label for="message">Apple Lock Screen Message</label>
                <b-form-textarea
                  id="message"
                  v-model="text"
                  placeholder="%@"
                  rows="4"
                ></b-form-textarea>
                <p class="text-secondary">
                  Notification to display when data changes. To include the new data value in the message, use %@ where you would like the new value to appear. e.g. You now have %@ reward points
                </p>
            </b-col>
            <b-col sm="12">
                <label for="fieldKey">Field Key</label>
                <b-form-input
                    id="input-key"
                    type="text"
                    v-model="field.key"
                ></b-form-input>
            </b-col>
        </b-row>
    </b-card-body>
</template>

<script>
export default {
    name: 'field-content-component',
    props: {
        field: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dataTypes: [
              {
                text: 'Single Line Text',
                value: 'single'
              },
              {
                text: 'Multi Line Text',
                value: 'multi'
              },
              {
                text: 'Number',
                value: 'number'
              },
              {
                text: 'Date',
                value: 'date'
              },
            ],
            alignTypes: [
              {
                text: 'Left',
                value: 'left'
              },
              {
                text: 'Right',
                value: 'right'
              },
              {
                text: 'Center',
                value: 'center'
              },
              {
                text: 'Justify',
                value: 'justify'
              },
              {
                text: 'Initial',
                value: 'initial'
              },
              {
                text: 'Inherit',
                value: 'inherit'
              },
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.content {
    padding-top: 30px;
    padding-bottom: 30px;
    h4 {
        font-size: 28px;
        line-height: 40px;
    }
    p {
      margin-top: 10px;
      margin-bottom: 0px;
      font-size: 11px;
    }
    label {
        font: normal normal normal 15px/25px;
        letter-spacing: 0px;
        color: #2f3380;
    }
    .input-group {
        .input-field {
            border-right: none;
        }
        .input-group-append {
            .input-group-text {
                background-color: #ffffff;
                border-left: none;
            }
        }
    }
}
</style>
