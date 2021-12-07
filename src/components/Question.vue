<template>
    <div :class="'question' + (active ? ' active' : '')">
        <div class="question-name">{{ data.questionText }}</div>
        <div class="question-icons">
            <fa-icon
                @click="$parent.$emit('openQuestionEditor', index)"
                icon="pencil-alt"
            />
            <fa-icon
                @click="$parent.$emit('deleteQuestion', index)"
                v-if="index > 0"
                icon="times-circle"
            />
        </div>
    </div>
</template>
<script>
export default {
    name: 'question',
    props: ['data', 'index', 'active']
};
</script>
