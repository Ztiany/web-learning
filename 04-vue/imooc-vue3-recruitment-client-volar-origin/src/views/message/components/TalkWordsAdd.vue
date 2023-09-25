<script setup lang="ts">
    import {reactive,inject,watchEffect} from 'vue'
    import {chatMessageWordsAdd,chatMessageWordsEdit} from '@/api/message'
    import { Toast } from 'vant';
    const {closeWorksAdd} = inject('popup') as any
    const props = defineProps({
        title: {
            type: String as any
        },
        id: {
            type: Number as any
        },
        text: {
            type: String as any
        }
    })
    const state:any = reactive({
        loading: false,
        list: [],
        value: ''
    })
    watchEffect(()=>{
        state.value = props.text
    })
    const submitAdd = async () => {
        if(!state.value) {
            Toast('请输入常用语')
            return
        }
        state.loading = true
        let res:any = null
        if(props.id){
            res = await chatMessageWordsEdit({
                id: props.id,
                text: state.value
            })
        }else{
            res = await chatMessageWordsAdd({
                text: state.value
            })
        }
        if(res){
            state.value = ''
            closeWorksAdd()
        }else{
            Toast(res.msg)
        }
        state.loading = false
    }
</script>
<template>
    <van-nav-bar :title="props.title" left-arrow @click-left="closeWorksAdd">
        <template #right>
            <span @click="submitAdd">完成</span>
        </template>
    </van-nav-bar>
    <van-field
        v-model="state.value"
        rows="10"
        autosize
        label=""
        type="textarea"
        maxlength="200"
        placeholder="请输入您的常用回复请不要填写qq、微信等联系方式或 广告信息，否则系统将封禁您的账号。"
        show-word-limit
    />
</template>
<style scoped>
:deep(.van-field__word-num){
    color: #FF9415;
}
:deep(.van-field__word-limit){
    color: #999999;
}
</style>