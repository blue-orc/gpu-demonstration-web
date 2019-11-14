<template>
    <div class="row items-center">
        <q-select filled v-model="selected" :options="options" label="Script" class="col-3"/>
        <div class="col-9 text-body1 row justify-between">
            <div>{{description}} using {{processorType}}</div>
            <q-btn color="primary" @click="startJob(selected.value)">RUN</q-btn>
        </div>
    </div>
</template>

<script>
import api from '../utilities/api-utility'
import objectUtility from "../utilities/object-utility"
export default {
    data(){
        return {
            selected: {}
        }
    },
    computed:{
        scripts(){
            return this.$store.state.Scripts.scripts
        },
        options(){
            var os = []
            for(var s of this.scripts){
                var option = {
                    label: s.Name,
                    value: s.ID
                }
                os.push(option)
            }
            if (os.length > 0 && objectUtility.IsNullOrEmpty(this.selected)){
                this.selected = os[0]
            }
            return os
        },
        description(){
            var res = this.scripts.filter(x => x.ID === this.selected.value)
            if (res.length === 0) {
                return ""
            }
            return res[0].Description
        },
        processorType(){
            var res = this.scripts.filter(x => x.ID === this.selected.value)
            if (res.length === 0) {
                return ""
            }
            return res[0].Processor
        }
    },
    created(){
        this.$store.dispatch("Scripts/getAll")
    },
    methods:{
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