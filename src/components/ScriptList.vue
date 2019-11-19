<template>
    <q-list separator>
        <q-item-label header class="text-primary text-h5 text-weight-light">Use Case</q-item-label>
        <q-separator/>
            <div class="q-my-md" v-if="scripts && scripts.length > 0">
                <q-item v-for="s in scripts" :key="s.ID" clickable @click="select(s)" :active="selected === s.Name" active-class="selected">
                    <q-item-section class="q-py-xs">
                        <q-item-label class="text-secondary text-h6">{{s.Name}}</q-item-label>
                        <q-item-label caption lines="2 text-subtitle1">{{s.Description}}</q-item-label>
                    </q-item-section>
                </q-item>
            </div>
    </q-list>
</template>

<script>
import api from '../utilities/api-utility'
export default {
    data() {
        return {
            selected: ""
        }
    },
    computed:{
        scripts(){
            var ss = this.$store.state.Scripts.scripts
            var res = []
            for (var s of ss){
                if (res.findIndex(x => x.Name === s.Name) === -1){
                    res.push(s)
                }
            }
            return res
        }
    },
    created(){
        this.$store.dispatch("Scripts/getAll")
    },
    methods:{
        select(script){
            this.selected = script.Name
            this.$store.dispatch("Scripts/select", script)
        }
    }

}
</script>
<style lang="stylus">
.selected {
    color: white;
    border-left: 3px solid $secondary;
}
</style>