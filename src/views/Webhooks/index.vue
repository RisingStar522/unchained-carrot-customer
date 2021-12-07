<template>
    <div class="content">
        <div class="webhooks-wrapper">
            <div class="py-4">
                <h4 class="text-brand">Webhooks</h4>
            </div>

            <div class="mb-5">
                <b-form-radio-group
                    id="webhookType"
                    v-model="selectedWebhookType"
                    :options="webhooksTypes"
                    name="radio-btn-outline"
                    button-variant="outline-brand"
                    buttons
                    size="sm"
                ></b-form-radio-group>
            </div>

            <div>
                <b-card>
                    <div
                        class="d-flex align-items-center py-3"
                        style="padding-left: 40px; padding-right: 30px"
                    >
                        <div class="d-flex align-items-center">
                            <span class="text-brand mr-3">Order by</span>
                            <b-dropdown
                                :text="selectedOrderByOption"
                                block
                                variant="outline-primary"
                                menu-class="w-100"
                            >
                                <b-dropdown-item
                                    v-for="option in orderByOptions"
                                    :key="option.value"
                                    :value="option.value"
                                    @click="
                                        selectedOrderByOption = option.value
                                    "
                                    >{{ option.text }}</b-dropdown-item
                                >
                            </b-dropdown>
                        </div>
                        <div class="d-flex align-items-center ml-auto">
                            <router-link
                                :to="{
                                    name: 'AddWebhook',
                                    params: { webhookType: selectedWebhookType }
                                }"
                            >
                                <div class="mr-5">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"><path d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" fill="#2f3380"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                                    </span>
                                    <span
                                        class="text-brand ml-2"
                                        style="text-decoration: underline"
                                        >Add Webhooks</span
                                    >
                                </div>
                            </router-link>

                            <fa-icon
                                class="text-secondary"
                                icon="chevron-down"
                            />
                        </div>
                    </div>
                    <b-table
                        hover
                        id="webhooks"
                        :fields="
                            selectedWebhookType === 'incoming'
                                ? fieldsForWebhookForIncoming
                                : fieldsForWebhookForOutgoing
                        "
                        :items="
                            selectedWebhookType === 'incoming'
                                ? webhooksListForIncoming
                                : webhooksListForOutgoing
                        "
                        :per-page="perPageForWebhooks"
                        :current-page="currentPageForWebhooks"
                        caption-top
                        responsive
                        head-variant="light"
                        @row-clicked="handleClickWebhooksTableRow"
                        ref="webhookstable"
                    >
                        <template v-slot:cell(externalSystem)="data">
                            <div class="first-cell-overflow">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(topic)="data">
                            <div class="text-center">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(key)="data">
                            <div class="text-center">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(status)="data">
                            <div
                                class="d-flex align-items-center justify-content-center"
                            >
                                <div
                                    class="status-dot mr-1"
                                    v-bind:class="{
                                        published: data.value === 'published',
                                        unpublished:
                                            data.value === 'unpublished',
                                        draft: data.value === 'draft'
                                    }"
                                ></div>
                                <span class="ml-1">{{ data.value }}</span>
                            </div>
                        </template>
                        <template v-slot:cell(action)="data">
                            <div
                                class="d-flex align-items-center justify-content-end"
                            >
                                <a class="action-icon mr-2">
                                    <span class="default">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="noun_growth_3025764-2" data-name="noun growth 3025764-2"><g id="Raggruppa_1052-2" data-name="Raggruppa 1052-2"><rect id="Rettangolo_1524-2" data-name="Rettangolo 1524-2" x="11.92" y="93.52" width="25.62" height="46.47" style="fill:#4d505d"/><rect id="Rettangolo_1525-2" data-name="Rettangolo 1525-2" x="53.57" y="68.63" width="25.62" height="71.36" style="fill:#4d505d"/><path id="Tracciato_867-2" data-name="Tracciato 867-2" d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z" style="fill:#4d505d"/></g></g></svg>
                                    </span>
                                    <span class="hover">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="noun_growth_3025764-2" data-name="noun growth 3025764-2"><g id="Raggruppa_1052-2" data-name="Raggruppa 1052-2"><rect id="Rettangolo_1524-2" data-name="Rettangolo 1524-2" x="11.92" y="93.52" width="25.62" height="46.47" style="fill:#f49848"/><rect id="Rettangolo_1525-2" data-name="Rettangolo 1525-2" x="53.57" y="68.63" width="25.62" height="71.36" style="fill:#f49848"/><path id="Tracciato_867-2" data-name="Tracciato 867-2" d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z" style="fill:#f49848"/></g></g></svg>
                                    </span>
                                    <span class="active">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="noun_growth_3025764-2" data-name="noun growth 3025764-2"><g id="Raggruppa_1052-2" data-name="Raggruppa 1052-2"><rect id="Rettangolo_1524-2" data-name="Rettangolo 1524-2" x="11.92" y="93.52" width="25.62" height="46.47" style="fill:#fff"/><rect id="Rettangolo_1525-2" data-name="Rettangolo 1525-2" x="53.57" y="68.63" width="25.62" height="71.36" style="fill:#fff"/><path id="Tracciato_867-2" data-name="Tracciato 867-2" d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z" style="fill:#fff"/></g></g></svg>
                                    </span>
                                </a>
                                <a
                                    class="action-icon mr-2"
                                    @click="editRow(data.index)"
                                >
                                    <span class="default">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1053" data-name="Raggruppa 1053"><path id="Tracciato_767-2" data-name="Tracciato 767-2" d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z" style="fill:#4d505d;fill-rule:evenodd"/></g></svg>
                                    </span>
                                    <span class="hover">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1053" data-name="Raggruppa 1053"><path id="Tracciato_767-2" data-name="Tracciato 767-2" d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z" style="fill:#f49848;fill-rule:evenodd"/></g></svg>
                                    </span>
                                    <span class="active">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1053" data-name="Raggruppa 1053"><path id="Tracciato_767-2" data-name="Tracciato 767-2" d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z" style="fill:#fff;fill-rule:evenodd"/></g></svg>
                                    </span>
                                </a>
                                <a
                                    class="action-icon mr-2"
                                    @click="removeRow(data.index)"
                                >
                                    <span class="default">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1054" data-name="Raggruppa 1054"><path id="Tracciato_763-2" data-name="Tracciato 763-2" d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z" style="fill:#4d505d"/><path id="Tracciato_764-2" data-name="Tracciato 764-2" d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z" style="fill:#4d505d"/></g></svg>
                                    </span>
                                    <span class="hover">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1054" data-name="Raggruppa 1054"><path id="Tracciato_763-2" data-name="Tracciato 763-2" d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z" style="fill:#f49848"/><path id="Tracciato_764-2" data-name="Tracciato 764-2" d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z" style="fill:#f49848"/></g></svg>
                                    </span>
                                    <span class="active">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1054" data-name="Raggruppa 1054"><path id="Tracciato_763-2" data-name="Tracciato 763-2" d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z" style="fill:#fff"/><path id="Tracciato_764-2" data-name="Tracciato 764-2" d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z" style="fill:#fff"/></g></svg>
                                    </span>
                                </a>
                                <a
                                    class="action-icon mr-2"
                                    @click="unpublishWebhook(data.index)"
                                >
                                    <span class="default">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><path id="Tracciato_868" data-name="Tracciato 868" d="M75,96.52,41.18,62.34,50,53.48,75,78.8l25-25.32,8.77,8.86Z" style="fill:#4d505d"/></svg>
                                    </span>
                                    <span class="hover">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><path id="Tracciato_868" data-name="Tracciato 868" d="M75,96.52,41.18,62.34,50,53.48,75,78.8l25-25.32,8.77,8.86Z" style="fill:#f49848"/></svg>
                                    </span>
                                    <span class="active">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><path id="Tracciato_868" data-name="Tracciato 868" d="M75,96.52,41.18,62.34,50,53.48,75,78.8l25-25.32,8.77,8.86Z" style="fill:#fff"/></svg>
                                    </span>
                                </a>
                                <a
                                    class="action-icon"
                                    @click="publishWebhook(data.index)"
                                >
                                    <span class="default">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><path id="Tracciato_869" data-name="Tracciato 869" d="M75,53.48l33.82,34.18-8.77,8.86L75,71.2,50,96.52l-8.77-8.86Z" style="fill:#4d505d"/></svg>
                                    </span>
                                    <span class="hover">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><path id="Tracciato_869" data-name="Tracciato 869" d="M75,53.48l33.82,34.18-8.77,8.86L75,71.2,50,96.52l-8.77-8.86Z" style="fill:#f49848"/></svg>
                                    </span>
                                    <span class="active">
                                       <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><path id="Tracciato_869" data-name="Tracciato 869" d="M75,53.48l33.82,34.18-8.77,8.86L75,71.2,50,96.52l-8.77-8.86Z" style="fill:#fff"/></svg>
                                    </span>
                                </a>
                            </div>
                        </template>
                    </b-table>
                </b-card>
                <b-pagination
                    v-model="currentPageForWebhooks"
                    aria-controls="webhooks-pagination"
                    align="right"
                    :total-rows="
                        selectedWebhookType === 'incoming'
                            ? webhooksListForIncoming &&
                              webhooksListForIncoming.length
                            : webhooksListForOutgoing &&
                              webhooksListForOutgoing.length
                    "
                    :per-page="perPageForWebhooks"
                ></b-pagination>
            </div>

            <div
                class="webhook-items py-4"
                v-bind:class="{
                    hide: isShowWebhookItemsTable === false,
                    show: isShowWebhookItemsTable === true
                }"
            >
                <b-card>
                    <b-table
                        hover
                        id="webhookItems"
                        :fields="fieldsForWebhookItem"
                        :items="webhookItems"
                        :per-page="perPageForWebhookItems"
                        :current-page="currentPageForWebhookItems"
                        caption-top
                        responsive
                        head-variant="light"
                    >
                        <template v-slot:cell(date)="data">
                            <div class="first-cell-overflow">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(status)="data">
                            <div
                                class="d-flex align-items-center justify-content-center"
                            >
                                <div
                                    class="status-dot mr-1"
                                    v-bind:class="{
                                        pending: data.value === 'pending',
                                        complete: data.value === 'complete'
                                    }"
                                ></div>
                                <span class="ml-1">{{ data.value }}</span>
                            </div>
                        </template>
                        <template v-slot:cell(retries)="data">
                            <div class="text-center">
                                {{ data.value }}
                            </div>
                        </template>
                        <template v-slot:cell(payload)="data">
                            <div
                                class="d-flex align-items-center justify-content-center"
                            >
                                <a
                                    @click="openPayload(data.index)"
                                    class="action-icon"
                                >
                                    <span class="payload-icon default">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1166" data-name="Raggruppa 1166"><path id="Tracciato_901" data-name="Tracciato 901" d="M41.07,27H94.59a16.07,16.07,0,0,1,16,16.05V93.79H39.38V27Zm53.52,3.36H42.76V90.4h64.49V43A12.72,12.72,0,0,0,94.59,30.35Z" style="fill:#4d505d"/><path id="Tracciato_902" data-name="Tracciato 902" d="M119.74,123H28.56V90.4h92.88V123Zm-87.8-3.37h86.12V93.79H31.94Z" style="fill:#4d505d"/><path id="Tracciato_903" data-name="Tracciato 903" d="M51.31,47.52H98.7V50.9H51.31Z" style="fill:#4d505d"/><path id="Tracciato_904" data-name="Tracciato 904" d="M51.31,59.4H98.7v3.38H51.31Z" style="fill:#4d505d"/><path id="Tracciato_905" data-name="Tracciato 905" d="M51.31,71.27H98.7v3.38H51.31Z" style="fill:#4d505d"/><path id="Tracciato_906" data-name="Tracciato 906" d="M47.58,97.93H53v9.55a14.94,14.94,0,0,1-.53,4.57,5.25,5.25,0,0,1-2.14,2.66,7.23,7.23,0,0,1-4.12,1.09,9.52,9.52,0,0,1-4.12-.72A5.21,5.21,0,0,1,39.84,113a7.89,7.89,0,0,1-.94-3.42l5.18-.7a5.87,5.87,0,0,0,.2,1.72,1.79,1.79,0,0,0,.65.9,1.44,1.44,0,0,0,.88.23,1.48,1.48,0,0,0,1.34-.69,4.6,4.6,0,0,0,.42-2.28V97.93Zm8.09,11.75,5.14-.34a3.92,3.92,0,0,0,.69,1.92,2.86,2.86,0,0,0,2.39,1.06,2.66,2.66,0,0,0,1.8-.53,1.56,1.56,0,0,0,0-2.48,6.92,6.92,0,0,0-2.78-1,11.77,11.77,0,0,1-5.09-2.13,4.27,4.27,0,0,1-1.52-3.37,4.54,4.54,0,0,1,.78-2.56,5.18,5.18,0,0,1,2.35-1.89,10.93,10.93,0,0,1,4.31-.69A8.83,8.83,0,0,1,68.9,98.9a5.44,5.44,0,0,1,2.1,4l-5.09.32a2.4,2.4,0,0,0-2.5-2.28l-.16,0a2.15,2.15,0,0,0-1.43.39,1.22,1.22,0,0,0-.47,1,1,1,0,0,0,.39.76,4.35,4.35,0,0,0,1.82.63,22.73,22.73,0,0,1,5.09,1.57,5.35,5.35,0,0,1,2.23,2,4.92,4.92,0,0,1,.7,2.59,5.54,5.54,0,0,1-.93,3.11A5.85,5.85,0,0,1,68,115.06a10.68,10.68,0,0,1-4.22.74,8.68,8.68,0,0,1-6.2-1.73,6.73,6.73,0,0,1-1.95-4.37Zm18-3a8.3,8.3,0,0,1,9-9A9.19,9.19,0,0,1,89.42,100a8.88,8.88,0,0,1,2.35,6.58,10.76,10.76,0,0,1-1,5,7.35,7.35,0,0,1-3,3.06,9.8,9.8,0,0,1-4.87,1.09,11.18,11.18,0,0,1-4.91-.94,7.46,7.46,0,0,1-3.13-3A10,10,0,0,1,73.62,106.7Zm5.43,0a5.87,5.87,0,0,0,1,3.82,3.74,3.74,0,0,0,5.29.13.94.94,0,0,1,.1-.1,6.53,6.53,0,0,0,1-4.08,5.46,5.46,0,0,0-1-3.63,3.44,3.44,0,0,0-2.71-1.14A3.29,3.29,0,0,0,80,102.9a5.93,5.93,0,0,0-1,3.84Zm15.7-8.8h5.06l6.61,9.7V97.93h5.09v17.54h-5.09l-6.58-9.63v9.63H94.75V97.93Z" style="fill:#4d505d"/></g></svg>
                                    </span>
                                    <span class="payload-icon hover">
                                        <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1166" data-name="Raggruppa 1166"><path id="Tracciato_901" data-name="Tracciato 901" d="M41.07,27H94.59a16.07,16.07,0,0,1,16,16.05V93.79H39.38V27Zm53.52,3.36H42.76V90.4h64.49V43A12.72,12.72,0,0,0,94.59,30.35Z" style="fill:#f49848"/><path id="Tracciato_902" data-name="Tracciato 902" d="M119.74,123H28.56V90.4h92.88V123Zm-87.8-3.37h86.12V93.79H31.94Z" style="fill:#f49848"/><path id="Tracciato_903" data-name="Tracciato 903" d="M51.31,47.52H98.7V50.9H51.31Z" style="fill:#f49848"/><path id="Tracciato_904" data-name="Tracciato 904" d="M51.31,59.4H98.7v3.38H51.31Z" style="fill:#f49848"/><path id="Tracciato_905" data-name="Tracciato 905" d="M51.31,71.27H98.7v3.38H51.31Z" style="fill:#f49848"/><path id="Tracciato_906" data-name="Tracciato 906" d="M47.58,97.93H53v9.55a14.94,14.94,0,0,1-.53,4.57,5.25,5.25,0,0,1-2.14,2.66,7.23,7.23,0,0,1-4.12,1.09,9.52,9.52,0,0,1-4.12-.72A5.21,5.21,0,0,1,39.84,113a7.89,7.89,0,0,1-.94-3.42l5.18-.7a5.87,5.87,0,0,0,.2,1.72,1.79,1.79,0,0,0,.65.9,1.44,1.44,0,0,0,.88.23,1.48,1.48,0,0,0,1.34-.69,4.6,4.6,0,0,0,.42-2.28V97.93Zm8.09,11.75,5.14-.34a3.92,3.92,0,0,0,.69,1.92,2.86,2.86,0,0,0,2.39,1.06,2.66,2.66,0,0,0,1.8-.53,1.56,1.56,0,0,0,0-2.48,6.92,6.92,0,0,0-2.78-1,11.77,11.77,0,0,1-5.09-2.13,4.27,4.27,0,0,1-1.52-3.37,4.54,4.54,0,0,1,.78-2.56,5.18,5.18,0,0,1,2.35-1.89,10.93,10.93,0,0,1,4.31-.69A8.83,8.83,0,0,1,68.9,98.9a5.44,5.44,0,0,1,2.1,4l-5.09.32a2.4,2.4,0,0,0-2.5-2.28l-.16,0a2.15,2.15,0,0,0-1.43.39,1.22,1.22,0,0,0-.47,1,1,1,0,0,0,.39.76,4.35,4.35,0,0,0,1.82.63,22.73,22.73,0,0,1,5.09,1.57,5.35,5.35,0,0,1,2.23,2,4.92,4.92,0,0,1,.7,2.59,5.54,5.54,0,0,1-.93,3.11A5.85,5.85,0,0,1,68,115.06a10.68,10.68,0,0,1-4.22.74,8.68,8.68,0,0,1-6.2-1.73,6.73,6.73,0,0,1-1.95-4.37Zm18-3a8.3,8.3,0,0,1,9-9A9.19,9.19,0,0,1,89.42,100a8.88,8.88,0,0,1,2.35,6.58,10.76,10.76,0,0,1-1,5,7.35,7.35,0,0,1-3,3.06,9.8,9.8,0,0,1-4.87,1.09,11.18,11.18,0,0,1-4.91-.94,7.46,7.46,0,0,1-3.13-3A10,10,0,0,1,73.62,106.7Zm5.43,0a5.87,5.87,0,0,0,1,3.82,3.74,3.74,0,0,0,5.29.13.94.94,0,0,1,.1-.1,6.53,6.53,0,0,0,1-4.08,5.46,5.46,0,0,0-1-3.63,3.44,3.44,0,0,0-2.71-1.14A3.29,3.29,0,0,0,80,102.9a5.93,5.93,0,0,0-1,3.84Zm15.7-8.8h5.06l6.61,9.7V97.93h5.09v17.54h-5.09l-6.58-9.63v9.63H94.75V97.93Z" style="fill:#f49848"/></g></svg>
                                    </span>
                                    <span class="payload-icon active">
                                       <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><g id="Raggruppa_1166" data-name="Raggruppa 1166"><path id="Tracciato_901" data-name="Tracciato 901" d="M41.07,27H94.59a16.07,16.07,0,0,1,16,16.05V93.79H39.38V27Zm53.52,3.36H42.76V90.4h64.49V43A12.72,12.72,0,0,0,94.59,30.35Z" style="fill:#fff"/><path id="Tracciato_902" data-name="Tracciato 902" d="M119.74,123H28.56V90.4h92.88V123Zm-87.8-3.37h86.12V93.79H31.94Z" style="fill:#fff"/><path id="Tracciato_903" data-name="Tracciato 903" d="M51.31,47.52H98.7V50.9H51.31Z" style="fill:#fff"/><path id="Tracciato_904" data-name="Tracciato 904" d="M51.31,59.4H98.7v3.38H51.31Z" style="fill:#fff"/><path id="Tracciato_905" data-name="Tracciato 905" d="M51.31,71.27H98.7v3.38H51.31Z" style="fill:#fff"/><path id="Tracciato_906" data-name="Tracciato 906" d="M47.58,97.93H53v9.55a14.94,14.94,0,0,1-.53,4.57,5.25,5.25,0,0,1-2.14,2.66,7.23,7.23,0,0,1-4.12,1.09,9.52,9.52,0,0,1-4.12-.72A5.21,5.21,0,0,1,39.84,113a7.89,7.89,0,0,1-.94-3.42l5.18-.7a5.87,5.87,0,0,0,.2,1.72,1.79,1.79,0,0,0,.65.9,1.44,1.44,0,0,0,.88.23,1.48,1.48,0,0,0,1.34-.69,4.6,4.6,0,0,0,.42-2.28V97.93Zm8.09,11.75,5.14-.34a3.92,3.92,0,0,0,.69,1.92,2.86,2.86,0,0,0,2.39,1.06,2.66,2.66,0,0,0,1.8-.53,1.56,1.56,0,0,0,0-2.48,6.92,6.92,0,0,0-2.78-1,11.77,11.77,0,0,1-5.09-2.13,4.27,4.27,0,0,1-1.52-3.37,4.54,4.54,0,0,1,.78-2.56,5.18,5.18,0,0,1,2.35-1.89,10.93,10.93,0,0,1,4.31-.69A8.83,8.83,0,0,1,68.9,98.9a5.44,5.44,0,0,1,2.1,4l-5.09.32a2.4,2.4,0,0,0-2.5-2.28l-.16,0a2.15,2.15,0,0,0-1.43.39,1.22,1.22,0,0,0-.47,1,1,1,0,0,0,.39.76,4.35,4.35,0,0,0,1.82.63,22.73,22.73,0,0,1,5.09,1.57,5.35,5.35,0,0,1,2.23,2,4.92,4.92,0,0,1,.7,2.59,5.54,5.54,0,0,1-.93,3.11A5.85,5.85,0,0,1,68,115.06a10.68,10.68,0,0,1-4.22.74,8.68,8.68,0,0,1-6.2-1.73,6.73,6.73,0,0,1-1.95-4.37Zm18-3a8.3,8.3,0,0,1,9-9A9.19,9.19,0,0,1,89.42,100a8.88,8.88,0,0,1,2.35,6.58,10.76,10.76,0,0,1-1,5,7.35,7.35,0,0,1-3,3.06,9.8,9.8,0,0,1-4.87,1.09,11.18,11.18,0,0,1-4.91-.94,7.46,7.46,0,0,1-3.13-3A10,10,0,0,1,73.62,106.7Zm5.43,0a5.87,5.87,0,0,0,1,3.82,3.74,3.74,0,0,0,5.29.13.94.94,0,0,1,.1-.1,6.53,6.53,0,0,0,1-4.08,5.46,5.46,0,0,0-1-3.63,3.44,3.44,0,0,0-2.71-1.14A3.29,3.29,0,0,0,80,102.9a5.93,5.93,0,0,0-1,3.84Zm15.7-8.8h5.06l6.61,9.7V97.93h5.09v17.54h-5.09l-6.58-9.63v9.63H94.75V97.93Z" style="fill:#fff"/></g></svg>
                                    </span>
                                </a>
                            </div>
                        </template>
                    </b-table>
                </b-card>
                <b-pagination
                    v-model="currentPageForWebhookItems"
                    aria-controls="webhook-items"
                    align="right"
                    :total-rows="webhookItems.length"
                    :per-page="perPageForWebhookItems"
                ></b-pagination>
            </div>
        </div>

        <PayloadModal />

        <DeleteConfirmModal
            :webhook="selectedWebhook"
            :webhookType="selectedWebhookType"
            @confirm="confirmDeleteWebhook"
        />
    </div>
</template>

<script>
import DeleteConfirmModal from './components/DeleteConfirmModal.vue';
import PayloadModal from './components/PayloadModal.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'webhooks-page',
    components: {
        DeleteConfirmModal,
        PayloadModal
    },
    data: () => ({
        selectedOrderByOption: 'Source System',
        selectedWebhook: null,
        selectedWebhookType: 'incoming',
        orderByOptions: [
            {
                value: 'Source System',
                text: 'Source System'
            },
            {
                value: 'Topic',
                text: 'Topic'
            }
        ],
        fieldsForWebhookForIncoming: [
            {
                key: 'externalSystem',
                sortable: false,
                label: 'SOURCE SYSTEM',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'topic',
                sortable: false,
                label: 'TOPIC',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'key',
                sortable: false,
                label: 'KEY',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS',
                thStyle: { textAlign: 'center' }
            },
            { key: 'action', label: '' }
        ],
        fieldsForWebhookForOutgoing: [
            {
                key: 'externalSystem',
                sortable: false,
                label: 'SOURCE SYSTEM',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'topic',
                sortable: false,
                label: 'TOPIC',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS',
                thStyle: { textAlign: 'center' }
            },
            { key: 'action', label: '' }
        ],
        perPageForWebhooks: 5,
        currentPageForWebhooks: 1,
        webhooksTypes: [
            { text: 'INCOMING', value: 'incoming' },
            { text: 'OUTGOING', value: 'outgoing' }
        ],
        isShowWebhookItemsTable: false,
        fieldsForWebhookItem: [
            {
                key: 'date',
                sortable: false,
                label: 'DATE',
                thStyle: { paddingLeft: '40px' }
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'retries',
                sortable: false,
                label: 'RETRIES',
                thStyle: { textAlign: 'center' }
            },
            {
                key: 'payload',
                sortable: false,
                label: 'PAYLOAD',
                thStyle: { textAlign: 'center' }
            }
        ],
        webhookItems: [
            {
                date: '7-FEB-21 14:28',
                status: 'pending',
                retries: 1,
                payload: ''
            },
            {
                date: '7-FEB-21 10:37',
                status: 'complete',
                retries: 1,
                payload: ''
            }
        ],
        perPageForWebhookItems: 5,
        currentPageForWebhookItems: 1
    }),
    methods: {
        handleClickWebhooksTableRow(item) {
            if (this.selectedWebhookType === 'incoming') {
                for (var i = 0; i < this.webhooksListForIncoming.length; i++) {
                    this.webhooksListForIncoming[i]._rowVariant = '';
                }
                item._rowVariant = 'active';
                this.isShowWebhookItemsTable = true;
            } else if (this.selectedWebhookType === 'outgoing') {
                for (var j = 0; j < this.webhooksListForOutgoing.length; j++) {
                    this.webhooksListForOutgoing[j]._rowVariant = '';
                }
                item._rowVariant = 'active';
                this.isShowWebhookItemsTable = true;
            }

            this.$refs.webhookstable.refresh();
        },
        editRow(index) {
            this.selectedWebhook =
                this.selectedWebhookType === 'incoming'
                    ? this.webhooksListForIncoming[index]
                    : this.webhooksListForOutgoing[index];
            this.$router.push({
                name: 'EditWebhook',
                params: {
                    id:
                        this.selectedWebhookType === 'incoming'
                            ? this.selectedWebhook.eventTrackerId
                            : this.selectedWebhook.subscriptionKey,
                    webhookType: this.selectedWebhookType
                }
            });
        },
        removeRow(index) {
            this.selectedWebhook =
                this.selectedWebhookType === 'incoming'
                    ? this.webhooksListForIncoming[index]
                    : this.webhooksListForOutgoing[index];
            this.$bvModal.show('delete-webhook-modal');
        },
        openPayload(index) {
            this.$bvModal.show('payload-modal');
        },
        unpublishWebhook(index) {
            this.selectedWebhook =
                this.selectedWebhookType === 'incoming'
                    ? this.webhooksListForIncoming[index]
                    : this.webhooksListForOutgoing[index];
            if (this.selectedWebhookType === 'incoming') {
                this.$store
                    .dispatch(
                        'unpublishIncomingWebhook',
                        this.selectedWebhook.eventTrackerId
                    )
                    .then(resp => {})
                    .catch(err => {});
            } else if (this.selectedWebhookType === 'outgoing') {
                this.$store
                    .dispatch(
                        'unpublishOutgoingWebhook',
                        this.selectedWebhook.subscriptionKey
                    )
                    .then(resp => {})
                    .catch(err => {});
            }
        },
        publishWebhook(index) {
            this.selectedWebhook =
                this.selectedWebhookType === 'incoming'
                    ? this.webhooksListForIncoming[index]
                    : this.webhooksListForOutgoing[index];
            if (this.selectedWebhookType === 'incoming') {
                this.$store
                    .dispatch(
                        'publishIncomingWebhook',
                        this.selectedWebhook.eventTrackerId
                    )
                    .then(resp => {})
                    .catch(err => {});
            } else if (this.selectedWebhookType === 'outgoing') {
                this.$store
                    .dispatch(
                        'publishOutgoingWebhook',
                        this.selectedWebhook.subscriptionKey
                    )
                    .then(resp => {})
                    .catch(err => {});
            }
        },
        confirmDeleteWebhook(value) {
            if (value) {
                if (this.selectedWebhookType === 'incoming') {
                    this.webhooksListForIncoming = this.webhooksListForIncoming.filter(
                        item =>
                            item.eventTrackerId !==
                            this.selectedWebhook.eventTrackerId
                    );
                } else {
                    this.webhooksListForOutgoing = this.webhooksListForOutgoing.filter(
                        item =>
                            item.subscriptionKey !==
                            this.selectedWebhook.subscriptionKey
                    );
                }
                this.isShowWebhookItemsTable = false;
            }
        }
    },
    created() {
        this.$store.dispatch('getIncomingWebhooks');
        this.$store.dispatch('getOutgoingWebhooks');
    },
    computed: {
        ...mapGetters(['getAllIncomingWebhooks', 'getAllOutgoingWebhooks']),
        webhooksListForIncoming() {
            return JSON.parse(JSON.stringify(this.getAllIncomingWebhooks))[0];
        },
        webhooksListForOutgoing() {
            return JSON.parse(JSON.stringify(this.getAllOutgoingWebhooks))[0];
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    margin-bottom: 10px;
}

.card-body {
    padding: 0;
}

.first-cell-overflow {
    padding-left: 27px;
}

.hide {
    display: none;
}

.show {
    display: block;
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

.pending {
    background: #f79946 0% 0% no-repeat padding-box;
}

.complete {
    background: #9fe364 0% 0% no-repeat padding-box;
}

table {
    tbody {
        tr {
            .action-icon {
                span {
                    width: 23px;
                }
                span.payload-icon {
                    width: 40px;
                }
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

::v-deep .webhooks-wrapper {
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
}
</style>
