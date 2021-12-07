<template>
    <div class="content mt-5">
        <b-card>
            <!-- <div
                class="d-flex align-items-center py-3"
                style="padding-left: 40px; padding-right: 30px"
            >
                <div class="d-flex align-items-center">
                    <div>
                        <b-input-group>
                            <b-form-input
                                class="LoginInput"
                                size="lg"
                                placeholder="Search by name..."
                                @focus="blur"
                                ref="input"
                            >
                            </b-form-input>
                            <b-input-group-append>
                                <span class="input-group-text"
                                    ><b-icon-search class="icon"></b-icon-search
                                ></span>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </div>
            </div> -->

            <b-table
                hover
                id="traffic-routes"
                :fields="fieldsForBillings"
                :items="billingItems"
                :per-page="perPageForBillings"
                :current-page="currentPageForBillings"
                caption-top
                responsive
                head-variant="light"
                ref="traffictable"
            >
                <template v-slot:cell(startDate)="data">
                    <div class="first-cell-overflow">
                        {{
                            data.item.eCurringPayload &&
                                dayjs(
                                    data.item.eCurringPayload.attributes
                                        .start_date
                                ).format('DD/MM/YYYY')
                        }}
                    </div>
                </template>
                <template v-slot:cell(status)="data">
                    <div class="text-center">
                        {{
                            data.item.eCurringPayload &&
                                data.item.eCurringPayload.attributes.status
                        }}
                    </div>
                </template>
                <template v-slot:cell(name)="data">
                    <div class="text-center">
                        {{
                            data.item.WooCommercePayload &&
                                data.item.WooCommercePayload.woocommerce_product
                                    .name
                        }}
                    </div>
                </template>
                <template v-slot:cell(permalink)="data">
                    <div class="text-center">
                        {{
                            data.item.WooCommercePayload &&
                                data.item.WooCommercePayload.woocommerce_product
                                    .permalink
                        }}
                    </div>
                </template>
                <template v-slot:cell(price)="data">
                    <div class="text-center">
                        {{
                            data.item.WooCommercePayload &&
                                data.item.WooCommercePayload.woocommerce_product
                                    .price
                        }}
                    </div>
                </template>
                <template v-slot:cell(application)="data">
                    <div class="text-center">
                        {{
                            data.item.UccSubscriptionPlanPayload &&
                                data.item.UccSubscriptionPlanPayload.application
                        }}
                    </div>
                </template>
            </b-table>
        </b-card>

        <!-- <b-pagination
            aria-controls="traffic-routes"
            align="right"
            :total-rows="1"
            :per-page="perPageForBillings"
        ></b-pagination> -->
    </div>
</template>

<script>
import CustomerAPI from '../../api/CustomerAPI';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';

export default {
    name: 'billing',
    data() {
        return {
            fieldsForBillings: [
                {
                    key: 'startDate',
                    sortable: false,
                    label: 'START DATE',
                    thStyle: { paddingLeft: '40px' }
                },
                {
                    key: 'status',
                    sortable: false,
                    label: 'STATUS',
                    thStyle: { textAlign: 'center' }
                },
                {
                    key: 'name',
                    sortable: false,
                    label: 'NAME',
                    thStyle: { textAlign: 'center' }
                },
                {
                    key: 'permalink',
                    sortable: false,
                    label: 'PERMALINK',
                    thStyle: { textAlign: 'center' }
                },
                {
                    key: 'price',
                    sortable: false,
                    label: 'PRICE',
                    thStyle: { textAlign: 'center' }
                },
                {
                    key: 'application',
                    sortable: false,
                    label: 'APPLICATION',
                    thStyle: { textAlign: 'center' }
                }
            ],
            billingItems: [
                {
                    firstName: 'Emmanuel',
                    lastName: 'Raymond',
                    email: 'emma@ray.com'
                }
            ],
            perPageForBillings: 5,
            currentPageForBillings: 1
        };
    },
    computed: {
        ...mapGetters(['customerId'])
    },
    methods: {
        dayjs(...args) {
            return dayjs(...args);
        },
        async getBillingData(id) {
            try {
                const res = await new CustomerAPI().getBillingData(id);

                this.billingItems = res.data.body.uccProducts;
            } catch (error) {
            }
        }
    },
    async mounted() {
        await this.getBillingData(this.customerId);
    }
};
</script>

<style lang="scss" scoped>
.input-group-text {
    width: 48px;
    // border-right: none;
    border-left: none;
    background-color: #ffffff;
}
.icon {
    display: inline-block;
    width: 100%;
}
.LoginInput {
    border-right: none;
    box-shadow: none;
}

input.LoginInput:focus {
    outline: none;
    box-shadow: none;
}

input.form-control:focus,
input[type='text']:focus {
    box-shadow: inset 0 -1px 0 #ddd;
}

.disable--pointer {
    cursor: not-allowed !important;
}

.card {
    margin-bottom: 10px;
}

.card-body {
    padding: 0;
}

.hide {
    display: none;
}

.show {
    display: block;
}

.first-cell-overflow {
    padding-left: 27px;
}

.status-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
}

.published {
    background: #9fe364 0% 0% no-repeat padding-box;
}

.unpublished {
    background: #c6c6c6 0% 0% no-repeat padding-box;
}

.draft {
    border: 1px solid #707070;
}

table {
    tbody {
        tr {
            .action-icon {
                width: 23px;
                .default {
                    display: block;
                }
                .hover,
                .active {
                    display: none;
                }
            }
            .action-icon:hover {
                .default,
                .active {
                    display: none;
                }
                .hover {
                    display: block;
                }
            }
            &.table-active {
                .action-icon {
                    .active {
                        display: block;
                    }
                    .default,
                    .hover {
                        display: none;
                    }
                }
            }
        }
    }
}

::v-deep {
    .b-dropdown {
        width: 226px;
    }

    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }
    .pagination.b-pagination {
        float: none;
    }
    .daterangepicker {
        .calendars {
            flex-wrap: nowrap;
        }
    }
}
</style>
