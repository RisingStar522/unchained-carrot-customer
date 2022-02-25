<template>
    <div class="embedAndWidgetContainer mt-5">
        <b-row>
            <b-col md="4">
                <div class="d-flex align-items-center mb-4">
                    <h4 class="text-brand mr-3">
                        Embedded Widgets
                    </h4>
                    <a href="#">
                        <img src="../../../assets/icons/noun_Info.svg" />
                    </a>
                </div>
                <b-table
                    hover
                    id="embed-widget"
                    :fields="fieldsForEmbedWidget"
                    :items="embedWidgets"
                    style="background-color: #ffffff"
                    :per-page="perPageForLandingPageTemplate"
                    :current-page="currentPageForLandingPageTemplate"
                    caption-top
                    responsive
                    head-variant="light"
                >
                    <template v-slot:cell(widget)="data">
                        <div class="first-cell-overflow">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(name)="data">
                        <div>
                            {{ data.value }}
                        </div>
                    </template>
                </b-table>
            </b-col>
            <b-col md="8">
                <div class="d-flex align-items-center mb-4">
                    <h4 class="text-brand mr-3">Events</h4>
                    <a href="#">
                        <img src="../../../assets/icons/noun_Info.svg" />
                    </a>
                </div>
                <b-table
                    hover
                    id="embed-widget"
                    style="background-color: #ffffff"
                    :fields="fieldsEvent1"
                    :items="event1"
                    :per-page="perPageForLandingPageTemplate"
                    :current-page="currentPageForLandingPageTemplate"
                    caption-top
                    responsive
                    head-variant="light"
                >
                    <template v-slot:cell(name)="data">
                        <div class="first-cell-overflow">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(source)="data">
                        <div>
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(project)="data">
                        <div>
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(lastSeen)="data">
                        <div>
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(rules)="data">
                        <div
                            class="
                                    d-flex
                                    align-items-center
                                    justify-content-start
                                "
                        >
                            <a
                                ><fa-icon
                                    icon="envelope"
                                    class="mr-4"
                                    style="color: #39CB89; font-size: 16px"
                                />
                            </a>
                            <a
                                ><fa-icon
                                    icon="gift"
                                    class="mr-4"
                                    style="color: #39CB89; font-size: 16px"
                                />
                            </a>
                            <a
                                ><fa-icon
                                    icon="mobile-alt"
                                    style="color: #F79946; font-size: 16px"
                                />
                            </a>
                        </div>
                    </template>
                </b-table>

                <div
                    class="
                            d-flex
                            align-items-center
                            justify-content-end
                            pr-3
                            pl-3
                            border-top
                        "
                >
                    <div class="mr-3">
                        <span class="mr-3">Rows per page: </span>
                        <b-form-select
                            v-model="perPageForLandingPageTemplate"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                        >
                        </b-form-select>
                    </div>

                    <b-pagination
                        v-model="currentPageForLandingPageTemplate"
                        aria-controls="email-templates"
                        align="right"
                        :total-rows="event1 ? event1.length : 0"
                        :per-page="perPageForLandingPageTemplate"
                    ></b-pagination>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'embedded-widgets-component',
    data: () => ({
        rowsPerPageOptions: [
            { value: 5, text: '5' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ],
        currentPageForLandingPageTemplate: 1,
        perPageForLandingPageTemplate: 5,
        fieldsForEmbedWidget: [
            { key: 'widget', sortable: false, label: 'WIDGET' },
            { key: 'name', sortable: false, label: 'NAME' }
        ],
        fieldsEvent1: [
            { key: 'name', sortable: false, label: 'NAME' },
            { key: 'source', sortable: false, label: 'SOURCE' },
            { key: 'project', sortable: false, label: 'PROJECT' },
            { key: 'lastSeen', sortable: false, label: 'LAST SEEN' },
            { key: 'rules', sortable: false, label: 'RULES' }
        ],
        embedWidgets: [
            { id: 0, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 1, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 2, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 3, widget: 'Reviewbyme', name: 'Reviewbyme' },
            { id: 4, widget: 'Reviewbyme', name: 'Reviewbyme' }
        ],
        event1: [
            {
                id: 0,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 1,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 2,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 3,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            },
            {
                id: 4,
                name: 'User registered',
                source: 'Unchainedcarrot',
                project: 'Blackfriday30',
                lastSeen: '1-OCT-2021 18:20',
                rules: 'phone'
            }
        ]
    })
};
</script>

<style></style>
