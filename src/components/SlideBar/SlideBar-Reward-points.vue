<template>
    <div class="app-slidebar">
        <div class="header">Add Rewards Class</div>
        <div class="content">
              <div  v-for="item in nav"
                    :key="item.link" class="mt-4 " >
                    <div   @click="active = item.link;$router.push({
                        name:item.link
                    })" class="list" :class="active == item.link ?'listItemColor':''">
                         {{item.name}}
                    </div>
              </div>
          
        </div>
        <div class="footer">
            <b-btn class="text-brand" size="lg" variant="link"> Save </b-btn>
        </div>
    </div>
</template>
<script>
export default {
    name: 'slidebar-reward-component',
    data() {
        return {
            activeTab: 'Rewards-Points-General',
            active:"General",
            nav: [
                { name: 'General', link: 'Rewards-Points-General' },
                { name: 'Images', link: 'Rewards-Points-Images' },
                { name: 'Distribution', link: 'Rewards-Points-Distribution' },
                {
                    name: 'Personalization',
                    link: 'Rewards-Points-Personalization',
                },
                { name: 'Data Science', link: 'Rewards-Points-Data-Science' },
            ],
        };
    },
      watch:{
       '$route': {
    immediate: true,
    handler() {
      this.active = this.$router.currentRoute.name
    
    }
  },
       
    }
};
</script>
<style scoped>
.list:hover { color: orange !important; cursor: pointer;}
.listItemColor{color: orange !important}
</style>