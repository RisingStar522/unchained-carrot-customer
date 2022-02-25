<template>
    <div class="content with-sidebar">
        <h3 class="page-header">
            {{ campaign.title }}
        </h3>
        <b-card class="form_numeric_tab">
            <div
                class="form_numeric_tab-header"
                :class="{ 'edit-visible': editVisible }"
            >
                <h5>Campaign details</h5>
                <a @click="editVisible = !editVisible">{{
                    editVisible ? 'View Less' : 'View More'
                }}</a>
            </div>
            <transition name="fadeHeight">
                <b-container
                    fluid
                    class="form_numeric_tab-form hidden-edit"
                    v-if="editVisible"
                >
                    <b-row>
                        <b-col sm="4" md="4" lg="3" class="no-left-padding">
                            <template-grid-item
                                :item="{ image: campaign.image }"
                                :nobottom="true"
                            />
                        </b-col>
                        <b-col sm="8" md="9">
                            <b-container fluid class="reviewdata-container">
                                <b-row>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            <b>Sender email address</b>
                                        </p>
                                    </b-col>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            walter@flashboys.nl
                                        </p>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            <b>Subject</b>
                                        </p>
                                    </b-col>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            Valentine’s Day discount
                                        </p>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            <b>Segment name</b>
                                        </p>
                                    </b-col>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            Loyalty Customers - Italy
                                        </p>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            <b>Recipients</b>
                                        </p>
                                    </b-col>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            550
                                        </p>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            <b>Delivered</b>
                                        </p>
                                    </b-col>
                                    <b-col sm="6">
                                        <p class="no-margin">
                                            Wed, Feb 10, 2021 18:19
                                        </p>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-col>
                    </b-row>
                </b-container>
            </transition>
        </b-card>
        <div class="statistic_grid">
            <b-card class="statistic_grid-item">
                <p class="statistic_grid-item_number">{{ campaign.sent }}</p>
                <p class="statistic_grid-item_hint">Sent</p>
            </b-card>
            <b-card class="statistic_grid-item">
                <p class="statistic_grid-item_number">{{ campaign.clicked }}</p>
                <p class="statistic_grid-item_hint">Clicked</p>
            </b-card>
            <b-card class="statistic_grid-item">
                <p class="statistic_grid-item_number">
                    {{ campaign.unsubscribed }}
                </p>
                <p class="statistic_grid-item_hint">Unsubscribed</p>
            </b-card>
            <b-card class="statistic_grid-item">
                <p class="statistic_grid-item_number blue">
                    {{ campaign.delivered }}
                </p>
                <p class="statistic_grid-item_hint">Delivered</p>
            </b-card>
            <b-card class="statistic_grid-item">
                <p class="statistic_grid-item_number">
                    {{ campaign.opened }}
                </p>
                <p class="statistic_grid-item_hint">Opened</p>
            </b-card>
            <b-card class="statistic_grid-item">
                <p class="statistic_grid-item_number red">
                    {{ campaign.bounced.total }}
                </p>
                <p class="statistic_grid-item_hint">Bounced</p>
                <span id="bounced-info">i</span>
                <b-popover
                    id="bounced-info-popover"
                    target="bounced-info"
                    triggers="hover"
                    placement="bottom"
                >
                    <p>
                        Hard bounces: {{ campaign.bounced.hard }}<br />
                        Soft bounces: {{ campaign.bounced.soft }}<br />
                        Rejected: {{ campaign.bounced.rejected }}
                    </p>
                </b-popover>
            </b-card>
        </div>

        <div class="table-wrapper">
            <div class="table-preheader only-text">
                <h5 class="no-margin">Delivery rate metrics</h5>
            </div>
            <b-table :items="metricItems" :fields="metricFields"> </b-table>
        </div>
    </div>
</template>

<style lang="scss">
@import '../../assets/scss/email_campaign/pages/statistics.scss';

.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 500px;
    overflow: hidden;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
    opacity: 0;
    max-height: 0px;
    overflow: hidden;
}
</style>

<script>
import TemplateGridItem from '@/components/EmailCampaign/newcampaign/parts/TemplateGridItem';

export default {
    components: {
        TemplateGridItem
    },
    data() {
        return {
            metricFields: [
                {
                    key: 'delivery',
                    label: 'Delivery rate',
                    sortable: false
                },
                {
                    key: 'open',
                    label: 'Email open rate',
                    sortable: false
                },
                {
                    key: 'click',
                    label: 'Email click rate',
                    sortable: false
                },
                {
                    key: 'unsubscribe',
                    label: 'Unsubscribe rate',
                    sortable: false
                },
                {
                    key: 'bounce',
                    label: 'Bounce rate',
                    sortable: false
                }
            ],
            editVisible: false,
            campaign: {
                title: 'Last chance to get -50% Valentine’s Day discount',
                image: require('@/assets/images/emailcampaign/mailtemplates/template.png'),
                sent: 550,
                clicked: 23,
                unsubscribed: 1,
                delivered: 535,
                opened: 323,
                bounced: {
                    total: 15,
                    hard: 10,
                    soft: 3,
                    rejected: 2
                }
            }
        };
    },
    computed: {
        metricItems() {
            const campaign = this.campaign;
            const sentPercent = campaign.sent / 100;
            return [
                {
                    delivery:
                        (campaign.delivered / sentPercent).toFixed(2) + '%',
                    open: (campaign.opened / sentPercent).toFixed(2) + '%',
                    click: (campaign.clicked / sentPercent).toFixed(2) + '%',
                    unsubscribe:
                        (campaign.unsubscribed / sentPercent).toFixed(2) + '%',
                    bounce:
                        (campaign.bounced.total / sentPercent).toFixed(2) + '%'
                }
            ];
        }
    }
};
</script>
