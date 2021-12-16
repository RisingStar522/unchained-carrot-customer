<style lang="scss" scoped>
.btn-secondary {
    background-color: white !important;
    border-color: white !important;
    color: #212529;
}
.btn-secondary:hover {
    color: #fff;
    background-color: white;
    border-color: white;
}
.card-header {
    background-color: white !important;
}
.btn-title {
    color: #212529 !important;
}
</style>

<template>
  <div class="accordion mx-1" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 class="btn-title">Email broadcast</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 class="btn-title">Terms of use</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 class="btn-title">Email broadcast</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
    name: 'opt-tab-component',
    data: () => ({
        text: `
          Persona Opted in for receiving newsletters, promotions and marketing communications also from the customer and from partners
        `
    }),
    props: {
        // modalId: {
        //     type: String,
        //     required: true
        // },
        // title: {
        //     type: String,
        //     required: false
        // }
    }
};
</script>
