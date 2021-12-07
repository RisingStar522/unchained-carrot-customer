<template>
    <div class="content">
        <b-form @submit.prevent="validateForm" data-vv-scope="rewardForm">
            <h3 class="page-header mb-4">
                {{ !rewardId ? 'Add' : 'Edit' }} reward
            </h3>
            <b-row class="flex-row-reverse">
                <b-col
                    cols="12"
                    lg="5"
                    offset-lg="1"
                    class="flex-wrap d-flex d-lg-block justify-content-around text-right"
                >
                    <md-field>
                        <label class="text-capitalize">Token symbol</label>
                        <md-input
                            type="text"
                            autocomplete="off"
                            :value="tokenSymbol"
                            readonly
                        />
                    </md-field>
                    <md-field>
                        <label class="text-capitalize">Token description</label>
                        <md-input
                            type="text"
                            autocomplete="off"
                            :value="tokenDescription"
                            readonly
                        />
                    </md-field>
                    <md-field>
                        <label class="text-capitalize">Token supply</label>
                        <md-input
                            type="text"
                            autocomplete="off"
                            :value="tokenSupply"
                            readonly
                        />
                    </md-field>
                    <md-field>
                        <label class="text-capitalize">Reward allowance</label>
                        <md-input
                            type="text"
                            autocomplete="off"
                            value="0"
                            readonly
                        />
                    </md-field>
                    <div class="d-flex justify-content-between w-100">
                        <b-btn
                            class="btn-w200 mb-3 mr-3"
                            variant="outline-brand"
                        >
                            Decrease
                        </b-btn>
                        <b-btn
                            class="btn-w200 mb-3"
                            variant="brand"
                            v-b-modal.increase-allowance
                        >
                            Increase
                        </b-btn>
                    </div>
                </b-col>
                <b-col cols="12" lg="6">
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('rewardForm.rewardName')
                        }"
                    >
                        <label>Reward name</label>
                        <md-input
                            type="text"
                            name="rewardName"
                            autocomplete="off"
                            v-model="formData.name"
                            v-validate="'required'"
                        />
                        <span class="md-error">
                            {{ errors.first('rewardForm.rewardName') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('rewardForm.rewardType')
                        }"
                    >
                        <label>Reward type</label>
                        <md-select
                            name="rewardType"
                            v-model="formData.type"
                            v-validate="'required'"
                        >
                            <md-option
                                v-for="item in rewardTypes"
                                :value="item"
                                :key="item"
                            >
                                {{ item }}
                            </md-option>
                        </md-select>
                        <span class="md-error">
                            {{ errors.first('rewardForm.rewardType') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('rewardForm.blockchain')
                        }"
                    >
                        <label>Blockchain</label>
                        <md-select
                            name="blockchain"
                            v-model="formData.blockchain"
                            v-validate="'required'"
                        >
                            <md-option
                                v-for="item in rewardBlockchains"
                                :value="item"
                                :key="item"
                            >
                                {{ item }}
                            </md-option>
                        </md-select>
                        <span class="md-error">
                            {{ errors.first('rewardForm.blockchain') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('rewardForm.tokenType')
                        }"
                    >
                        <label>Token type</label>
                        <md-select
                            name="tokenType"
                            v-model="formData.tokenType"
                            @md-selected="getContractData"
                            v-validate="'required'"
                        >
                            <md-option
                                v-for="item in rewardTokenTypes"
                                :value="item"
                                :key="item"
                            >
                                {{ item }}
                            </md-option>
                        </md-select>
                        <span class="md-error">
                            {{ errors.first('rewardForm.tokenType') }}
                        </span>
                    </md-field>
                    <md-field
                        v-bind:class="{
                            'md-invalid': errors.has('rewardForm.contract')
                        }"
                    >
                        <label>Contracts address</label>
                        <md-input
                            type="text"
                            name="contract"
                            autocomplete="off"
                            @keyup="getContractData"
                            v-model="formData.address"
                            v-validate="{
                                required: true,
                                regex: /^0x[a-fA-F0-9]{40}$/i
                            }"
                        />
                        <span class="md-error">
                            {{ errors.first('rewardForm.contract') }}
                        </span>
                    </md-field>
                </b-col>
            </b-row>
            <div class="mt-3">
                <b-btn
                    type="submit"
                    variant="brand"
                    size="lg"
                    class="btn-w200 float-right"
                >
                    Save
                </b-btn>
                <b-btn
                    :to="{ name: 'Rewards' }"
                    variant="outline-brand"
                    size="lg"
                    class="btn-w200 float-right mr-3"
                >
                    Cancel
                </b-btn>
            </div>
        </b-form>
        <IncreaseAllowanceModal />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { ethers } from 'ethers';
import ABI from '../../config/abi/index';
import IncreaseAllowanceModal from '../../components/Modals/increase-allowance';
export default {
    name: 'reward-editor-page',
    components: {
        IncreaseAllowanceModal
    },
    data() {
        return {
            tokenSymbol: null,
            tokenDescription: null,
            tokenSupply: null,
            formData: {
                name: null,
                blockchain: null,
                tokenType: null,
                address: null,
                type: null,
                iconUrl: null
            }
        };
    },
    computed: {
        ...mapGetters(['rewardBlockchains', 'rewardTokenTypes', 'rewardTypes']),
        rewardId() {
            return this.$route.params.id;
        },
        currentReward() {
            return this.$store.getters['rewardById'](this.rewardId);
        }
    },
    created() {
        if (this.rewardId && !this.currentReward) {
            return this.$router.push({ name: 'Rewards' });
        }
        setTimeout(() => this.loadData(), 200);
    },
    watch: {
        currentReward() {
            this.loadData();
        },
        rewardId() {
            this.loadData();
        }
    },
    methods: {
        validateForm() {
            this.$validator.validateAll('rewardForm').then(result => {
                if (result) {
                    if (!this.rewardId) {
                        this.$store.dispatch(
                            'createReward',
                            Object.assign({}, this.formData)
                        );
                    } else {
                        this.$store.dispatch('updateReward', {
                            id: this.rewardId,
                            data: Object.assign({}, this.formData)
                        });
                    }
                }
            });
        },
        loadData() {
            this.formData.name = this.currentReward
                ? this.currentReward.name
                : null;
            this.formData.blockchain = this.currentReward
                ? this.currentReward.blockchain
                : null;
            this.formData.tokenType = this.currentReward
                ? this.currentReward.tokenType
                : null;
            this.formData.address = this.currentReward
                ? this.currentReward.address
                : null;
            this.formData.type = this.currentReward
                ? this.currentReward.type
                : null;
            this.formData.iconUrl = this.currentReward
                ? this.currentReward.iconUrl
                : null;
            this.tokenSymbol = null;
            this.tokenDescription = null;
            this.tokenSupply = null;
            this.$validator.reset();
            this.getContractData();
        },
        getContractData() {
            if (!this.formData.tokenType || !this.formData.address) return;
            this.$validator
                .validate('rewardForm.contract')
                .then(async result => {
                    if (result && this.formData.tokenType) {
                        const provider = ethers.getDefaultProvider('ropsten');
                        let contract = new ethers.Contract(
                            this.formData.address,
                            ABI[this.formData.tokenType],
                            provider
                        );
                        this.tokenSymbol = await contract.symbol();
                        this.tokenDescription = await contract.name();
                        this.tokenSupply = await contract.totalSupply();
                    }
                });
        }
    }
};
</script>
