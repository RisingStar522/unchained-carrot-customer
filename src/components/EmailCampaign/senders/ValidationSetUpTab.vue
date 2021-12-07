<template>
    <b-card class="form_numeric_tab">
        <div
            class="form_numeric_tab-header"
            :class="{ 'edit-visible': editVisible }"
        >
            <h5>Validation set up</h5>
            <a @click="editVisible = !editVisible">{{
                editVisible ? 'Close' : 'Edit'
            }}</a>
        </div>
        <transition name="fadeHeight">
            <b-container
                fluid
                class="form_numeric_tab-form hidden-edit"
                v-if="editVisible"
            >
                <template v-if="dkim === false">
                    <b-row>
                        <b-col sm="12" class="no-left-padding no-right-padding">
                            <p>
                                <b>DNS records for domain verification</b><br />
                                Copy the TXT record that appear in the section
                                below and add them to the DNS configuration for
                                your domain.
                            </p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" class="no-left-padding no-right-padding">
                            <div class="table-wrapper">
                                <b-table
                                    :items="dnsItems"
                                    :fields="dnsFields"
                                />
                            </div>
                        </b-col>
                    </b-row>
                </template>
                <template v-else>
                    <b-row>
                        <b-col sm="12" class="no-left-padding no-right-padding">
                            <p>
                                <b>DKIM Settings</b><br />
                                Copy the three CNAME records that appear in this
                                section and add them to the DNS configuration
                                for your domain.
                            </p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" class="no-left-padding no-right-padding">
                            <div class="table-wrapper">
                                <b-table
                                    :items="dkimItems"
                                    :fields="dkimFields"
                                />
                            </div>
                        </b-col>
                    </b-row>
                </template>
                <b-row>
                    <b-col sm="12" class="no-right-padding text-right">
                        <b-button
                            variant="outline-primary"
                            class="min-width-button inline-button"
                            @click="switchDKIM"
                        >
                            {{
                                dkim
                                    ? 'Verify Domain Name'
                                    : 'Generate DKIM Settings'
                            }}
                        </b-button>
                        <b-button
                            variant="primary"
                            class="min-width-button inline-button"
                            @click="nextTab"
                        >
                            Next
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </transition>
    </b-card>
</template>

<style lang="scss" scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 300px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
}
</style>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dkim: false,
            editVisible: false,
            dnsFields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: false,
                    sortDirection: 'desc'
                },
                {
                    key: 'type',
                    label: 'Type',
                    sortable: false
                },
                {
                    key: 'value',
                    label: 'Value',
                    sortable: false
                }
            ],
            dnsItems: [
                {
                    name: '_amazonses.example.com',
                    type: 'TXT',
                    value: 'pmBGN/7MjnfhTKUZ06Enqq1PeGUaOkw8lGhcfwefcHU='
                }
            ],
            dkimFielsd: [
                { key: 'hostname', label: 'Hostname' },
                { key: 'type', label: 'Type' },
                { key: 'value', label: 'Value' }
            ],
            dkimItems: [
                {
                    hostname: 'www.example.com.',
                    type: 'A',
                    value: '93.184.216.34'
                },
                {
                    hostname: 'www.example.com.',
                    type: 'AAAA',
                    value: '2606:2800:220:1:248:1893:25c8:1946'
                },
                {
                    hostname: 'www.example.net.',
                    type: 'CNAME',
                    value: 'www.example.com.'
                },
                {
                    hostname: 'www.example.org.',
                    type: 'CNAME',
                    value: 'www.example.com.'
                }
            ]
        };
    },
    watch: {
        open: {
            immediate: true,
            handler(newOpen) {
                if (newOpen === true) {
                    this.editVisible = true;
                    this.$emit('update:open', false);
                }
            }
        }
    },
    methods: {
        nextTab() {
            this.editVisible = false;
            this.$emit('next-tab');
        },
        /**
         * Switch between 'dkim' and 'verify domain name' tables
         */
        switchDKIM() {
            this.dkim = !this.dkim;
        }
    }
};
</script>
