<template>
    <q-list bordered separator>
        <q-item-label header>Scripts</q-item-label>
            <div v-if="scripts && scripts.length > 0">
                <q-item v-for="s in scripts" :key="s.ID" clickable @click="select(s)">
                    <q-item-section>
                        <q-item-label>{{s.Name}}</q-item-label>
                        <q-item-label caption lines="2">{{s.Description}}</q-item-label>
                    </q-item-section>
                </q-item>
            </div>
    </q-list>
</template>

<script>
import api from '../utilities/api-utility'
export default {
    computed:{
        scripts(){
            console.log(this.$store.state)
            return this.$store.state.Scripts.scripts
        }
    },
    created(){
        this.$store.dispatch("Scripts/getAll")
    },
    methods:{
        select(script){
            this.$store.dispatch("Scripts/select", script)
        },
        async startJob(id){
            var request = {
                controller: "pythonJobRunner",
                queryParameters: {
                    scriptID: id
                }
            }
            await api.getNoAuth(request)
        }
    }

}
</script>

<style>

</style>