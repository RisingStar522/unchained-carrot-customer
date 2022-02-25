<style lang="scss" scope>
#viewEmployees {
    .dialog-class .content-class{
        max-width: 860px !important;
        width: 860px !important;
        margin-top: 120px;
        margin-left: -100px;
        background-color: #f0f0f7;
    }
    .body-class {
        padding-top: 0px !important;
        .nav-wrapper-class {
            padding-left: 10px;
        }
    }
    .header-class {
        padding: 1rem 2.25rem;
        margin-bottom: 0px; 
        background-color: #f0f0f7 !important; 
        border-bottom: none !important;
    }
}
</style>
<template>
    <div>
        <b-modal 
            hide-footer
            header-border-variant="light"
            :id="modalId"
            modal-class="modal-main"
            dialog-class="dialog-class"
            content-class="content-class"
            body-class="body-class"
            header-class="header-class"
        >
        <template #modal-title>
            <div class="row">
                <div class="persona-trait-img col-sm-2">
                    <img
                        src="../../../assets/images/personas/UCC_icon_frog.png"
                        alt="Frog"
                        width="70%"
                        class="trait-img ml-2"
                    />                    
                </div>
                <div class="persona-trait-title col-sm-8">
                    <div class="title">Mark Noorlander</div>
                    <div calss="mail">mrk@mail.com</div>
                    <div class="employee">
                        EMPLOYEE   
                    </div>
                </div>
                <div class="row social-icon ml-4 mt-2">
                    <div class='ml-4'>
                        <fa-icon :icon="['fab', 'linkedin-in']" />
                    </div>
                    <div class='ml-4'>
                        <fa-icon :icon="['fab', 'twitter']" />
                    </div>
                </div>
            </div>
        </template >
        <slot></slot>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'personas-tab-modal-component',
    data: () => ({}),
    props: {
        modalId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false
        }
    }
};
</script>
<style lang="scss" scoped>
.persona-trait-title {
    margin-left: -30px;
    color: #2f3380;
    font-family: 'Poppins', sans-serif;
    .title {
        box-sizing: border-box;
        font-weight: bold;
        font-size: 24px;
        font-weight: bold;
        line-height: 30px;
    }
    .mail {
        font-size: 20px;
    }
}
.employee {
    border: 1px solid #a3a6b4;
    color: #a3a6b4;
    font-size: 10px;
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 3px;
    padding-bottom: 3px;
    width: 13%;
}
</style>